import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useNotification() {
  const toastFunc = (variant) => {
    switch (variant) {
      case "success":
        return toast.success;
      case "error":
        return toast.error;
      default:
        return toast;
    }
  };

  const notify = ({ title, description, variant = "success" }) =>
    toastFunc(variant)(
      <div className="flex flex-col gap-2 text-sm ">
        <span className="text-onNeurtralBg">{title}</span>
        <span className="text-onNeurtralBg">{description}</span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  return [notify];
}
