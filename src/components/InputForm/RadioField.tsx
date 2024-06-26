import "./inputFormFields.css";

export default function RadioField({
  id,
  name,
  value,
  icon,
  onChangeMethod,
  checked,
}) {
  return (
    <div className="input-radioField" id={id}>
      <input
        type="radio"
        id={`${name} ${value}`}
        name={name}
        value={value}
        onChange={onChangeMethod}
        checked={checked}
      />
      <label htmlFor={`${name} ${value}`}>
        <img src={icon} alt={`icon of ${value}`} />
        <h3>{value}</h3>
      </label>
    </div>
  );
}
