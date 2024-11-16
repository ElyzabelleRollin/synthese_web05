"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const updateUsername = async (formData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newUsername = formData.get("newUsername");
  if (newUsername != "") {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: newUsername,
      })
      .eq("id", user.id);
    revalidatePath(`/profiles/${user.id}`);
  }
};

export const updateProfilePicture = async (file) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("profiles")
    .update({
      avatar: file,
    })
    .eq("id", user.id);
  if (error) console.log(error);
  redirect(`/application/profiles/${user.id}`);
};
