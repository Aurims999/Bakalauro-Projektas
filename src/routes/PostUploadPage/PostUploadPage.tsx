import ImageField from "../../components/InputForm/ImageField";
import InputForm from "../../components/InputForm/InputForm";

import "./postUploadPage.css";

export default function PostUploadPage() {
  return (
    <div className="uploadPageContainer">
      <section className="imageUploadField">
        <ImageField />
      </section>
      <section className="postDetailsForm">
        <div className="contentContainer">
          <h1>Share your new memory!</h1>
          <InputForm />
        </div>
      </section>
    </div>
  );
}
