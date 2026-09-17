import Image from "next/image";

export default function Background() {
  return (
    <Image
      src="/background.jpg"
      alt="Space background"
      fill
      className="object-cover -z-10"
      priority
    />
  );
}
