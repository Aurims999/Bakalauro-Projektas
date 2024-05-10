import LoginForm from "../../../components/Login/LoginForm";

import "./loginpage.css";

export default function LoginPage({ setUserId, setMessage }) {
  return (
    <>
      <section className="login-container">
        <LoginForm setMessage={setMessage} setUserId={setUserId} />
      </section>
    </>
  );
}
