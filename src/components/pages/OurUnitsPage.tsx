import { SectionUnitCard } from "../elements/SectionUnitCard";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export function OurUnitsPage() {
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);
    const [unitsText, setUnitsText] = useState('');

    type Unit = {
        description: {
            en: string;
            hu: string;
        };
        images: string[];
        occupancy: number;
        type: {
            en: string;
            hu: string;
        };
        comfortLevel: {
            en: string;
            hu: string;
        };
        highlighted: boolean;
    };

    const loadHighlightedImages = async () => {
        try {
            const res = await fetch(`http://localhost:5000/units`)
            if (!res.ok) throw new Error('Failed to fetch units');

            const data = await res.json();
            setUnits(data);
            console.log(data);
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        loadHighlightedImages();
    }, []);

    const fetchText = async () => {
        try {
            const res = await fetch('http://localhost:5000/text')
            if (!res.ok) throw new Error("Failed to fetch text");
            const data = await res.json();

            setUnitsText(data.unitsText.en);
        } catch (err) {
            console.log('Error fetching text:', err)
        }
    }

    useEffect(() => {
        fetchText();
    }, []);

    return (
        <div className="w-full min-h-screen p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold text-center">Explore Our Units</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[16px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center">{unitsText}</p>

            <div className="w-full mt-8 flex flex-col gap-4 lg:flex-row lg:justify-between">
                {units
                    .filter((unit: Unit) => unit.highlighted)
                    .slice(0, 3)
                    .map((unit: Unit, index: number) => (
                        <SectionUnitCard
                            key={index}
                            img={unit.images[0]}
                            description={unit.description.en}
                            occupancy={unit.occupancy}
                        />
                    ))}

            </div>

            <div
                className="relative w-full h-13 md:w-60 md:h-15 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer mt-8 overflow-hidden
    group transition duration-300 border-2 border-transparent hover:border-[#AE7461]"
                onClick={() => navigate('/units')}
            >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                <Search
                    strokeWidth={2.5}
                    size={24}
                    stroke="currentColor"
                    className="relative z-10 transition duration-300 text-white group-hover:text-[#AE7461]"
                />
                <h3 className="relative z-10 uppercase font-bold text-[18px] md:text-[20px]
        text-white transition duration-300 group-hover:text-[#AE7461]">
                    See All Units
                </h3>
            </div>

        </div>
    );
}