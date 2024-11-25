import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createClient } from "@/app/_lib/supabase/server";
const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // Whatever is returned here is accessible in onUploadComplete as metadata
      return { userId: user.id, projectId: "monProjetId" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      // updateProfilePicture(file.url, metadata.userId);

      // !!! Whatever is returned here is sent to the clientside onClientUploadComplete callback
      return { uploadedBy: metadata.userId, message: "successful" };
    }),
};
