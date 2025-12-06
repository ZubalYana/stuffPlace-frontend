import { User2 } from 'lucide-react'
type SectionUnitCardProps = {
    img: string,
    description: string,
    occupancy: number
}
export function SectionUnitCard({ img, description, occupancy }: SectionUnitCardProps) {

    return (
        <div className="w-full md:h-[420px] lg:w-[460px] bg-white shadow-2xl text-[#1E1E1E] rounded-xl">
            <div className="w-full h-[57%] md:h-[62%]">
                <img src={img} alt={img} className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className='w-full p-4 h-[43%] md:h-auto'>
                <p className="text-[12px] md:text-[14px] font-light">{description}</p>
                <div className='flex gap-1 mt-4'>
                    <User2 size={20} color="#AE7461" fill="#AE7461" />
                    <p className='font-light text-[14px]  md:text-[16px]'>Occupancy: <span className='font-semibold'>{occupancy}{occupancy > 1 ? ' people' : ' person'}</span></p>
                </div>
            </div>
        </div>
    );
}