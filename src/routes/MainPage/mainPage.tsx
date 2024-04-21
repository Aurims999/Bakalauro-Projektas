import { useState, useEffect } from "react";

import Button from "../../components/Others/Button/Button";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";

export default function MainPage() {
  const [memories, setMemory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/memories")
      .then((response) => response.json())
      .then((memory) => {
        setMemory(memory);
      });
  }, []);

  return (
    <main>
      <h1>Memories</h1>
      <Button
        icon={"./icons/plus-white.png"}
        innerText={"Share your memory"}
        link={"new-memory"}
      />
      <MemoriesContainer data={memories} />
    </main>
  );
}
