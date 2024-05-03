import "./loginForm.css";
import { Link } from "react-router-dom";

import TextField from "../InputForm/TextField";
import SubmitButton from "../InputForm/SubmitButton";
import Button from "../Others/Button/Button";

export default function LoginForm() {
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <TextField
        title={"Username"}
        id={"username"}
        name={"username"}
        placeHolder={"Enter your username"}
        required={true}
      />
      <TextField
        title={"Password"}
        id={"password"}
        name={"password"}
        placeHolder={"Enter your password"}
        required={true}
      />
      <p className="register-message">
        Dont have an account yet?{" "}
        <Link to={"/"} className="link">
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
    </div>
  );
}
