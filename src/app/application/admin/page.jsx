//Imports:
import Admin from "@/app/_components/admin/admin";
import { createClient } from "@/app/_lib/supabase/server";

//Page to display the functionality of the admin:
const AdminPage = async () => {
  const supabase = createClient(); //Access supabase
  const { data: quizzes } = await supabase.from("quizzes").select("name"); //Get quizzes
  const { data: email } = await supabase.from("profiles").select("email"); //Get emails

  return (
    <div style={{ height: "85vh", display: "flex"}}>
      <Admin quizzes={quizzes} userEmail={email} />
    </div>
  );
};
export default AdminPage;
