import { AdvantagesCard } from "../elements/AdvantagesCard";
import { Building2, CircleDollarSignIcon, BedDouble, BusFront, Cctv, ShoppingBasketIcon, LampDesk } from "lucide-react";
import { useState, useEffect } from 'react';
export function AdvantagesPage() {
    const [advantagesText, setadvantagesText] = useState('');
    const iconsSize = 28;
    const iconsStrokeWidth = 2;
    const iconsColor = '#AE7461';
    const companiesAdvantages = [
        {
            icon: <Building2 size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Reliable, well-managed accommodation for staff and corporate teams",
        },
        {
            icon: <CircleDollarSignIcon size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Cost-effective housing compared to traditional rentals or hotels",
        },
        {
            icon: <BedDouble size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Units for 2, 4, 6, or 8 people — ideal for team arrangements",
        },
        {
            icon: <BusFront size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Central Budapest location with easy access to transport",
        },
        {
            icon: <Cctv size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Secure and controlled environment for your employees",
        },
        {
            icon: <ShoppingBasketIcon size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "On-site facilities (shop, laundry, TV rooms, relax zones) reduce time spent on daily logistics",
        },
    ]
    const individualsAdvantages = [
        {
            icon: <BedDouble size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Modern, comfortable living units with room options to fit your lifestyle",
        },
        {
            icon: <Cctv size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Safe, secure environment with controlled access to the living zones",
        },
        {
            icon: <ShoppingBasketIcon size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Convenient on-site amenities including laundry rooms, relax zones, TV rooms, and a shop",
        },
        {
            icon: <LampDesk size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Study and training rooms available in the basement",
        },
        {
            icon: <BusFront size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Great location close to public transport, shops, and city life",
        },
        {
            icon: <CircleDollarSignIcon size={iconsSize} strokeWidth={iconsStrokeWidth} color={iconsColor} />,
            text: "Affordable living compared to private rentals in Budapest",
        },
    ]

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

    useEffect(() => {
        fetchText();
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