import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: { cloudName: string; uploadPreset: string },
        callback: (error: string, result: {event:string, info:{secure_url:string} }) => void
      ) => { open: () => void };
    };
  }
}

const UploadWidget = ({ setImageUrl }: { setImageUrl: (url: string) => void }) => {
  const cloudinaryRef = useRef<typeof window.cloudinary | null>(null);
  const widgetRef = useRef<{ open: () => void } | null>(null);

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "drzewrxld",
          uploadPreset: "yklaxxrd",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
          } else if (result.event === "success") {
            console.log("Upload result:", result.info.secure_url);
            setImageUrl(result.info.secure_url); 
          }
        }
      );
    } else {
      console.error("Cloudinary is not loaded");
    }
  }, [setImageUrl]);

  return (
    <button type="button" onClick={() => widgetRef.current?.open()}>
      Upload Profile Picture
    </button>
  );
};

export default UploadWidget;
