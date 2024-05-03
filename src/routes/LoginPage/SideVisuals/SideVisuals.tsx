import { Outlet } from "react-router-dom";

import "./sideVisuals.css";

export default function SideVisuals() {
  return (
    <>
      <section className="signin-visuals">
        <h1>Side Visuals</h1>
      </section>
      <Outlet />
    </>
  );
}
