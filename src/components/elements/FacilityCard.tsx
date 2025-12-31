import type { ReactNode } from "react";
type FacilityCardProps = {
    icon: ReactNode,
    title: string,
    description: string,
    index: number
}

export function FacilityCard({ icon, title, description, index }: FacilityCardProps) {
    return (
        <div className={`w-full md:w-[260px] md:h-[155px] lg:w-[175px] lg:h-[155px] xl:w-[260px] xl:h-[155px] rounded-xl bg-[#AE7461] text-[#F5F5F5] p-4 lg:max-xl:p-2 shadow-xl ${index % 2 == 1 ? 'lg:mt-6' : ''} hover:scale-103 hover:shadow-2xl transition duration-300`}>
            <div className="flex gap-2 lg:max-xl:gap-1">
                <div>{icon}</div>
                <p className="text-[16px] lg:max-xl:text-[14px] xl:text-[16px] font-bold">{title}</p>
            </div>
            <p className={`${localStorage.getItem('language') === 'en' ? 'md:text-[14px]' : 'md:text-[13px]'} text-[12px] font-light lg:max-xl:text-[12px] xl:text-[13px] mt-2`}>{description}</p>
        </div>
    );
}
