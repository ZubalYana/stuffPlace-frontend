import { useState } from "react"
import { User2, Sofa, Armchair } from "lucide-react"

type UnitCardProps = {
    images: string[]
    description: string
    occupancy: number
    type: string
    comfortLevel: string
}


export function UnitCard({
    images,
    description,
    occupancy,
    type,
    comfortLevel
}: UnitCardProps) {

    const [activeImage, setActiveImage] = useState(images[0])
    const [expanded, setExpanded] = useState(false)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const isLong = description.length > 240
    const displayText = !expanded && isLong ? description.slice(0, 240) + "..." : description
    return (
        <div className="w-full h-fit md:min-h-[460px] lg:w-[460px] bg-white shadow-xl text-[#1E1E1E] rounded-xl overflow-hidden">

            <div className="w-full aspect-4/3 md:aspect-video relative overflow-hidden">
                <img
                    src={activeImage}
                    alt="Unit image"
                    className="w-full h-full object-cover object-center transition-transform duration-300 cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                />


                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full">
                        {images.map((img: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(img)}
                                className={`w-10 h-7 rounded-md overflow-hidden border transition cursor-pointer
                                    ${activeImage === img
                                        ? "border-[#1E1E1E] scale-105"
                                        : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full p-4 h-[43%] md:h-auto">
                <p className="text-[12px] md:text-[14px] font-light">
                    {displayText}
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="ml-1 text-gray-500 font-semibold text-[12px] md:text-[14px] cursor-pointer"
                        >
                            {expanded
                                ? localStorage.getItem('language') === 'en'
                                    ? "Show Less"
                                    : "Kevesebb"
                                : localStorage.getItem('language') === 'en'
                                    ? "Show More"
                                    : "Továbbiak"}
                        </button>

                    )}
                </p>

                <div className="flex gap-1 mt-4">
                    <User2 size={20} />
                    <p className="font-light text-[14px] md:text-[16px]">
                        {localStorage.getItem('language') === 'en' ?
                            <span>
                                Occupancy:{" "}
                                <span className="font-semibold">
                                    {occupancy} {occupancy > 1 ? "people" : "person"}
                                </span>
                            </span>
                            :
                            <span>
                                Kapacitás:{" "}
                                <span className="font-semibold">
                                    {occupancy} fős
                                </span>
                            </span>
                        }

                    </p>
                </div>

                <div className="flex gap-1 mt-2">
                    <Sofa size={20} />
                    <p className="font-light text-[14px] md:text-[16px]">
                        {localStorage.getItem('language') === 'en' ? 'Type:' : 'Típus:'} <span className="font-semibold">{type}</span>
                    </p>
                </div>

                <div className="flex gap-1 mt-2">
                    <Armchair size={20} />
                    <p className="font-light text-[14px] md:text-[16px]">
                        {localStorage.getItem('language') === 'en' ? 'Comfort Level:' : 'Komfortszint:'}{" "}
                        <span className="font-semibold">{comfortLevel}</span>
                    </p>
                </div>
            </div>
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <img
                        src={activeImage}
                        alt="Fullscreen unit"
                        className="max-w-[95vw] max-h-[95vh] object-contain"
                    />
                </div>
            )}

        </div>
    )
}
