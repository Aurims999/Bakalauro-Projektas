import RegisterForm from "../../../components/RegisterForm/RegisterForm";

import "./registrationPage.css";

export default function RegistrationPage({ setMessage, setUserId }) {
  return (
    <>
      <section className="register">
        <RegisterForm setMessage={setMessage} setUserId={setUserId} />
      </section>
    </>
  );
}
