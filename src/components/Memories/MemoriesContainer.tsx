import { useState, useEffect } from "react";

import Memory from "./Memory";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./container.css";

export default function MemoriesContainer({
  data,
  setModal,
  setMemorySelection,
  setMessage,
}) {
  const [memories, setMemories] = useState(data.memories ?? []);

  useEffect(() => {
    if (data && data.memories) {
      setMemories(data.memories);
    }
  }, [data]);

  const removeMemoryFromList = (memoryId) => {
    setMemories((prevMemories) =>
      prevMemories.filter((memory) => memory._id !== memoryId)
    );
  };

  return (
    <div
      className={`container ${memories && memories.length > 0 ? "" : "noData"}`}
    >
      {memories && memories.length > 0 ? (
        memories.map((memory) => {
          return (
            <Memory
              id={memory._id}
              image={memory.image}
              title={memory.title}
              author={memory.author}
              setModal={setModal}
              setSelection={setMemorySelection}
              setMessage={setMessage}
              removeMemory={removeMemoryFromList}
            />
          );
        })
      ) : (
        <NoData
          icon={"./icons/memories-purple.png"}
          text={"You haven't posted anything yet. Go and try it out!"}
        />
      )}
    </div>
  );
}
