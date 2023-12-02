import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useForgetPassCreate } from "@/lib/actions";
import { forgetPassCreateValidation } from "@/lib/validations";

import { Form } from "@/components";

const ForgetPass = () => {
  const { forgetPassCreate, isSubmitting: isSubmittingCreate } =
    useForgetPassCreate();

  const listCreate = useMemo(() => {
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
    ];
  }, []);

  const handleCreate = (values) => {
    forgetPassCreate(values);
  };

  return (
    <section className="reset_pass_section">
      <Form
        list={listCreate}
        btnTxt="Send Email"
        isSubmitting={isSubmittingCreate}
        schema={forgetPassCreateValidation}
        onSubmit={handleCreate}
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

export default ForgetPass;
