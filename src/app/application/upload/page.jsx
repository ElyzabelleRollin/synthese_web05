import Dropzone from "@/app/_components/dropzone/Dropzone";
import { createClient } from "@/app/_lib/supabase/server";

const UploadPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Dropzone userID={user.id} updateProfile={true}/>;
};

export default UploadPage;
