import Image from "next/image";

export default function ExpandDownButton() {
  return (
    <Image
      src="/Expand_down.svg"
      alt="Arrow down"
      width={16}
      height={16}
      className="w-full h-full ml-[4px]"
    />
  );
}
