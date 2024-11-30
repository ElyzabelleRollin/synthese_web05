"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { updateProfilePicture } from "@/app/_actions/update";

const Dropzone = ({
  userID,
  updateProfile,
  uploadQuestionImage,
  addChoiceFn,
  uploadSound,
  addSoundFn,
}) => {
  const onUploadHandler = (res) => {
    if (updateProfile) {
      updateProfilePicture(res[0].appUrl);
    }
    //Give the key to client here!!
    if (uploadQuestionImage && res[0].key) {
      addChoiceFn(res[0].key);
    }
    //Give the key to client here!!
    if (uploadSound && res[0].key) {
      addSoundFn(res[0].key);
    }
  };

  return (
    <main>
      <UploadDropzone
        endpoint={uploadSound ? "audioUploader" : "imageUploader"}
        onClientUploadComplete={onUploadHandler}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        onBeforeUploadBegin={(files) => {
          return files.map((file) => {
            const blob = file.slice(0, file.size, file.type);
            let newFile;
            if (updateProfile) {
              newFile = new File([blob], userID + file.name.split(".").pop(), {
                type: file.type,
              });
            } else if (uploadQuestionImage) {
              newFile = new File([blob], file.name.split(".").pop(), {
                type: file.type,
              });
            }
            return newFile;
          });
        }}
      />
    </main>
  );
};

export default Dropzone;
