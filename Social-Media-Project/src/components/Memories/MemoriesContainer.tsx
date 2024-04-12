import Memory from "./Memory";

import "./container.css";

export default function MemoriesContainer({ data }) {
  return (
    <div className="container">
      <Memory
        image={"./images/memories/example__memory-1.jpg"}
        title={"Sunny Flight to Honduras"}
        author={"TravelForLife"}
        authorImage={"./images/users/example__profilePic-1.jpg"}
      />
      <Memory
        image={"./images/memories/example__memory-2.jpg"}
        title={"Strength of Mountains"}
        author={"Mountains Lover <3"}
        authorImage={"./images/users/example__profilePic-2.jpg"}
      />
      <Memory
        image={"./images/memories/example__memory-3.jpg"}
        title={"Beauty of Kaunas"}
        author={"PhotoMaster<3"}
        authorImage={"./images/users/example__profilePic-3.jpg"}
      />
      <Memory
        image={"./images/memories/example__memory-4.jpg"}
        title={"Sunset glory"}
        author={"ILoveSunsets-49582"}
        authorImage={"./images/users/example__profilePic-4.jpg"}
      />
      <Memory
        image={"./images/memories/example__memory-5.jpg"}
        title={"Gorgeous Malta"}
        author={"Generic Traveler 548"}
        authorImage={"./images/users/example__profilePic-5.jpg"}
      />
      <Memory
        image={"./images/memories/example__memory-6.jpg"}
        title={"Cold mountains"}
        author={"Mountains Lover <3 (2)"}
        authorImage={"./images/users/example__profilePic-6.jpg"}
      />
    </div>
  );
}
