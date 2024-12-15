"use server";
import { createClient } from "../_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Function to ban or unban a user
export const updateUserBanStatus = async (formData) => {
  const email = formData.get("email"); // Email of the user
  const isBanned = formData.get("isBanned") === "true"; // Convert string to boolean
  const reason = formData.get("reason"); // Reason for ban
  // Update the user's ban status in an object
  const updateData = isBanned
    ? { banned: true, banned_reason: reason }
    : { banned: false, banned_reason: null };

  const supabase = createClient(); // Access Supabase

  // Get the current user (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching authenticated user:", userError);
    return;
  }

  // Check if the current user is an admin:
  const { data: profile, error: checkAdminError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  // If the current user is not an admin, return:
  if (checkAdminError || !profile) {
    console.error("Error checking admin status:", checkAdminError);
    return;
  }
  // If the current user is not an admin, return:
  if (profile.role !== "admin") {
    console.error("User is not an admin");
    return;
  }

  // Update the user's ban status:
  const { error: updateError } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("email", email);
  if (updateError) {
    console.error("Error updating user ban status:", updateError);
    return;
  }

  // Revalidate the admin page path:
  revalidatePath("/application/admin");
};

// Function to ban or unban a quiz:
export const updateQuizBanStatus = async (formData) => {
  const quizName = formData.get("quizName"); // Name of the quiz
  const isBanned = formData.get("isBanned") === "true"; // Convert string to boolean
  const reason = formData.get("reason"); // Reason for ban
  // Update the quiz's ban status in an object
  const updateData = isBanned
    ? { banned: true, banned_reason: reason }
    : { banned: false, banned_reason: null };

  const supabase = createClient(); // Access Supabase

  // Get the current user (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching authenticated user:", userError);
    return;
  }

  // Check if the current user is an admin:
  const { data: profile, error: checkAdminError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  // If the current user is not an admin, return:
  if (checkAdminError || !profile) {
    console.error("Error checking admin status:", checkAdminError);
    return;
  }
  // If the current user is not an admin, return:
  if (profile.role !== "admin") {
    console.error("User is not an admin");
    return;
  }
  console.log(quizName, updateData);
  // Update the quiz's ban status:
  const { error: updateError } = await supabase
    .from("quizzes")
    .update(updateData)
    .eq("name", quizName);
  if (updateError) {
    console.error("Error updating quiz ban status:", updateError);
    return;
  }

  // Revalidate the admin page path:
  revalidatePath("/application/admin");
};

// Function to edit a quiz:
export const editQuiz = async (formData) => {
  const quizName = formData.get("quizName"); // Name of the quiz
  const supabase = createClient(); // Access Supabase

  // Get the current user (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching authenticated user:", userError);
    return;
  }

  // Check if the current user is an admin:
  const { data: profile, error: checkAdminError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  // If the current user is not an admin, return:
  if (checkAdminError || !profile) {
    console.error("Error checking admin status:", checkAdminError);
    return;
  }
  // If the current user is not an admin, return:
  if (profile.role !== "admin") {
    console.error("User is not an admin");
    return;
  }

  //Get the quiz slug:
  const { data: quiz, error: quizIdError } = await supabase
    .from("quizzes")
    .select("slug")
    .eq("name", quizName)
    .single();
  if (quizIdError || !quiz) {
    console.error("Error fetching quiz ID:", quizIdError);
    return;
  }
  // Go to edit quiz page:
  redirect(`/application/quizzes/${quiz.slug}/edit`);
};

// Function to set a user as admin:
export const setUserAsAdmin = async (formData) => {
  const email = formData.get("email");
  const isAdmin = formData.get("isAdmin") === "true";
  const supabase = createClient(); // Access Supabase

  // Get the current user (admin)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching authenticated user:", userError);
    return;
  }

  // Check if the current user is an admin:
  const { data: profile, error: checkAdminError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  // If the current user is not an admin, return:
  if (checkAdminError || !profile) {
    console.error("Error checking admin status:", checkAdminError);
    return;
  }
  // If the current user is not an admin, return:
  if (profile.role !== "admin") {
    console.error("User is not an admin");
    return;
  }

  // Update the user's role:
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ role: isAdmin ? "admin" : null })
    .eq("email", email);
  if (updateError) {
    console.error("Error updating user role:", updateError);
    return;
  }

  // Revalidate the admin page path:
  revalidatePath("/application/admin");
};
