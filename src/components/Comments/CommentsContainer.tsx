import Comment from "./Comment";

import "./commentsContainer.css";

export default function CommentsContainer() {
  return (
    <div className="allComments">
      <Comment>Hello World</Comment>
      <Comment>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
        corrupti labore ullam ipsum eaq? Minus consequuntur velit accusantium
        sint impedit commodi!
      </Comment>
      <Comment>Bon Bon bon</Comment>
    </div>
  );
}
