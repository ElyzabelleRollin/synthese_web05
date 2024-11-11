"use client";

const LoginPage = ({action, name}) => {
  return (
      <button
        className="bg-slate-600 p-2 rounded-lg"
        onClick={action}
      >
        {name}
      </button>
  );
};

export default LoginPage;
