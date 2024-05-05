import { useState } from "react";

import TextField from "../InputForm/TextField";
import SubmitButton from "../InputForm/SubmitButton";
import Button from "../Others/Button/Button";

import { useNavigate } from "react-router-dom";

import "./registerForm.css";

export default function RegisterForm({ setErrorMessage }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordRepeatChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("user-id", responseBody.newUser.userId);
        sessionStorage.setItem("user-role", responseBody.newUser.role);
        sessionStorage.setItem("user-nickname", responseBody.newUser.nickname);
        sessionStorage.setItem("user-image", responseBody.newUser.img);
        console.log("User registered successfully", responseBody);
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
    <form className="registerForm" onSubmit={handleFormSubmit}>
      <h1>Register New Account</h1>
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
      <TextField
        title={"Repeat Password"}
        id={"re-password"}
        name={"re-password"}
        type={"password"}
        placeHolder={"Repeat your password"}
        onChangeMethod={handlePasswordRepeatChange}
        required={true}
      />
      <div className="buttons">
        <SubmitButton text={"Create new Account"} />
        <Button
          innerText={"Go Back"}
          link={".."}
          buttonColor={"var(--light__purple)"}
          textColor={"var(--main__black)"}
        />
      </div>
    </form>
  );
}
