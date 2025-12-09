import { User2, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

type SectionUnitCardProps = {
    img: string,
    description: string,
    occupancy: number
}

export function SectionUnitCard({ img, description, occupancy }: SectionUnitCardProps) {
    const navigate = useNavigate()

    return (
        <div className="w-full md:h-[420px] lg:w-[460px] bg-white shadow-2xl text-[#1E1E1E] rounded-xl cursor-pointer relative group overflow-hidden">
            <div className="absolute inset-0 bg-white/0 rounded-xl transition-all duration-300 group-hover:bg-white/70 z-10"></div>

            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div
                    className="relative px-4 py-2 md:w-[300px] md:h-18 flex justify-center items-center rounded-2xl border-2 border-[#1E1E1E] gap-3 cursor-pointer overflow-hidden
        bg-transparent transition duration-300 group/button"
                    onClick={() => navigate('/units')}
                >
                    <span className="absolute inset-0 bg-[#1E1E1E] scale-x-0 group-hover/button:scale-x-100 origin-left transition-transform duration-300"></span>

                    <Eye
                        strokeWidth={2.5}
                        size={28}
                        className="relative z-10 transition duration-300 text-[#1E1E1E] group-hover/button:text-white"
                    />

                    <h3 className="relative z-10 uppercase font-bold text-[18px] md:text-[24px] transition duration-300 text-[#1E1E1E] group-hover/button:text-white">
                        Show More
                    </h3>
                </div>
            </div>


            {/* Image */}
            <div className="w-full h-[57%] md:h-[62%] relative z-0">
                <img src={img} alt={img} className="w-full h-full object-cover object-center rounded-t-xl transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* Text and occupancy */}
            <div className='w-full p-4 h-[43%] md:h-auto relative z-0'>
                <p className="text-[12px] md:text-[14px] font-light">{description}</p>
                <div className='flex gap-1 mt-4'>
                    <User2 size={20} color="#AE7461" fill="#AE7461" />
                    <p className='font-light text-[14px] md:text-[16px]'>
                        Occupancy: <span className='font-semibold'>{occupancy}{occupancy > 1 ? ' people' : ' person'}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
