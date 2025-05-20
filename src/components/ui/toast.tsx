import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        // Define default options
        className: "font-bold",
        duration: 3000,

        // Default options for specific types
        success: {
          iconTheme: {
            primary: "white",
            secondary: "green",
          },
          style: {
            background: "green",
            color: "white",
          },
        },

        error: {
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
          style: {
            background: "red",
            color: "white",
          },
        },
      }}
    />
  );
}
