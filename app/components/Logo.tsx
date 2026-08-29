import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="WeTranslate logo"
      width={148}
      height={45}
      className="w-full max-w-[148px] h-auto max-h-[45px] mt-[92px] mb-[52px] mx-auto"
    />
  );
}
