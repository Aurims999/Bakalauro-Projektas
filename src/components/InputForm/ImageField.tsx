import "./inputFormFields.css";

export default function ImageField({ setImage }) {
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  return (
    <div className="imageInputField">
      <label htmlFor="img-upload" className="input-imageField">
        <div className="fieldVisualCues">
          <img src="./icons/uploadImage-black.png" alt="Image upload icon" />
          <h2>Add photo</h2>
          <p>(Available image formats: jpg, jpeg, png)</p>
        </div>
      </label>
      <input
        type="file"
        name="imageUploadField"
        id="img-upload"
        className="input-imageField"
        onClick={handleImageUpload}
      />
    </div>
  );
}
