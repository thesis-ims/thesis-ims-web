import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        // Define default options
        className: "font-extrabold",
        style: {
          background: "#f59e0b", // This is the equivalent of bg-amber-500
        },
        duration: 4000,
        removeDelay: 1000,

        // Default options for specific types
        success: {
          className: "",
          style: {
            background: "#3b82f6", // This is the equivalent of bg-blue-500
          },
          duration: 3000,
        },
        error: {
          className: "font-extrabold",
          style: {
            background: "#fee2e2", // This is the equivalent of bg-red-100
          },
        },
      }}
    />
  );
}
