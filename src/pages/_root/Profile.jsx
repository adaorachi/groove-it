import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { useCurrentUser } from "@/lib/store";
import { useUpdatePassword, useUpdateProfile } from "@/lib/actions";
import {
  editProfileValidation,
  updatePasswordValidation,
} from "@/lib/validations";
import { Form, Icon, Title, PatternBg } from "@/components";

const EditProfile = ({ details }) => {
  const { updateUserProfile, isSubmitting } = useUpdateProfile();
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    updateUserProfile({
      username: values.username,
      files,
    });
  };

  const list = useMemo(() => {
    return [
      {
        type: "image_dropzone",
        name: "imageUrl",
        label: "",
        containerDims: "h-32 w-32",
        borderType: "rounded-full",
        props: {
          type: "file",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "username",
        label: "Username",
        props: {
          type: "text",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "email",
        label: "Email",
        props: {
          disabled: true,
          type: "text",
          placeholder: "",
        },
      },
    ];
  }, []);

  return (
    <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Profile</h5>
      </div>
      <Form
        list={list}
        btnTxt="Save"
        isSubmitting={isSubmitting}
        schema={editProfileValidation}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        defaultValues={{
          username: details?.username,
          email: details?.email,
          image: details?.imageUrl,
        }}
      />
    </div>
  );
};

const ChangePassword = ({ isPasswordEnabled }) => {
  const { updatePass, isSubmitting, isSubmitted } = useUpdatePassword();
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    updatePass(values);
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "currentPassword",
        label: "Current Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "newPassword",
        label: "New Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "confirmNewPassword",
        label: "Confirm New Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
    ];
  }, [isPasswordEnabled]);

  return (
    <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Change Password</h5>
        {!isPasswordEnabled && (
          <span className="flex items-center gap-1 text-sm text-yellow-500 ">
            <Icon
              name="PiWarningCircleBold"
              className="!text-yellow-500"
              size={16}
            />
            Accounts authenticated with Google Oauth cannot update password!
          </span>
        )}
      </div>
      <Form
        list={list}
        btnTxt="Update Password"
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        schema={updatePasswordValidation}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        defaultValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
      />
    </div>
  );
};

export default function Profile() {
  const { currentUser } = useCurrentUser();
  const { user, isLoaded } = currentUser || {};

  return (
    <>
      {isLoaded && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <section className="account_page">
              <Title
                name="Account"
                desc="Discover your sound identity. Share your musical journey in a vibrant profile."
                type="large"
              />
              <div className="flex flex-col gap-y-10 text-onNeutralBg">
                <EditProfile
                  details={{
                    email: user?.email,
                    username: user?.username,
                    imageUrl: user?.imageUrl,
                  }}
                />
                <ChangePassword isPasswordEnabled={user?.isPasswordEnabled} />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
