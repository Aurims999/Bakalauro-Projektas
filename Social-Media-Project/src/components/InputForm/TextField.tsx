import "./inputForm.css";

export default function TextField({ title, id, name, placeHolder }) {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input
        type="text"
        id={id}
        name={name}
        className="input-textField"
        placeholder={placeHolder}
      />
    </>
  );
}
