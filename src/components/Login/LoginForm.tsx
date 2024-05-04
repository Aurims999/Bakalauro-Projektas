import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import TextField from "../InputForm/TextField";
import SubmitButton from "../InputForm/SubmitButton";
import Button from "../Others/Button/Button";

import "./loginForm.css";

export default function LoginForm({ setErrorMessage }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        console.log("User logged in successfully", responseBody);
        navigate("/");
      } else if (response.status === 400) {
        setErrorMessage(responseBody.error);
        throw new Error("Validation error");
      } else {
        setErrorMessage(responseBody.error);
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <form className="loginContainer" onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        <TextField
          title={"Username"}
          id={"username"}
          name={"username"}
          placeHolder={"Enter your username"}
          onChangeMethod={handleUsernameChange}
          required={true}
        />
        <TextField
          title={"Password"}
          id={"password"}
          name={"password"}
          type={"password"}
          placeHolder={"Enter your password"}
          onChangeMethod={handlePasswordChange}
          required={true}
        />
        <p className="register-message">
          Dont have an account yet?{" "}
          <Link to={"register"} className="link">
            Make a new account by clicking here!
          </Link>
        </p>
        <div className="buttons">
          <SubmitButton text={"Login"} />
          <Button
            innerText={"Cancel"}
            link={"/guestpage"}
            buttonColor={"var(--light__purple)"}
            textColor={"var(--main__black)"}
          />
        </div>
      </form>
    </>
  );
}
