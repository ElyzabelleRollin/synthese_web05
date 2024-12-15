//Imports:
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

//Allows you to update your username:
export const updateUsername = async (formData) => {
  const supabase = await createClient(); //Access the Supabase

  //Get user:
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newUsername = formData.get("newUsername"); //New username
  //Update the username:
  if (newUsername != "") {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: newUsername,
      })
      .eq("id", user.id);
    if (error) console.log("[UPDATE USERNAME]", error);
    revalidatePath(`/profiles/${user.id}`); //Revalidate the path
  }
};

//Allows you to update your profile picture:
export const updateProfilePicture = async (file) => {
  const supabase = createClient(); //Access the Supabase
  //Get user:
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //Update the profile picture:
  const { error } = await supabase
    .from("profiles")
    .update({
      avatar: file,
    })
    .eq("id", user.id);
  if (error) console.log(error);
  redirect(`/application/profiles/${user.id}`); //Redirect to the user profile
};
