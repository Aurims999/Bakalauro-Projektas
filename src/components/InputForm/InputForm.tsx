import Button from "../Others/Button/Button";

import TextField from "./TextField";
import Fieldset from "../Others/Fieldset/Fieldset";
import SubmitButton from "./SubmitButton";

import "./inputForm.css";

export default function InputForm() {
  const categories = {
    dataType: "categories",
    data: [
      { id: 1, value: "beach", icon: "./icons/categories/beach-black.png" },
      {
        id: 2,
        value: "mountains",
        icon: "./icons/categories/mountains-black.png",
      },
      { id: 3, value: "city", icon: "./icons/categories/city-black.png" },
      { id: 4, value: "nature", icon: "./icons/categories/nature-black.png" },
      { id: 5, value: "cuisine", icon: "./icons/categories/cuisine-black.png" },
      {
        id: 6,
        value: "accommodation",
        icon: "./icons/categories/accommodation-black.png",
      },
    ],
  };

  return (
    <form action="">
      <TextField
        title={"Title"}
        id={"title"}
        name={"postTitle"}
        placeHolder={"Choose title for your memory"}
      />
      <TextField
        title={"Description"}
        id={"description"}
        name={"postDescription"}
        placeHolder={"Describe your memory"}
      />
      <TextField
        title={"Tags"}
        id={"tags"}
        name={"postTags"}
        placeHolder={"Add relevant tags for your memory"}
      />

      <section className="categories" style={{ margin: "15px 0px" }}>
        <h2>Category</h2>
        <Fieldset data={categories} />
      </section>

      <div className="buttons">
        <SubmitButton
          icon={"./icons/plus-white.png"}
          text={"Upload new memory"}
        />
        <Button
          innerText={"Cancel"}
          link={"/"}
          buttonColor={"var(--light__purple)"}
          textColor={"var(--main__black)"}
        />
      </div>
    </form>
  );
}
