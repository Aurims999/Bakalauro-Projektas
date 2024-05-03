import TextField from "../InputForm/TextField";
import SubmitButton from "../InputForm/SubmitButton";
import Button from "../Others/Button/Button";

import "./registerForm.css";

export default function RegisterForm() {
  return (
    <div className="registerForm">
      <h1>Register New Account</h1>
      <TextField
        title={"Email"}
        id={"email"}
        name={"email"}
        placeHolder={"Enter your e-mail"}
        required={true}
      />
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
        type={"password"}
        placeHolder={"Enter your password"}
        required={true}
      />
      <TextField
        title={"Repeat Password"}
        id={"re-password"}
        name={"re-password"}
        type={"password"}
        placeHolder={"Repeat your password"}
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
    </div>
  );
}
