import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/logo.svg"
        alt="WeTranslate logo"
        width={148}
        height={45}
        className="w-full max-w-[148px] h-auto max-h-[45px] mt-[92px] mb-[52px] mx-auto"
      />
      <Image
        src="/background.jpg"
        alt="Space background"
        fill
        className="object-cover -z-10"
        priority
        quality={100}
      />
      <div className="container">
        <div className="box detection">Detect language</div>
        <div className="box translation">Translate langage</div>
      </div>
    </div>
  );
}
