import "../../public/assets/css/loader.css";

export default function Loader({
  position = "fixed",
}: {
  position?: "fixed" | "absolute";
}) {
  return (
    <div
      className={
        position +
        " top-0 left-0 w-full h-full bg-gray-100/70 flex justify-center items-center z-[100] pointer-events-auto"
      }
    >
      <div className="loader"></div>
    </div>
  );
}
