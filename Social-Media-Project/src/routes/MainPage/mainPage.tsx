import Button from "../../components/Others/Button/Button";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";

export default function MainPage(){
    return(
        <main>
            <h1>Memories</h1>
            <Button
                icon={"./icons/plus-white.png"}
               innerText={"Share your memory"}
           />
            <MemoriesContainer />
        </main>
    );
}