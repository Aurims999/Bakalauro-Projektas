import { useState } from "react";

import TextField from "../InputForm/TextField";
import SubmitButton from "../InputForm/SubmitButton";
import Button from "../Others/Button/Button";

import { useNavigate } from "react-router-dom";

import "./registerForm.css";

export default function RegisterForm() {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (password != repeatPassword) {
      console.log("Non-matching passwords");
      return;
    }
    const formData = {
      username,
      password,
    };

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Validation error");
        } else {
          throw new Error("Server error");
        }
      })
      .then((data) => {
        console.log("User registered successfully", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
