import { User2, Sofa, Armchair } from "lucide-react"
type UnitCardProps = {
    img: string,
    description: string,
    occupancy: number,
    type: string,
    comfortLevel: string,
}
export function UnitCard({ img, description, occupancy, type, comfortLevel }: UnitCardProps) {
    return (
        <div className="w-full h-fit md:h-[460px] lg:w-[460px] bg-white shadow-xl text-[#1E1E1E] rounded-xl">
            <div className="w-full h-[55%] md:h-[50%]">
                <img src={img} alt={img} className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className='w-full p-4 h-[43%] md:h-auto'>
                <p className="text-[12px] md:text-[14px] font-light">{description}</p>
                <div className='flex gap-1 mt-4'>
                    <User2 size={20} color="#1E1E1E" />
                    <p className='font-light text-[14px]  md:text-[16px]'>Occupancy: <span className='font-semibold'>{occupancy}{occupancy > 1 ? ' people' : ' person'}</span></p>
                </div>
                <div className='flex gap-1 mt-2'>
                    <Sofa size={20} color="#1E1E1E" />
                    <p className='font-light text-[14px]  md:text-[16px]'>Type: <span className='font-semibold'>{type}</span></p>
                </div>
                <div className='flex gap-1 mt-2'>
                    <Armchair size={20} color="#1E1E1E" />
                    <p className='font-light text-[14px]  md:text-[16px]'>Comfort Level: <span className='font-semibold'>{comfortLevel}</span></p>
                </div>
            </div>
        </div>
    );
}