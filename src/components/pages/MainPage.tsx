import { Header } from "../elements/Header"
import { Handshake, Eye, ArrowDown } from "lucide-react"
export function MainPage() {
    return (
        <div className="w-full h-screen p-4 lg:p-10">
            <div className="z-20 relative">
                <Header />
                <div className="w-full h-[425px] xs:max-sm:h-[415px] md:max-lg:h-[410px] lg:max-xl:h-[600px] xl:h-[450px] rounded-2xl flex flex-col items-center bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-md p-4 md:p-6 mt-6">
                    <div className="absolute inset-0 bg-white/30 rounded-2xl pointer-events-none z-0"></div>

                    <h1 className="w-full text-[24px] xs:text-[27px] md:text-[42px] lg:text-[64px] md:w-[90%] lg:max-xl:w-[70%] xl:w-[60%] xl:text-[64px] text-center font-bold text-[#1E1E1E] leading-[1.2] relative z-20">Strategic Location and Modern Living in <span className="text-[#AE7461]">Budapest</span></h1>
                    <div className="w-full flex flex-col items-center mt-3 relative z-20">
                        <p className="text-[12px] xs:text-[13px] w-full md:text-[14px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-[65%] text-center"><span className="font-semibold">StaffPlace</span> offers contemporary accommodation for individual residents and corporate teams in the heart of Budapest.</p>

                        <p className="text-[12px] xs:text-[13px] w-full md:text-[14px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-[65%] text-center mt-2">
                            Located at <span className="font-semibold">Beke utca 22–26</span>, our four-storey complex features <span className="font-semibold">400</span> modern and secure <span className="font-semibold">living units</span>, designed to provide a convenient, well-managed housing solution where comfort, independence, and safety are the top priorities.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 mt-5 md:gap-8 md:mt-12 relative z-20">

                        <div className="relative w-full h-13 md:w-[280px] md:h-18 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer overflow-hidden
    group transition duration-300">
                            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                            <Handshake
                                strokeWidth={2.5}
                                size={28}
                                stroke="currentColor"
                                className="relative z-10 transition duration-300 text-white group-hover:text-[#AE7461]"
                            />
                            <h3 className="relative z-10 uppercase text-white font-bold text-[18px] md:text-[24px]
        transition duration-300 group-hover:text-[#AE7461]">
                                Partnership
                            </h3>
                        </div>



                        <div className="relative w-full h-13 md:w-[300px] md:h-18 flex justify-center items-center rounded-2xl border-2 border-[#1E1E1E] gap-3 cursor-pointer overflow-hidden
    group transition duration-300 bg-transparent">
                            <span className="absolute inset-0 bg-[#1E1E1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                            <Eye
                                strokeWidth={2.5}
                                size={28}
                                stroke="currentColor"
                                className="relative z-10 transition duration-300 text-[#1E1E1E] group-hover:text-white"
                            />
                            <h3 className="relative z-10 uppercase font-bold text-[18px] md:text-[24px]
        transition duration-300 text-[#1E1E1E] group-hover:text-white">
                                Explore Units
                            </h3>
                        </div>



                    </div>

                </div>
            </div>

            <div className="uppercase text-white text-[14px] md:text-[16px] font-normal relative z-20 w-full flex justify-center items-center mt-4 xs:max-sm:mt-6 md:mt-6 lg:mt-10 gap-1 md:gap-2 cursor-pointer"><h4>Feel free to learn more</h4> <ArrowDown /></div>

            <div>
                <img src="/main page bg.webp" alt="main page background" className="h-screen w-full bg-center object-cover xl:w-full xl:max-h-screen absolute top-0 left-0 z-0" />
            </div>
        </div>
    )
}