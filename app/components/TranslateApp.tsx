import Logo from "./Logo";
import Background from "./Background"
import TranslateForm from "./TranslateForm";

export default function TranslateApp() {
  return (
    <div className="relative min-h-screen">
      <Logo/>
      <Background/>
      <TranslateForm/>
    </div>
  );
}