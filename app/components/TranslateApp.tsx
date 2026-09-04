import Logo from "./Logo";
import Background from "./Background";
import TranslateForm from "./TranslateForm";

export default function TranslateApp() {
  return (
    <div className="app relative min-h-screen">
      <div className="wrapper my-10 min-[413px]:my-[92px]">
        <Logo />
        <Background />
        <TranslateForm />
      </div>
    </div>
  );
}
