import { Phone, Search } from "lucide-react";
import { useState, useEffect } from 'react';
export function AboutUs() {
    const [aboutUsText, setAboutText] = useState('');
    const fetchText = async () => {
        try {
            const res = await fetch('http://localhost:5000/text')
            if (!res.ok) throw new Error("Failed to fetch text");
            const data = await res.json();

            setAboutText(data.aboutUsText.en.text);
        } catch (err) {
            console.log('Error fetching text:', err)
        }
    }

    useEffect(() => {
        fetchText();
    }, []);
    return (
        <div className="w-full h-screen p-4 lg:p-10 flex flex-col items-center relative">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] text-[#1E1E1E] font-bold">About Us</h2>
            <p className="text-[12px] xs:text-[13px] w-full md:text-[14px] lg:max-xl:text-[20px] font-light md:w-[85%] xl:w-full text-center" style={{ whiteSpace: "pre-wrap" }}>{aboutUsText}</p>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 mt-5 md:gap-8 md:mt-8 relative z-20">

                <div className="relative w-full h-12 md:w-[250px] md:h-17 flex justify-center items-center rounded-2xl bg-[#AE7461] gap-3 cursor-pointer overflow-hidden
    group transition duration-300 border-2 border-transparent hover:border-[#AE7461]">
                    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                    <Phone
                        strokeWidth={2.5}
                        size={24}
                        stroke="currentColor"
                        className="relative z-10 transition duration-300 text-white group-hover:text-[#AE7461]"
                    />
                    <h3 className="relative z-10 uppercase font-bold text-[16px] md:text-[22px]
        text-white transition duration-300 group-hover:text-[#AE7461]">
                        Contact Us
                    </h3>
                </div>

                <div className="relative w-full h-12 md:w-[270px] md:h-17 flex justify-center items-center rounded-2xl border-2 border-[#1E1E1E] gap-3 cursor-pointer overflow-hidden
    group transition duration-300 bg-transparent">
                    <span className="absolute inset-0 bg-[#1E1E1E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                    <Search
                        strokeWidth={2.5}
                        size={24}
                        stroke="currentColor"
                        className="relative z-10 transition duration-300 text-[#1E1E1E] group-hover:text-white"
                    />
                    <h3 className="relative z-10 uppercase font-bold text-[16px] md:text-[22px]
        text-[#1E1E1E] transition duration-300 group-hover:text-white">
                        Learn More
                    </h3>
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