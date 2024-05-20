import { Bounce, toast } from "react-toastify";

export const showToast = (message, type) => {
    return toast[type](message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};