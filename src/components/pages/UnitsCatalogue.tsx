import { ArrowLeft } from "lucide-react";
import { UnitCard } from "../elements/UnitCard";
import { useNavigate } from 'react-router-dom'

export function UnitsCatalogue() {
    const navigate = useNavigate();
    const placeholderUnits = [
        {
            img: './placeholder_unit1.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 2,
            type: 'Group Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit2.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 6,
            type: 'Group Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit3.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 2,
            type: 'Suite',
            comfortLevel: 'Comfort'
        },
        {
            img: './placeholder_unit4.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 4,
            type: 'Group Room',
            comfortLevel: 'Normal'
        },
        {
            img: './placeholder_unit5.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 1,
            type: 'Single Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit6.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 8,
            type: 'Group Room',
            comfortLevel: 'High'
        },
    ]
    return (
        <div className="w-full h-screen p-4 lg:p-10 flex flex-col items-center relative">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold">Units Catalogue</h2>
            <div
                className="w-10 h-10 absolute top-4 left-4 lg:top-10 lg:left-10 md:w-[50px] md:h-[50px] bg-white rounded-full shadow-xl flex justify-center items-center cursor-pointer"
                onClick={() => navigate('/')}
            >
                <ArrowLeft />
            </div>
            <div className="w-full flex flex-wrap justify-between gap-y-8 mt-6">
                {placeholderUnits.map((unit, index) => (
                    <UnitCard
                        key={index}
                        img={unit.img}
                        description={unit.description}
                        occupancy={unit.occupancy}
                        type={unit.type}
                        comfortLevel={unit.comfortLevel}
                    />
                ))}
            </div>
        </div>
    );
}