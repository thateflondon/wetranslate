import Image from "next/image";

interface SwitchLanguagesProps {
  onSwitch?: () => void;
}

export default function SwitchLanguages({ onSwitch }: SwitchLanguagesProps) {
  return (
    <button onClick={onSwitch} className="cursor-pointer transition-all duration-300 hover:brightness-[1.8]">
      <Image
        src="/switch-language.svg"
        alt="switch language"
        width={32}
        height={32}
        className="switch"
      />
    </button>
  );
}
