import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageField from "../../components/InputForm/ImageField";
import InputForm from "../../components/InputForm/InputForm";

import backgroundImage from "../../assets/inputPage__background.png";

import "./postUploadPage.css";

export default function PostUploadPage({ setMessage }) {
  const [image, setImage] = useState(backgroundImage);
  const [imageUrl, setImageUrl] = useState(backgroundImage);
  const [showImageField, setShowImageField] = useState(true);
  const [componentMounted, setComponentMounted] = useState(false);

  const [fakeImageProb, setFakeImgProb] = useState(-1);
  const [predictedCategory, setPredictedCategory] = useState("");

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentMounted && image !== backgroundImage) {
      setShowImageField(false);

      const uploadImage = async () => {
        try {
          const blob = new Blob([image]);
          const formData = new FormData();
          formData.append("image", blob);

          const response = await fetch("http://127.0.0.1:5000/evaluateImage", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            setMessage("ERROR", "Failed to upload image");
            throw new Error("Failed to upload image");
          }

          const data = await response.json();
          setPredictedCategory(data.classification);
          setFakeImgProb(data.probability_of_fake);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };

      uploadImage();
    }
  }, [image, componentMounted]);

  useEffect(() => {
    if (fakeImageProb > -1) {
      if (fakeImageProb >= 0.85) {
        setMessage(
          "WARNING",
          "AI Content detected. Fake images are prohibited and will suspend your account!",
          6000
        );
      } else {
        setMessage("INFO", "AI Predicted values added to the form");
      }
    }
  }, [fakeImageProb]);

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (!userRole) {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <div className="uploadPageContainer">
      <section
        className="imageUploadField"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {showImageField && (
          <ImageField setImage={setImage} setUrl={setImageUrl} />
        )}
      </section>
      <section className="postDetailsForm">
        <div className="contentContainer">
          <h1>Share your new memory!</h1>
          <InputForm
            image={imageUrl}
            predictedCategory={predictedCategory}
            setMessage={setMessage}
            probFake={fakeImageProb}
          />
        </div>
      </section>
    </div>
  );
}
