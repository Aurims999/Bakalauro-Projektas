import Comment from "./Comment";

import "./commentsContainer.css";

export default function CommentsContainer() {
  return (
    <div className="allComments">
      <Comment>Wonderful post. Keep up the great work</Comment>
      <Comment>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
        corrupti labore ullam ipsum eaq? Minus consequuntur velit accusantium
        sint impedit commodi!
      </Comment>
      <Comment>Hello there. Glad to see you again :D</Comment>
    </div>
  );
}
