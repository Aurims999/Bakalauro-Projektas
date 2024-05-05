import { useState } from "react";
import LoginForm from "../../../components/Login/LoginForm";

import ErrorModal from "../../../components/Modals/ErrorModal/ErrorModal";

import "./loginpage.css";

export default function LoginPage({ setUserId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisibility] = useState(false);

  const triggerErrorModal = (errorMessage) => {
    setErrorMessage(errorMessage);
    if (errorMessage != "") {
      setErrorVisibility(true);
      setTimeout(() => {
        setErrorVisibility(false);
      }, 5000);
    }
  };

  return (
    <>
      <section className="login-container">
        <LoginForm setErrorMessage={triggerErrorModal} setUserId={setUserId} />
      </section>
      <ErrorModal errorMessage={errorMessage} visible={errorVisible} />
    </>
  );
}
