import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForgetPassReset, useVerifyResetPassword } from "@/lib/actions";
import { forgetPassResetValidation } from "@/lib/validations";

import { Form } from "@/components";

const VerifyForgetPass = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const actionCode = new URLSearchParams(search).get("oobCode");
  const mode = new URLSearchParams(search).get("mode");
  const continueUrl = new URLSearchParams(search).get("continueUrl");

  const { data: email, error: errorVerify } =
    useVerifyResetPassword(actionCode);

  const { forgetPassReset, isSubmitting: isSubmittingReset } =
    useForgetPassReset();

  useEffect(() => {
    if (errorVerify || !(actionCode && mode && continueUrl)) {
      navigate("/login");
    }
  }, [actionCode, continueUrl, errorVerify, mode, navigate]);

  const listReset = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email address",
        props: {
          type: "email",
          placeholder: "",
          disabled: true,
        },
      },
      {
        type: "input",
        name: "password",
        label: "Password",
        props: { type: "password", placeholder: "" },
      },
    ];
  }, []);

  const handleReset = (values) => {
    forgetPassReset({ ...values, actionCode });
  };

  return (
    <section className="reset_pass_section">
      <Form
        list={listReset}
        btnTxt="Reset Password"
        isSubmitting={isSubmittingReset}
        schema={forgetPassResetValidation}
        onSubmit={handleReset}
        defaultValues={{
          email,
          password: "",
        }}
      />

      <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-onNeutralBg">
        <div>
          Remember Password?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline underline-offset-2"
          >
            Go back
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerifyForgetPass;
