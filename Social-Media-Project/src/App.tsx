import MemoriesContainer from "./components/Memories/MemoriesContainer";
import Button from "./components/Others/Button/Button";

import "./App.css";

function App() {
  return (
    <>
      <main>
        <h1>Memories</h1>
        <Button
          icon={"./icons/plus-white.png"}
          innerText={"Share your memory"}
        />
        <MemoriesContainer />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
