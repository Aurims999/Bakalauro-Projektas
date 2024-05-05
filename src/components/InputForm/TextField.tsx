import "./inputForm.css";

export default function TextField({
  title,
  id,
  name,
  type = "text",
  placeHolder,
  onChangeMethod,
  required = false,
}) {
  return (
    <>
      <label htmlFor={id} className="label-textField">
        {title}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="input-textField"
        placeholder={placeHolder}
        onChange={onChangeMethod}
        {...(required ? { required: "required" } : {})}
      />
    </>
  );
}
