import Table from "../../components/Others/Table/Table";
import Button from "../../components/Others/Button/Button";

export default function MessagesPage(){
    return(
        <main>
            <h1>Messages</h1>
            <Button innerText={"Back to Main Page"}
                    link={"/"}/>
            <Table/>
        </main>
    );
}