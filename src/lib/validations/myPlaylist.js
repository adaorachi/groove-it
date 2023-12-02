import * as yup from "yup";

export const editMyPlaylistValidation = yup
  .object({
    title: yup
      .string()
      .trim()
      .min(3, { message: "Minimum 3 characters." })
      .max(100, { message: "Maximum 250 caracters." }),
    desc: yup
      .string()
      .trim()
      .min(3, { message: "Minimum 3 characters." })
      .max(250, { message: "Maximum 250 caracters." }),
    image: yup.string().trim().nullable(),
  })
  .required();
