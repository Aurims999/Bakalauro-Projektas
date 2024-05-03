import Button from "../Others/Button/Button";

import "./header.css";

export default function Header() {
  return (
    <section className="header">
      <img src="./icons/logo-full.png" alt="logo" />
      <Button innerText={"Login"} />
    </section>
  );
}
