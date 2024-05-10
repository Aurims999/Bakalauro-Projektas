import LoginForm from "../../../components/Login/LoginForm";

import "./loginpage.css";

export default function LoginPage({ setUserId, handleMessages }) {
  return (
    <>
      <section className="login-container">
        <LoginForm setMessage={handleMessages} setUserId={setUserId} />
      </section>
    </>
  );
}
