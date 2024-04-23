import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Others/Button/Button";
import TextField from "./TextField";
import Fieldset from "../Others/Fieldset/Fieldset";
import SubmitButton from "./SubmitButton";

import "./inputForm.css";

export default function InputForm({ image }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const categories = {
    dataType: "categories",
    data: [
      { id: 1, value: "culture" },
      { id: 2, value: "city" },
      { id: 3, value: "cuisine" },
      { id: 4, value: "nature" },
      {
        id: 5,
        value: "accommodation",
      },
    ],
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      tags,
      category,
      image,
    };

    // Example: Sending form data to the server using fetch API
    fetch("http://localhost:4000/newMemory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        title={"Title"}
        id={"title"}
        name={"postTitle"}
        placeHolder={"Choose title for your memory"}
        onChangeMethod={handleTitleChange}
        required={true}
      />
      <TextField
        title={"Description"}
        id={"description"}
        name={"postDescription"}
        placeHolder={"Describe your memory"}
        onChangeMethod={handleDescriptionChange}
      />
      <TextField
        title={"Tags"}
        id={"tags"}
        name={"postTags"}
        placeHolder={"Add relevant tags for your memory"}
        onChangeMethod={handleTagsChange}
      />

      <section className="categories" style={{ margin: "15px 0px" }}>
        <h2>Category</h2>
        <Fieldset data={categories} onChangeMethod={handleCategoryChange} />
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
