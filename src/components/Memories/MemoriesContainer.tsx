import { useState, useEffect } from "react";

import Memory from "./Memory";

import "./container.css";

export default function MemoriesContainer({ data }) {
  const [memories, setMemories] = useState(data.memories ?? []);
  useEffect(() => {
    console.log(data);
    if (data && data.memories) {
      setMemories(data.memories);
    }
  }, [data]);

  return (
    <div className="container">
      {memories.map((memory) => {
        return (
          <Memory
            image={memory.image}
            title={memory.title}
            author={memory.author}
          />
        );
      })}
    </div>
  );
}
