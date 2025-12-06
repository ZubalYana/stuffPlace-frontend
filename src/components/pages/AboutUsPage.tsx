import { Phone, Search } from "lucide-react";
export function AboutUs() {
    return (
        <div className="w-full h-screen p-4 lg:p-10 flex flex-col items-center relative">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold">About Us</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[14px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center"><span className="font-semibold">StaffPlace</span> offers modern, secure accommodation for individuals and corporate teams in the heart of Budapest. Located at <span className="font-semibold">Beke utca 22–26</span>, our four-storey complex features <span className="font-semibold">400</span> contemporary <span className="font-semibold">living units</span>, available for 2, 4, 6, or 8 people. Designed for comfort and independence, StaffPlace provides all essential amenities on-site, including relax zones, TV rooms, laundry rooms, an on-site shop, and lecture rooms in the basement. Our mission is to deliver convenient, well-managed housing where residents feel safe, supported, and at home.</p>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 mt-5 md:gap-8 md:mt-8 relative z-20">

                <div className="w-full h-12 md:w-[250px] md:h-17 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer">
                    <Phone color="white" size={24} strokeWidth={2.5} />
                    <h3 className="uppercase text-white font-bold text-[16px] md:text-[22px]">Contact Us</h3>
                </div>

                <div className="w-full h-12 md:w-[270px] md:h-17 flex justify-center items-center rounded-2xl border-[#1E1E1E] border-2 gap-3 cursor-pointer">
                    <Search color="#1E1E1E" size={24} strokeWidth={2.5} />
                    <h3 className="uppercase text-[#1E1E1E] font-bold text-[16px] md:text-[22px]">Learn More</h3>
                </div>

            </div>

            <div className="absolute bottom-0 left-0 w-full h-[500px] lg:h-[470px] overflow-hidden flex items-end lg:items-start">
                <img
                    src="/about us bg.webp"
                    alt="about us background"
                    className="w-full object-cover object-top"
                />
            </div>

        </div>
    );
}