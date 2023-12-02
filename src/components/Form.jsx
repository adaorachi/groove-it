import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { fileBlob } from "@/lib/utils";
import { ImageUploader, IconButton, Button } from "@/components";

const FormMessage = ({ errorMessage }) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>{message && <p className="mt-1 text-sm text-red-500">{message}</p>}</>
  );
};

function AppForm({
  list,
  btnTxt,
  files,
  setFiles,
  isSubmitting,
  isSubmitted,
  schema,
  onSubmit,
  defaultValues,
}) {
  const [showPass, setShowPass] = useState(null);
  const imageRef = useRef(null);

  const blob = useMemo(() => {
    return fileBlob(files);
  }, [files]);

  const handleImage = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;
    }
  };

  const {
    register: form,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && !isSubmitting) {
      Object.entries(defaultValues).forEach(([name, value]) => {
        setValue(name, value);
      });
    }
  }, [setValue, defaultValues, isSubmitting]);

  useEffect(() => {
    if (isSubmitted) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitted, reset]);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {list.map((formItem) => {
        return (
          <Fragment key={formItem.name}>
            {["input", "textarea"].includes(formItem.type) && (
              <fieldset>
                <div className="flex items-baseline justify-between">
                  <label
                    className="mb-2 text-xs font-semibold text-secondary"
                    htmlFor={formItem?.name}
                  >
                    {formItem?.label}
                  </label>
                </div>
                <div className="relative px-2 py-1 border rounded border-divider focus-within:border-primary">
                  {/* <div
                    className="absolute h-4 text-sm font-semibold top-1 left-2 text-secondary"
                    htmlFor={formItem?.name}
                  >
                    {formItem?.label}
                  </div> */}
                  {formItem.type === "input" && (
                    <div className="flex items-center justify-between">
                      <input
                        {...form(formItem.name)}
                        className="w-full h-10 text-sm bg-transparent text-onNeutralBg no-focus border-divider outline-0 disabled:text-secondary"
                        {...formItem.props}
                        placeholder={
                          formItem.props.placeholder || formItem.label
                        }
                        disabled={formItem.props.disabled || isSubmitting}
                        type={
                          formItem.props.type === "password"
                            ? showPass?.[formItem.name]
                              ? "text"
                              : "password"
                            : formItem.props.type
                        }
                      />
                      {formItem.props.type === "password" && (
                        <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                          <IconButton
                            name={
                              !showPass?.[formItem.name]
                                ? "AiFillEyeInvisible"
                                : "AiFillEye"
                            }
                            iconClassName="text-onNeutralBg"
                            onClick={() =>
                              setShowPass((prevS) => ({
                                ...prevS,
                                [formItem.name]: !prevS?.[formItem.name],
                              }))
                            }
                          />
                        </span>
                      )}
                    </div>
                  )}
                  {formItem.type === "textarea" && (
                    <textarea
                      {...form(formItem.name)}
                      placeholder={formItem.name}
                      rows={5}
                      className="w-full text-sm bg-transparent text-onNeutralBg no-focus outline-0"
                      {...formItem.props}
                    />
                  )}
                </div>
                <FormMessage errorMessage={errors?.[formItem.name]?.message} />
              </fieldset>
            )}

            {formItem.type === "image_dropzone" && (
              <fieldset className="flex flex-col">
                {formItem?.label && (
                  <label
                    className="mb-2 text-sm font-semibold text-secondary"
                    htmlFor={formItem?.name}
                  >
                    {formItem?.label || "Upload Image"}
                  </label>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e)}
                  ref={imageRef}
                />

                <ImageUploader
                  blobUrl={blob.blobUrl || defaultValues?.image}
                  onImageDelete={() => {}}
                  imageRef={imageRef}
                  containerDims={formItem.containerDims}
                  borderType={formItem.borderType}
                />
                <FormMessage />
              </fieldset>
            )}
          </Fragment>
        );
      })}
      <div className="flex items-center justify-start w-full">
        <Button
          type="submit"
          label={btnTxt}
          variant="contained"
          isSubmitting={isSubmitting}
          disabled={!isValid || isSubmitting}
          className="w-fit"
          onClick={() => handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}

export default AppForm;
