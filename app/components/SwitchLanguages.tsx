import Image from "next/image";

export default function SwitchLanguages() {
  return (
    <button>
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
