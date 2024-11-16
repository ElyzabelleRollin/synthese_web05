import Dropzone from "@/_components/Dropzone";
import { createClient } from "@/app/_lib/supabase/server";

const UploadPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Dropzone userID={user.id} />;
};

export default UploadPage;
