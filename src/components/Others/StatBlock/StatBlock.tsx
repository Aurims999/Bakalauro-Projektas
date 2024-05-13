import { useState, useEffect } from "react";

import "./statBlock.css";

export default function StatBlock({ value, title }) {
  const [color, setColor] = useState("var(--main__purple)");
  useEffect(() => {
    if (value <= 0) {
      setColor("var(--success__green__main)");
    } else if (value < 5) {
      setColor("var(--warning__orange__main)");
    } else {
      setColor("var(--failure__red__main)");
    }
  }, [value]);

  return (
    <div className="statBlock" style={{ backgroundColor: color }}>
      <p className="statValue">{value}</p>
      <h2>{title}</h2>
    </div>
  );
}
