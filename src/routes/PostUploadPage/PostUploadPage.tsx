import { useState, useEffect } from "react";

import ImageField from "../../components/InputForm/ImageField";
import InputForm from "../../components/InputForm/InputForm";

import "./postUploadPage.css";

export default function PostUploadPage() {
  const [image, setImage] = useState(null);

  return (
    <div className="uploadPageContainer">
      <section className="imageUploadField">
        <ImageField setImage={setImage} />
      </section>
      <section className="postDetailsForm">
        <div className="contentContainer">
          <h1>Share your new memory!</h1>
          <InputForm image={image} />
        </div>
      </section>
    </div>
  );
}
