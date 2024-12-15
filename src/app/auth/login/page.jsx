//Imports:
import React from "react";
import Loginform from "../../_components/login/loginform";

const LoginPage = async ({ searchParams }) => {
  const { redirectedFrom } = searchParams;
  return <Loginform redirectedFrom={redirectedFrom} />;
};

export default LoginPage;
