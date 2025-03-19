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
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
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
    <button type="button" className="btn btn-primary" onClick={() => widgetRef.current?.open()}>
      Add Item Photo
    </button>
  );
};

export default UploadWidget;         
