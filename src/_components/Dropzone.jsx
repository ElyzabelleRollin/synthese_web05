"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { updateProfilePicture } from "@/app/_actions/update";

const Dropzone = ({ userID }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          updateProfilePicture(res[0].appUrl);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        onBeforeUploadBegin={(files) => {
          return files.map((file) => {
            const blob = file.slice(0, file.size, file.type);
            const newFile = new File(
              [blob],
              userID + file.name.split(".").pop(),
              { type: file.type }
            );
            return newFile;
          });
        }}
      />
    </main>
  );
};

export default Dropzone;
