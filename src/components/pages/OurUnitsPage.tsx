import { SectionUnitCard } from "../elements/SectionUnitCard";
import { Search } from "lucide-react";
export function OurUnitsPage() {

    return (
        <div className="w-full min-h-screen p-4 lg:p-10 flex flex-col items-center relative mt-6 lg:mt-0">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold text-center">Explore Our Units</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[16px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center">Visit the Units page for more information or get in touch to reserve your room.</p>

            <div className="w-full mt-8 flex flex-col gap-4 lg:flex-row lg:justify-between">
                <SectionUnitCard
                    img="/placeholder_unit1.webp"
                    description="A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living."
                    occupancy={2}
                />
                <SectionUnitCard
                    img="/placeholder_unit2.webp"
                    description="A cozy, well-organized studio designed for both comfort and efficiency. It features a wide single bed, a compact dining corner, and a fully equipped kitchenette for everyday meals. The large window brightens the space and complements the calm interior."
                    occupancy={6}
                />
                <SectionUnitCard
                    img="/placeholder_unit3.webp"
                    description="A bright, spacious unit with a fresh, modern layout and smart storage solutions. It includes a comfy double bed, a stylish kitchenette, and a sleek private bathroom stocked with essentials. Warm lighting and neutral decor make it a relaxing place to stay."
                    occupancy={4}
                />
            </div>

            <div className="w-full h-13 md:w-[240px] md:h-15 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer mt-8">
                <Search color="white" size={24} strokeWidth={2.5} />
                <h3 className="uppercase text-white font-bold text-[18px] md:text-[20px]">See All Units</h3>
            </div>
        </div>
    );
}