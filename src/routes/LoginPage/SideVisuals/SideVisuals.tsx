import { Outlet } from "react-router-dom";

import "../loginPage.css";
import "./sideVisuals.css";

export default function SideVisuals() {
  return (
    <div className="sign-in-container">
      <section className="signin-visuals">
        <img src="./images/visuals/signin-page.png" alt="Side visuals" />
      </section>
      <Outlet />
    </div>
  );
}
