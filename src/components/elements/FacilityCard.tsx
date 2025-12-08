import type { ReactNode } from "react";
type FacilityCardProps = {
    icon: ReactNode,
    title: string,
    description: string,
    index: number
}

export function FacilityCard({ icon, title, description, index }: FacilityCardProps) {
    return (
        <div className={`w-full md:w-[260px] md:h-[150px] rounded-xl bg-[#AE7461] text-[#F5F5F5] p-4 shadow-xl ${index % 2 == 1 ? 'lg:mt-6' : ''}`}>
            <div className="flex gap-2">
                <div>{icon}</div>
                <p className="text-[16px] font-bold">{title}</p>
            </div>
            <p className="text-[12px] md:text-[14px] font-light mt-2">{description}</p>
        </div>
    );
}
