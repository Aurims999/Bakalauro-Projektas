import Comment from "./Comment";

import "./commentsContainer.css";

export default function CommentsContainer() {
  return (
    <div className="allComments">
      <Comment>Hello World</Comment>
      <Comment>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
        corrupti labore ullam ipsum eaque saepe nostrum ipsa blanditiis facilis
        doloremque sint consequatur repellendus officia optio temporibus ex
        obcaecati error ab, iure earum nesciunt placeat repudiandae? Atque minus
        ut accusamus doloremque hic. Error, ab? Minus consequuntur velit
        accusantium sint impedit commodi!
      </Comment>
      <Comment>Bon Bon bon</Comment>
    </div>
  );
}
