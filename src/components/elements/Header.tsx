import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
    refs: {
        aboutRef: React.RefObject<HTMLDivElement | null>,
        unitsRef: React.RefObject<HTMLDivElement | null>,
        facilitiesRef: React.RefObject<HTMLDivElement | null>,
        locationRef: React.RefObject<HTMLDivElement | null>,
    },
    toggleMenu: () => void
    isMenuOpen: boolean
}
export function Header({ refs, toggleMenu }: HeaderProps) {

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;
        const yOffset = 0;
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
    return (
        <div className="w-full h-15 lg:h-20 rounded-2xl flex justify-between items-center bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-md px-4 lg:px-6">
            <div className="absolute inset-0 bg-white/30 rounded-2xl pointer-events-none z-0"></div>
            <div className="z-9999 w-full h-full rounded-2xl flex justify-between items-center">
                <div className="md:w-[15%] lg:w-[18%]">
                    <Logo />
                </div>

                <div
                    className="md:hidden w-[25px] gap-[5px] flex flex-col  items-center"
                    onClick={toggleMenu}
                >
                    <div className="w-full h-0.5 bg-[#1E1E1E] rounded-2xl"></div>
                    <div className="w-full h-0.5 bg-[#1E1E1E] rounded-2xl"></div>
                    <div className="w-full h-0.5 bg-[#1E1E1E] rounded-2xl"></div>
                </div>

                <div className="md:w-[310px] lg:w-[430px] hidden md:flex justify-between items-center text-[14px] md:text-[12px] lg:text-[14px] font-semibold text-[#1E1E1E]">
                    <p
                        className="cursor-pointer transition duration-300 hover:text-[#AE7461] hover:scale-105"
                        onClick={() => scrollTo(refs.aboutRef)}
                    >
                        About Us
                    </p>
                    <p
                        className="cursor-pointer transition duration-300 hover:text-[#AE7461] hover:scale-105"
                        onClick={() => scrollTo(refs.unitsRef)}
                    >
                        Our Units
                    </p>
                    <p
                        className="cursor-pointer transition duration-300 hover:text-[#AE7461] hover:scale-105"
                        onClick={() => scrollTo(refs.facilitiesRef)}
                    >
                        On-Site Facilities
                    </p>
                    <p
                        className="cursor-pointer transition duration-300 hover:text-[#AE7461] hover:scale-105"
                        onClick={() => scrollTo(refs.locationRef)}
                    >
                        Location
                    </p>
                </div>


                <div className="hidden md:flex md:w-[26%] lg:w-[25%] xl:w-[18%] justify-between items-center">
                    <div className="relative md:w-[90px] md:h-[35px] lg:w-[140px] lg:h-[50px] rounded-2xl border border-[#1E1E1E] flex justify-center items-center cursor-pointer overflow-hidden 
    transition duration-300 group">
                        <span className="absolute inset-0 bg-[#1E1E1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        <p className="text-[14px] md:text-[12px] lg:text-[14px] font-semibold text-[#1E1E1E] group-hover:text-[#F5F5F5] transition duration-300 relative z-10">
                            Contact Us
                        </p>
                    </div>
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
}