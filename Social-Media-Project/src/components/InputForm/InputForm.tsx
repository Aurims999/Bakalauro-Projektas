import Button from "../Others/Button/Button";

import TextField from "./TextField";

import "./inputForm.css";

export default function InputForm() {
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

      <p>Categories</p>
      <input type="radio" id="category-beach" name="category-beach" />
      <input type="radio" id="category-mountains" name="category-mountains" />
      <input type="radio" id="category-city" name="category-city" />
      <input type="radio" id="category-nature" name="category-nature" />
      <input type="radio" id="category-cuisine" name="category-cuisine" />
      <input
        type="radio"
        id="category-accommodation"
        name="category-accommodation"
      />
      <input type="submit" value="Submit" />
      <Button
        innerText={"Cancel"}
        link={"/"}
        buttonColor={"var(--light__purple)"}
        textColor={"var(--main__black)"}
      />
    </form>
  );
}
