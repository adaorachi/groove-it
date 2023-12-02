import * as yup from "yup";

export const registerValidation = yup
  .object({
    email: yup.string().email({ message: "Must be a valid email." }).required(),
    password: yup
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .required(),
    username: yup
      .string()
      .trim()
      .min(3, { message: "Minimum 3 characters." })
      .max(50, { message: "Maximum 50 caracters." })
      .matches(/^[^@]+$/, "Input should not contain symbols.")
      .required(),
  })
  .required();

export const loginValidation = yup
  .object({
    email: yup
      .string()
      .trim()
      .matches(/^(?!@)[^\s]+(?<!@)$/, "Invalid email or username")
      .required(),

    password: yup
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .required(),
  })
  .required();

export const forgetPassCreateValidation = yup
  .object({
    email: yup
      .string()
      .trim()
      .matches(/^(?!@)[^\s]+(?<!@)$/, "Invalid email or username")
      .required(),
  })
  .required();

export const forgetPassResetValidation = yup
  .object({
    email: yup
      .string()
      .trim()
      .matches(/^(?!@)[^\s]+(?<!@)$/, "Invalid email or username")
      .required(),
    password: yup
      .string()
      .min(3, { message: "Minimum 3 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .required(),
  })
  .required();
