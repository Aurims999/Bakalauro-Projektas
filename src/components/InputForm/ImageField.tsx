import "./inputFormFields.css";

export default function ImageField({ setImage, setUrl }) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsArrayBuffer(file);
    }

    reader.onload = () => {
      const base64Image = arrayBufferToBase64(reader.result);
      setImage(reader.result);
      setUrl(base64Image);
    };
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/png;base64," + window.btoa(binary);
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
