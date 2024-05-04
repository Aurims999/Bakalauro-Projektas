import { useState, useEffect } from "react";
import LoginForm from "../../../components/Login/LoginForm";

import ErrorModal from "../../../components/Modals/ErrorModal/ErrorModal";

import "./loginpage.css";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(
    "Test Message can be posted here"
  );
  const [errorVisible, setErrorVisibility] = useState(false);

  useEffect(() => {
    if (errorMessage != "") {
      setErrorVisibility(true);
    }
  }, [errorMessage]);

  return (
    <>
      <section className="login-container">
        <LoginForm setErrorMessage={setErrorMessage} />
      </section>
      <ErrorModal errorMessage={errorMessage} visible={errorVisible} />
    </>
  );
}
