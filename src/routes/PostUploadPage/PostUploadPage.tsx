import { useState, useEffect } from "react";

import ImageField from "../../components/InputForm/ImageField";
import InputForm from "../../components/InputForm/InputForm";

import backgroundImage from "../../assets/inputPage__background.png";

import "./postUploadPage.css";

export default function PostUploadPage() {
  const [image, setImage] = useState(backgroundImage);
  const [showImageField, setShowImageField] = useState(true);
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentMounted && image !== backgroundImage) {
      setShowImageField(false);
    }
  }, [image, componentMounted]);

  return (
    <div className="uploadPageContainer">
      <section
        className="imageUploadField"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {showImageField && <ImageField setImage={setImage} />}
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
