import Image from 'next/image';

export default function TranslationButton() {
  return (
    <button className='translate-button'>
        <Image
            src="/sort-alfa.svg"
            alt="Alpha letter"
            width={24}
            height={24}
            className="sort-alpha-image w-full h-full"
            />
            {""}Translate
    </button>
  )
}
