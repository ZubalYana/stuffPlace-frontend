import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
export function Header() {
    return (
        <div className="w-full h-20 rounded-2xl flex justify-between items-center bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-xl
px-6">
            <div className="w-[18%]">
                <Logo />
            </div>

            <div className="w-[430px] flex justify-between items-center text-[14px] font-semibold text-[#1E1E1E]">
                <p className="cursor-pointer">About Us</p>
                <p className="cursor-pointer">Our Units</p>
                <p className="cursor-pointer">On-Site Facilities</p>
                <p className="cursor-pointer">Location</p>
            </div>

            <div className="flex w-[18%] justify-between items-center">
                <div className="w-[140px] h-[50px] border-[#1E1E1E] border rounded-2xl flex justify-center items-center cursor-pointer">
                    <p className="text-[14px] font-semibold">Contact Us</p>
                </div>
                <LanguageSwitcher />
            </div>
        </div>
    );
}