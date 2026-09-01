import Image from 'next/image';

export default function CopyText() {
  return (
    <Image
    src="/copy-text.svg"
    alt="Copy text"
    width={36}
    height={36}
    className="copy-text w-full h-full"
    />
  )
}
