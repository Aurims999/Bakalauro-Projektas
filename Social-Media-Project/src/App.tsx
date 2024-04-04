import Button from "./components/Sidebar/Other/Button/Button";

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
        <div className="post">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Kauno_senamiestis_by_Augustas_Didzgalvis.jpg/268px-Kauno_senamiestis_by_Augustas_Didzgalvis.jpg"
            alt=""
          />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt=""
          />
          <h2>Title</h2>
          <p>Author</p>
          <button>Heart Icon</button>
        </div>
        <div className="post">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Kauno_senamiestis_by_Augustas_Didzgalvis.jpg/268px-Kauno_senamiestis_by_Augustas_Didzgalvis.jpg"
            alt=""
          />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt=""
          />
          <h2>Title</h2>
          <p>Author</p>
          <button>Heart Icon</button>
        </div>
        <div className="post">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Kauno_senamiestis_by_Augustas_Didzgalvis.jpg/268px-Kauno_senamiestis_by_Augustas_Didzgalvis.jpg"
            alt=""
          />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt=""
          />
          <h2>Title</h2>
          <p>Author</p>
          <button>Heart Icon</button>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
