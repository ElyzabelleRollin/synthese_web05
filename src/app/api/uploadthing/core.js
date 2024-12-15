//Imports:
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createClient } from "@/app/_lib/supabase/server";

const f = createUploadthing(); // Import the createUploadthing function

// Middleware
const userMiddleware = async () => {
  const supabase = createClient(); //Get supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user
  if (!user) {
    throw new UploadThingError("User not authenticated"); //Throw error
  }
  return { userId: user.id, projectId: "monProjetId" }; //Return user id
};

// File router
export const ourFileRouter = {
  //File router for images:
  imageUploader: f({ image: { maxFileSize: "1MB" } })
    .middleware(userMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete for userId:", metadata.userId);
      return {
        uploadedBy: metadata.userId,
        message: "Image upload successful",
      };
    }),
  //File router for sounds:
  audioUploader: f({ audio: { maxFileSize: "1MB", fileTypes: ["audio/*"] } })
    .middleware(userMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Audio upload complete for userId:", metadata.userId);
      return {
        uploadedBy: metadata.userId,
        message: "Audio upload successful",
      };
    }),
};
