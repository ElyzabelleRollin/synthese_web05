"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";


export const updateUsername = async (formData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newUsername = formData.get("newUsername");
  if(newUsername != ""){
    const { error } = await supabase
    .from("profiles")
    .update({
      username: newUsername,
    })
    .eq("id", user.id);
      revalidatePath(`/profiles/${user.id}`);
  }
};