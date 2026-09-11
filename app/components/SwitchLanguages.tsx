import Image from "next/image";

interface SwitchLanguagesProps {
  onSwitch?: () => void;
}

export default function SwitchLanguages({ onSwitch }: SwitchLanguagesProps) {
  return (
    <button onClick={onSwitch}>
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
