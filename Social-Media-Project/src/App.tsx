import Sidebar from "./components/Sidebar/Sidebar";
import MemoriesContainer from "./components/Memories/MemoriesContainer";
import Button from "./components/Others/Button/Button";

import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Sidebar />
      <main>
        <h1>Memories</h1>
        <Button
          icon={"./icons/plus-white.png"}
          innerText={"Share your memory"}
        />
        <MemoriesContainer />
      </main>
    </div>
  );
}

export default App;
