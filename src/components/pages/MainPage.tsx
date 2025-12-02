import { Header } from "../elements/Header"
import { Handshake, Eye } from "lucide-react"
export function MainPage() {
    return (
        <div className="w-full h-screen p-10">
            <div className="z-20 relative">
                <Header />
                <div className="w-full h-[450px] rounded-2xl flex flex-col items-center bg-[rgba(255, 255, 255, 0.5)] backdrop-blur-xl px-6 py-6 mt-5">
                    <h1 className="w-[60%] text-[64px] text-center font-bold text-[#1E1E1E] leading-[1.2]">Strategic Location and Modern Living in <span className="text-[#AE7461]">Budapest</span></h1>
                    <div className="w-full flex flex-col items-center mt-3">
                        <p className="text-[16px] font-light w-[65%] text-center"><span className="font-semibold">StaffPlace</span> offers contemporary accommodation for individual residents and corporate teams in the heart of Budapest.</p>

                        <p className="text-[16px] font-light w-[65%] text-center mt-2">
                            Located at <span className="font-semibold">Beke utca 22–26</span>, our four-storey complex features <span className="font-semibold">400</span> modern and secure <span className="font-semibold">living units</span>, designed to provide a convenient, well-managed housing solution where comfort, independence, and safety are the top priorities.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 mt-12">

                        <div className="w-[280px] h-18 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3">
                            <Handshake color="white" size={28} strokeWidth={2.5} />
                            <h3 className="uppercase text-white font-bold text-[24px]">Partnership</h3>
                        </div>

                        <div className="w-[300px] h-18 flex justify-center items-center rounded-2xl border-[#1E1E1E] border-2 gap-3">
                            <Eye color="#1E1E1E" size={28} strokeWidth={2.5} />
                            <h3 className="uppercase text-[#1E1E1E] font-bold text-[24px]">Explore Units</h3>
                        </div>

                    </div>

                </div>
            </div>
            <div>
                <img src="/main page bg.webp" alt="main page background" className="w-full max-h-screen absolute top-0 left-0 z-0" />
            </div>
        </div>
    )
}