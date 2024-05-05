import { useState } from "react";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import ErrorModal from "../../../components/Modals/ErrorModal/ErrorModal";

import "./registrationPage.css";

export default function RegistrationPage({ setUserId }) {
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
      <section className="register">
        <RegisterForm
          setErrorMessage={triggerErrorModal}
          setUserId={setUserId}
        />
      </section>
      <ErrorModal errorMessage={errorMessage} visible={errorVisible} />
    </>
  );
}
