import "./inputForm.css";

export default function TextField({
  title,
  id,
  name,
  type = "text",
  value,
  placeHolder,
  onChangeMethod,
  required = false,
  minlength = 4,
  maxlength = 30,
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
        minLength={minlength}
        maxLength={maxlength}
        {...(value !== undefined ? { value: value } : {})}
      />
    </>
  );
}
