import "./imageField.css";

export default function ImageField() {
  return (
    <div className="imageInputField">
      <input
        type="file"
        name="imageUploadField"
        id="img-upload"
        className="input-imageField"
      />
    </div>
  );
}
