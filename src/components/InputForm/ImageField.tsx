import "./inputFormFields.css";

export default function ImageField({ setImage }) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file); // Read the file as data URL
    }

    reader.onload = () => {
      setImage(reader.result); // Set the image data URL as state
    };
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
        onChange={handleImageUpload}
      />
    </div>
  );
}
