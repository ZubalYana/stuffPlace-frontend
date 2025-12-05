import type { ReactNode } from "react";
type Advantage = {
    icon: ReactNode;
    text: string;
};

type AdvantagesCardProps = {
    bg: string;
    title: string;
    advantages: Advantage[];
};
export function AdvantagesCard({ bg, title, advantages }: AdvantagesCardProps) {
    return (
        <div className="w-full h-[480px] lg:w-[550px] lg:h-[450px] relative">
            <div className="w-[75%] h-full rounded-[10px] absolute left-0 top-0 bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-md relative p-4 z-20">
                <div className="absolute inset-0 bg-white/70 rounded-[10px] pointer-events-none z-2"></div>
                <div className="w-full h-full flex flex-col items-center relative z-50 lg:p-2">
                    <h3 className="text-[18px] lg:text-[28px] text-[#1E1E1E] font-bold mb-4">{title}</h3>
                    {advantages.map((adv, index) => (
                        <div className="w-full flex gap-2 items-center mb-3" key={index}>
                            <div className="min-w-[35px] min-h-[35px] flex justify-center items-center">{adv.icon}</div>
                            <p className="text-[14px] text-[#333]">{adv.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <img src={bg} alt={bg} className="w-full h-full rounded-[10px] object-cover bg-center absolute top-0 left-0 z-0" />
        </div>
    );
}