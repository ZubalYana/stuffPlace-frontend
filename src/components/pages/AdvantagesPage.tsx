import { AdvantagesCard } from "../elements/AdvantagesCard";
import { Building2, CircleDollarSignIcon, BedDouble, BusFront, Cctv, ShoppingBasketIcon, LampDesk, Check, Star, ThumbsUp, Heart } from "lucide-react";
import { useState, useEffect } from 'react';
const ICON_MAP: Record<string, React.ElementType> = {
    Building2,
    CircleDollarSignIcon,
    BedDouble,
    BusFront,
    Cctv,
    ShoppingBasketIcon,
    LampDesk,
    Check,
    Star,
    ThumbsUp,
    Heart,
};

type Advantage = {
    _id: string;
    text: {
        en: string;
        hu: string;
    };
    icon: string;
    type: "Companies" | "Individuals";
};

export function AdvantagesPage() {
    const [advantagesText, setadvantagesText] = useState('');
    const [companiesAdvantages, setCompaniesAdvantages] = useState<
        { icon: React.ReactNode; text: string }[]
    >([]);

    const [individualsAdvantages, setIndividualsAdvantages] = useState<
        { icon: React.ReactNode; text: string }[]
    >([]);

    const iconsSize = 28;
    const iconsStrokeWidth = 2;
    const iconsColor = '#AE7461';

    const fetchText = async () => {
        try {
            const res = await fetch('http://localhost:5000/text')
            if (!res.ok) throw new Error("Failed to fetch text");
            const data = await res.json();

            setadvantagesText(data.advantagesText.en);
        } catch (err) {
            console.log('Error fetching text:', err)
        }
    }
    const fetchAdvantages = async () => {
        try {
            const res = await fetch("http://localhost:5000/advantages");
            if (!res.ok) throw new Error("Failed to fetch advantages");

            const data: Advantage[] = await res.json();

            const companies = data
                .filter(a => a.type === "Companies")
                .map(a => {
                    const Icon = ICON_MAP[a.icon];
                    return {
                        text: a.text.en,
                        icon: Icon ? (
                            <Icon
                                size={iconsSize}
                                strokeWidth={iconsStrokeWidth}
                                color={iconsColor}
                            />
                        ) : null,
                    };
                });

            const individuals = data
                .filter(a => a.type === "Individuals")
                .map(a => {
                    const Icon = ICON_MAP[a.icon];
                    return {
                        text: a.text.en,
                        icon: Icon ? (
                            <Icon
                                size={iconsSize}
                                strokeWidth={iconsStrokeWidth}
                                color={iconsColor}
                            />
                        ) : null,
                    };
                });

            setCompaniesAdvantages(companies);
            setIndividualsAdvantages(individuals);
        } catch (err) {
            console.error("Error fetching advantages:", err);
        }
    };


    useEffect(() => {
        fetchText();
        fetchAdvantages();
    }, []);

    return (
        <div className="w-full p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold text-center">Why Choose StaffPlace?</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[16px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center">{advantagesText}</p>

            <div className="flex flex-col mt-5 gap-6 lg:flex-row lg:gap-13 lg:mt-8">
                <AdvantagesCard
                    bg="/advantages-bg-1.webp"
                    title="Companies Get:"
                    advantages={companiesAdvantages}
                />
                <AdvantagesCard
                    bg="/advantages-bg-2.webp"
                    title="Individuals Get:"
                    advantages={individualsAdvantages}
                />
            </div>

        </div>
    );
}