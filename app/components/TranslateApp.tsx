import Logo from "./Logo";
import Background from "./Background"

export default function TranslateApp() {
  return (
    <div className="relative min-h-screen">
      <Logo/>
      <Background/>
      <div className="container">
        <div className="box detection">Detect language</div>
        <div className="box translation">Translate langage</div>
      </div>
    </div>
  );
}