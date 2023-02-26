import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import axios from "axios";

const StepUpload = ({ setOriginalImage, setImageId }) => {
  const [statusMessage, setStatusMessage] = useState();
  const [isUploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) {
        throw new Error(
          "File not accepted. Please drop a file in one of the following formats: .png,.jpg,.webp"
        );
      }
      if (acceptedFiles.length > 1) {
        throw new Error("Only 1 file is allowed");
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.error("File reading was aborted");
      reader.onerror = () => console.error("File reading has failed");
      reader.onload = () => {
        setStatusMessage("Uploading file...");
        setUploading(true);
        const payload = {
          upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
          timestamp: Date.now() / 1000,
          //   api_key: process.env.API_KEY,
          file: reader.result,
        };
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            payload
          )
          .then(function (response) {
            setStatusMessage("Upload was successful!");
            setOriginalImage(response.data.secure_url);
            setImageId(response.data.public_id);
            setTimeout(() => {
              setUploading(false);
            }, 2500);
          })
          .catch(function (error) {
            setStatusMessage(
              "There was an error on the upload! Please check the error"
            );
            setTimeout(() => {
              setUploading(false);
            }, 2500);
          });
      };
      reader.readAsDataURL(file);
    },
    [setOriginalImage, setImageId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
  });

  return (
    <div
      {...getRootProps({
        onClick: (event) => isUploading && event.stopPropagation(),
      })}
      className={`hover:bg-gray-100 shadow-2xl border-dashed border-2 border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col ${
        isUploading || isDragActive ? "bg-gray-100" : "bg-white"
      }`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <p className="font-bold pointer-events-none select-none text-bold text-blue-500 text-xl">
          {statusMessage}
        </p>
      ) : isDragActive ? (
        <p className="font-bold pointer-events-none select-none text-bold text-blue-500 text-xl">
          Drop your picture here
        </p>
      ) : (
        <p className="font-bold pointer-events-none select-none text-bold text-blue-600 text-xl">
          Drag & Drop your picture here
        </p>
      )}
    </div>
  );
};

export default StepUpload;
