import "./noData.css";

export default function NoData({ icon, text }) {
  return (
    <div className="noData-InfoBlock">
      <img src={icon} alt="No data found" />
      <p>{text}</p>
    </div>
  );
}
