import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "@/lib/actions";
import { loginValidation } from "@/lib/validations";

import { Form } from "@/components";

export default function Login() {
  const { isSubmitting, login } = useLogin();

  const handleSubmit = (values) => {
    login(values);
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email address",
        props: {
          type: "email",
          placeholder: "",
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

  return (
    <section className="login_section">
      <div className="flex items-center justify-center gap-4 my-6 divider">
        <div className="h-[1px] bg-divider flex-1" />
        <span className="text-sm text-onNeutralBg">or</span>
        <div className="h-[1px] bg-divider flex-1" />
      </div>
      <Form
        list={list}
        btnTxt="Login"
        isSubmitting={isSubmitting}
        schema={loginValidation}
        onSubmit={handleSubmit}
        defaultValues={{
          email: "demo@grooveit.com",
          password: "password@123",
        }}
      />
      <div className="flex flex-col items-center justify-center gap-2 mt-4 text-sm text-onNeutralBg">
        <div>
          Forgot Password?{" "}
          <Link
            to="/reset-password"
            className="text-primary hover:underline underline-offset-2"
          >
            Reset
          </Link>
        </div>
        <div>
          Have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline underline-offset-2"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
