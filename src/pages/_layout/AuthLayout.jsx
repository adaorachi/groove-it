/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "@/lib/store";
import {
  useSocialAuthSignUpRedirect,
  useSocialAuthSignUp,
} from "@/lib/actions";
import { logo } from "@/constants";

import { Icon, Title, SocialAuthButtons } from "@/components";

export default function AuthLayout() {
  const { pathname } = useLocation();

  const { isSubmitting: isSubmittingRedirect, socialAuthSignUpRedirect } =
    useSocialAuthSignUpRedirect();

  const { currentUser } = useCurrentUser();
  const { isLoaded, user } = currentUser || {};

  const title = useMemo(() => {
    const t = {
      "/register": "Create your account",
      "/login": "Sign In",
      "/reset-password": "Reset Password",
      "/verify-reset-password": "Complete Reset Password",
    };

    return t[pathname];
  }, [pathname]);

  useEffect(() => {
    socialAuthSignUpRedirect();
  }, []);

  return (
    <div className="auth_page">
      <div className="flex-col h-full py-6 m-auto bg-main flex_justify_center">
        <div className="w-[25rem] max-w-[calc(100vw)] lg:max-w-[calc(100vw-5rem)] p-8 bg-card rounded">
          {isLoaded && (
            <>
              {user && <Navigate to="/" replace={true} />}
              <div>
                <div className="flex flex-col items-center mb-6 lg:mb-6">
                  <Link
                    to="/"
                    className="flex flex-row items-center gap-1 m-0 logo"
                  >
                    <Icon
                      name={logo.icon}
                      className="!text-primary"
                      size={20}
                    />

                    <h1 className="text-[20px] text-primary font-bold">
                      {logo.name}
                    </h1>
                  </Link>
                </div>

                <Title
                  name={title || ""}
                  desc="to continue to Groove"
                  type="medium"
                />

                {["/register", "/login"]?.includes(pathname) && (
                  <SocialAuthButtons
                    useSocialAuthSignUp={useSocialAuthSignUp}
                  />
                )}

                <Outlet />
              </div>
            </>
          )}
          {!isLoaded && isSubmittingRedirect && (
            <div className="text-sm font-semibold">
              Redirecting to dashboard ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
