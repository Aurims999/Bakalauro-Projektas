import "./category.css";

export default function Category({ children }) {
  const category = children != "accommodation" ? children : "Hotel";
  return (
    <div className="categoryBubble">
      <img
        src={`/icons/categories/${children.toLowerCase()}-black.png`}
        alt={`${children} icon`}
      />
      <p>{category}</p>
    </div>
  );
}
