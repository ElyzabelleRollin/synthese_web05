"use client";
import { UploadDropzone } from "../../../utils/uploadthing";
import { createClient } from "@/app/_lib/supabase/client";

export default function UploadPage(){
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
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
              "monEmail." + file.name.split(".").pop(),
              { type: file.type }
            );
            return newFile;
          });
        }}
      />
    </main>
  );
}
