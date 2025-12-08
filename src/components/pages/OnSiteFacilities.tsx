import { Sofa, MonitorCogIcon, WashingMachine, ShoppingBasketIcon, Bike } from "lucide-react";
import { FacilityCard } from "../elements/FacilityCard";
export function OnSiteFacilities() {
    const iconSize = 24;
    const iconColor = "#F5F5F5";

    const facilities = [
        {
            icon: <Sofa size={iconSize} strokeWidth={2} color={iconColor} />,
            title: "Relax",
            description: "Multiply lounge areas and relax zones through the residential area, allowing all the inhabitants to rest and recharge their batteries.",
        },
        {
            icon: <MonitorCogIcon size={iconSize} strokeWidth={2} color={iconColor} />,
            title: "Productivity",
            description: "Quiet study space, work and lecture rooms located in the modern basement, high-speed Wi-Fi all around the residential area.",
        },
        {
            icon: <WashingMachine size={iconSize} strokeWidth={2} color={iconColor} />,
            title: "Chores",
            description: "Several laundries are available in our residence, this will for sure satisfy your cleaning requirements. Most units have kitchenettes, too.",
        },
        {
            icon: <ShoppingBasketIcon size={iconSize} strokeWidth={2} color={iconColor} />,
            title: "On-Site Shop",
            description: "In our On-Site shop you’ll find all the groceries needed. This saves our residences a lot of time, as there’s no need to seek for shops.",
        },
        {
            icon: <Bike size={iconSize} strokeWidth={2} color={iconColor} />,
            title: "Parking",
            description: "We have secure cars parking right on the residence territory, so don’t worry about your vehicles. We have bicycles parking as well.",
        },
    ]
    return (
        <div className="w-full min-h-screen p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold text-center">On-Site Facilities</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[16px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center">Our residence provides many shared amenities and services that ensure a comfortable living experience.</p>
            <div className="w-full flex justify-between flex-col gap-4 md:max-lg:flex-wrap md:max-lg:justify-center md:flex-row md:max-lg:gap-6 lg:gap-0 mt-6">
                {facilities.map((facility, index) => (
                    <FacilityCard
                        key={index}
                        icon={facility.icon}
                        title={facility.title}
                        description={facility.description}
                        index={index}
                    />
                ))}

            </div>
            <div className="w-full flex justify-center">
                <img src="./facilities-illustration-widened.webp" alt="facilities-illustration-widened" className="w-[95%] hidden md:block md:max-lg:mt-6" />
                <img src="./facilities-illustration-small.webp" alt="facilities-illustration-widened" className="w-full md:hidden mt-8" />
            </div>
        </div>
    );
}