import { useState, useEffect } from "react"
import { X, Phone, MailIcon, MapPin } from "lucide-react"
import { API_URL } from '../../config'
type ResponsiveNavigationProps = {
    refs: {
        aboutRef: React.RefObject<HTMLDivElement | null>
        unitsRef: React.RefObject<HTMLDivElement | null>
        facilitiesRef: React.RefObject<HTMLDivElement | null>
        locationRef: React.RefObject<HTMLDivElement | null>
    }
    closeMenu: () => void
    isMenuOpen: boolean
}

type Contacts = {
    phone: string
    email: string
    facebook: string
    instagram: string
    telegram: string
    location: string
    adress: {
        en: string
        hu: string
    }
}
export function ResponsiveNavigation({ refs, closeMenu, isMenuOpen }: ResponsiveNavigationProps) {
    const [contacts, setContacts] = useState<Contacts>({
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        telegram: '',
        location: '',
        adress: { en: '', hu: '' },
    })

    const isHU = localStorage.getItem('language') === 'hu';

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({ top: y, behavior: "smooth" })
        closeMenu()
    }

    useEffect(() => {
        if (!isMenuOpen) return

        const fetchContacts = async () => {
            try {
                const res = await fetch(`${API_URL}/contacts`)
                if (!res.ok) throw new Error('Failed to fetch contacts')
                const data = await res.json()
                setContacts(data)
            } catch (err) {
                console.log('Error fetching contacts:', err)
            }
        }

        fetchContacts()
    }, [isMenuOpen])

    if (!isMenuOpen) return null

    return (
        <>
            <div
                className="fixed inset-0 bg-white/30 backdrop-blur-md z-40"
                onClick={closeMenu}
            ></div>

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-6 p-6 rounded-2xl shadow-lg bg-white w-[88%] h-[60%]"
            >
                <button
                    onClick={closeMenu}
                    className="absolute top-4 right-4 text-3xl font-bold text-[#1E1E1E] hover:text-[#AE7461] transition-colors"
                >
                    <X />
                </button>

                <div className="w-full flex flex-col items-start gap-4">
                    <p onClick={() => scrollTo(refs.aboutRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">
                        {isHU ? "Rólunk" : "About Us"}
                    </p>
                    <p onClick={() => scrollTo(refs.unitsRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">
                        {isHU ? "Apartmanjaink" : "Our Units"}
                    </p>
                    <p onClick={() => scrollTo(refs.facilitiesRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">
                        {isHU ? "Helyszíni szolgáltatások" : "On-Site Facilities"}
                    </p>
                    <p onClick={() => scrollTo(refs.locationRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">
                        {isHU ? "Helyszín" : "Location"}
                    </p>
                    <div className="w-full flex flex-col gap-2">
                        <a
                            className="relative flex gap-2 items-center mt-4 group cursor-pointer w-fit select-none"
                            href={`tel:${contacts.phone}`}
                        >
                            <Phone size={20} strokeWidth={2.5} className="group-hover:scale-110 transition duration-300" />
                            <p className="font-semibold text-[14px] md:text-[16px]">{contacts.phone}</p>
                        </a>
                        <a
                            className="relative flex gap-2 items-center mt-2 group cursor-pointer w-fit select-none"
                            href={`mailto:${contacts.email}`}
                        >
                            <MailIcon size={20} strokeWidth={2.5} className="group-hover:scale-110 transition duration-300" />
                            <p className="font-semibold text-[14px] md:text-[16px]">{contacts.email}</p>
                        </a>
                        <div
                            className="relative flex gap-2 items-center mt-2 group cursor-pointer w-fit select-none"
                        >
                            <MapPin size={20} strokeWidth={2.5} className="group-hover:scale-110 transition duration-300" />
                            <p className="font-semibold text-[14px] md:text-[16px]">{contacts.adress[isHU ? 'hu' : 'en']}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
