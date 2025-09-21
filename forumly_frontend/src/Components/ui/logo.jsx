import CircularText from "./CircularText";

export default function DemoCircularText() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularText
        text="Forumly"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
      />
    </div>
  );
}
