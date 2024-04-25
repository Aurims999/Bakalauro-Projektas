import { useState, useEffect } from "react";

import Memory from "./Memory";

import "./container.css";

export default function MemoriesContainer({
  data,
  setModal,
  setMemorySelection,
}) {
  const [memories, setMemories] = useState(data.memories ?? []);
  useEffect(() => {
    if (data && data.memories) {
      setMemories(data.memories);
    }
  }, [data]);

  return (
    <div className="container">
      {memories.map((memory) => {
        return (
          <Memory
            id={memory._id}
            image={memory.image}
            title={memory.title}
            author={memory.author}
            setModal={setModal}
            setSelection={setMemorySelection}
          />
        );
      })}
    </div>
  );
}
