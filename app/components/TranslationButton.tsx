import Image from 'next/image';

interface TranslationButtonProps {
  onClick: () => void;
}

export default function TranslationButton({ onClick }: TranslationButtonProps) {
  return (
    <button onClick={onClick} className='translate-button'>
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
