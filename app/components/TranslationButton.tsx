import Image from 'next/image';

interface TranslationButtonProps {
  onClick: () => void;
}

export default function TranslationButton({ onClick }: TranslationButtonProps) {
  return (
    <button onClick={onClick} className='flex text-[#F9FAFB] text-base font-bold border border-[#7CA9F3] rounded-xl gap-2 px-[22px] py-[11px] bg-[#263FA9] cursor-pointer transition-all duration-300 hover:brightness-[1.8] max-[359px]:text-[10px] max-[359px]:px-2.5 max-[359px]:py-[5px] max-[220px]:[&_img]:hidden'>
        <Image
            src="/sort-alfa.svg"
            alt="Alpha letter"
            width={24}
            height={24}
            className="sort-alpha-image w-full h-full max-[359px]:w-3 max-[359px]:h-auto"
            />
            {""}Translate
    </button>
  )
}
