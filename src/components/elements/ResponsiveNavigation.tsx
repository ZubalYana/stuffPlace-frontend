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

export function ResponsiveNavigation({ refs, closeMenu, isMenuOpen }: ResponsiveNavigationProps) {
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({ top: y, behavior: "smooth" })
        closeMenu()
    }

    if (!isMenuOpen) return null

    return (
        <div className="fixed inset-10 bg-white/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center gap-6 p-6 rounded-2xl shadow-lg">
            <button onClick={closeMenu} className="absolute top-4 right-4 text-2xl font-bold">&times;</button>
            <p onClick={() => scrollTo(refs.aboutRef)} className="cursor-pointer text-xl hover:text-[#AE7461]">About Us</p>
            <p onClick={() => scrollTo(refs.unitsRef)} className="cursor-pointer text-xl hover:text-[#AE7461]">Our Units</p>
            <p onClick={() => scrollTo(refs.facilitiesRef)} className="cursor-pointer text-xl hover:text-[#AE7461]">On-Site Facilities</p>
            <p onClick={() => scrollTo(refs.locationRef)} className="cursor-pointer text-xl hover:text-[#AE7461]">Location</p>
        </div>
    )
}