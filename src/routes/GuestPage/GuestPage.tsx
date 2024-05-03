import Header from "../../components/Header/Header";
import Button from "../../components/Others/Button/Button";

import "./guestPage.css";
import "../../assets/animations/animations.css";

export default function MessagesPage() {
  return (
    <div className="guestPageContainer">
      <Header />
      <div className="guestPageMainContent">
        <section className="textBlock">
          <h1>
            Trip
            <span style={{ color: "var(--main__purple)" }}> Experience </span>
            <span style={{ color: "var(--main__orange)" }}>Sharing </span>
            website by people for people
          </h1>
          <h2>
            Share your trip experience with your friends and find some
            inspiration for your next trip!
          </h2>
          <Button innerText={"Try it Out"} link={"/login"} />
        </section>
        <section className="visuals">
          <img
            src="./images/visuals/guestpage-visuals.png"
            alt="guest page visuals"
          />
        </section>
      </div>
    </div>
  );
}
