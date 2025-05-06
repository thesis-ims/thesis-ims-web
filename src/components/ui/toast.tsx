import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        // Define default options
        className: "bg-amber-500 font-extrabold",
        duration: 4000,
        removeDelay: 1000,

        // Default options for specific types
        success: {
          className: "bg-blue-500",
          duration: 3000,
        },
        error: {
          className: "bg-red-100 font-extrabold",
        },
      }}
    />
  );
}
