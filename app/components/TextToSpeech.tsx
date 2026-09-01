import Image from 'next/image';

export default function TextToSpeech() {
  return (
    <Image
    src="/sound.svg"
    alt="Copy text"
    width={36}
    height={36}
    className="sound w-full h-full"
    />
  )
}
