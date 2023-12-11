/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "@firebase/auth";

import { useCurrentUser } from "@/lib/store";
import { fbSetDoc } from "@/lib/helpers";
import { useNotification } from "@/hooks";
import { auth, googleProvider, githubProvider } from "@/configs";

export const useAuthState = () => {
  const {
    getCurrentUser,
    userProfile: profile,
    getUserProfile,
  } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isPasswordEnabled = user?.providerData
          .reduce((acc, item) => {
            acc.push(item.providerId);
            return acc;
          }, [])
          ?.includes("password");

        const {
          uid,
          displayName: username,
          email,
          metadata,
          photoURL: imageUrl,
        } = user;

        getCurrentUser({
          userId: profile && uid,
          user: {
            ...profile,
            uid,
            username,
            email,
            metadata,
            imageUrl,
            isPasswordEnabled,
          },
          isLoading: false,
          isLoaded: true,
        });
      } else {
        getCurrentUser({ isLoaded: true, isLoading: false });
        getUserProfile(null);
      }
    });
    return unsubscribe;
  }, [getCurrentUser, profile]);
};

export const useLogin = () => {
  const [notify] = useNotification();

  const {
    mutate: login,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values?.email, values?.password);
      } catch (err) {
        console.error("error", err?.code);
        notify({
          title: "Error",
          variant: "error",
          description: err?.code,
        });
      }
    },
  });

  return { isSubmitting, isSubmitted, login };
};

export const useRegister = () => {
  const [notify] = useNotification();

  const {
    mutate: register,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      try {
        const authResp = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        await updateProfile(auth.currentUser, {
          displayName: values.username,
        });

        await fbSetDoc({
          collection: "users",
          id: authResp.user?.uid,
          data: {
            email: authResp.user.email,
            username: values.username,
            prefs: {},
          },
        });
      } catch (err) {
        console.error("error", err?.code);

        notify({
          title: "Error",
          variant: "error",
          description: err?.code || JSON.stringify(err),
        });
      }
    },
  });

  return { isSubmitting, isSubmitted, register };
};

export const useSocialAuthSignUp = () => {
  const [notify] = useNotification();

  const {
    mutate: socialAuthSignUp,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (strategy) => {
      try {
        if (strategy === "oauth_google") {
          await signInWithRedirect(auth, googleProvider);
        }
        if (strategy === "oauth_github") {
          await signInWithRedirect(auth, githubProvider);
        }
      } catch (err) {
        console.error("error", err, err?.code);
        notify({
          title: "Error",
          variant: "error",
          description: err?.code || JSON.stringify(err),
        });
      }
    },
  });

  return { isSubmitting, isSubmitted, socialAuthSignUp };
};

export const useSocialAuthSignUpRedirect = () => {
  const {
    mutate: socialAuthSignUpRedirect,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
      try {
        const result = await getRedirectResult(auth);

        const user = result?.user;

        if (user && result) {
          const username = user?.displayName.split(" ")[0];

          await updateProfile(auth.currentUser, {
            displayName: username,
          });

          await fbSetDoc({
            collection: "users",
            id: user?.uid,
            data: {
              email: user.email,
              username: username,
              photoURL: user.photoURL,
              prefs: {},
            },
          });
        }
      } catch (err) {
        console.error("error", err, err?.code);
      }
    },
  });

  return { isSubmitting, isSubmitted, socialAuthSignUpRedirect };
};

export const useLogout = () => {
  const { getCurrentUser } = useCurrentUser();

  const {
    mutate: logout,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async () => {
      try {
        getCurrentUser({
          isLoaded: true,
          isLoading: false,
        });
        await signOut(auth);
      } catch (err) {
        // console.log(err);
      }
    },
  });

  return { isSubmitting, isSubmitted, logout };
};

export const useForgetPassCreate = () => {
  const [notify] = useNotification();

  const {
    mutate: forgetPassCreate,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      try {
        const actionCodeSettings = {
          url: import.meta.env.VITE_PUBLIC_AUTH_RESET_PASS_ACTION_URL,
          handleCodeInApp: false,
        };

        await sendPasswordResetEmail(auth, values?.email, actionCodeSettings);

        notify({
          title: "Success",
          variant: "success",
          description: "Password reset email sent",
        });

        return null;
      } catch (error) {
        // console.log(error, "ERROR");
        const message =
          error.code === "auth/user-not-found"
            ? "Email address not found. Check your email address and try again."
            : "An error occured. Try again later.";
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
      }
    },
  });

  return {
    forgetPassCreate,
    isSubmitting,
    isSubmitted,
  };
};

export const useVerifyResetPassword = (actionCode) => {
  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["resetPassword", { actionCode }],
    queryFn: async () => {
      if (actionCode) {
        try {
          return await verifyPasswordResetCode(auth, actionCode);
        } catch (error) {
          // console.log(error.code);
        }
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useForgetPassReset = () => {
  const [notify] = useNotification();

  const navigate = useNavigate();

  const {
    mutate: forgetPassReset,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      try {
        await confirmPasswordReset(auth, values?.actionCode, values?.password);

        notify({
          title: "Success",
          variant: "success",
          description: "Password reset successful",
        });
      } catch (error) {
        let message;
        if (error?.code) {
          switch (error?.code) {
            case "auth/invalid-action-code":
              message = "Reset Code has Expired";
              break;

            default:
              message = "An error occured. Try again later.";
              break;
          }
        } else {
          message = "An error occured. Try again later.";
        }

        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  return {
    forgetPassReset,
    isSubmitting,
    isSubmitted,
  };
};
