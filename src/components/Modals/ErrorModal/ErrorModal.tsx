import { useState, useEffect } from "react";

import "./errorModal.css";

export default function ErrorModal({ errorMessage, visible = false }) {
  return visible ? (
    <div className={"error-modal-container"}>
      <img src="./icons/warning-orange.png" alt="Warning icon" />
      <p className="error-message">{errorMessage}</p>
    </div>
  ) : null;
}
