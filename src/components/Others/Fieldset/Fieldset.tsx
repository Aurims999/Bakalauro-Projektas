import RadioField from "../../InputForm/RadioField";

import "./fieldset.css";

export default function Fieldset({ data }) {
  return (
    <fieldset className="customFieldSet">
      {data.data.map((entry) => {
        return (
          <RadioField
            id={entry.id}
            name={data.dataType}
            value={entry.value}
            icon={entry.icon}
          />
        );
      })}
    </fieldset>
  );
}