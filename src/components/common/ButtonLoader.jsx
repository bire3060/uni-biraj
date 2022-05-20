import "./ButtonLoader.css";

export default function ButtonLoader() {
  return (
    <div className="main-loader-container">
      <div className="lds-ringButton">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
