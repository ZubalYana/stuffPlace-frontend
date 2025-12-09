import { useState } from "react"
import { X, Phone, MailIcon } from "lucide-react"
import { LanguageSwitcher } from "./LanguageSwitcher"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
    const [copied, setCopied] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCopy = (text: string, type: "phone" | "email") => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setSnackbarOpen(true);

        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleClose = () => {
        setSnackbarOpen(false);
        setCopied(null);
    };
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
                    <p onClick={() => scrollTo(refs.aboutRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">About Us</p>
                    <p onClick={() => scrollTo(refs.unitsRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">Our Units</p>
                    <p onClick={() => scrollTo(refs.facilitiesRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">On-Site Facilities</p>
                    <p onClick={() => scrollTo(refs.locationRef)} className="cursor-pointer text-[#1E1E1E] text-[16px] font-semibold">Location</p>

                    <LanguageSwitcher />

                    <div className="w-full flex flex-col gap-2">
                        <div
                            onClick={() => handleCopy("+36 30 742 8619", "phone")}
                            className="relative flex gap-2 items-center mt-4 group cursor-pointer w-fit select-none"
                        >
                            <Phone size={20} strokeWidth={2.5} className="group-hover:scale-110 transition duration-300" />
                            <p className="font-semibold text-[14px] md:text-[16px]">+36 30 742 8619</p>
                        </div>
                        <div
                            onClick={() => handleCopy("staffPlace_official@gmail.com", "email")}
                            className="relative flex gap-2 items-center mt-2 group cursor-pointer w-fit select-none"
                        >
                            <MailIcon size={20} strokeWidth={2.5} className="group-hover:scale-110 transition duration-300" />
                            <p className="font-semibold text-[14px] md:text-[16px]">staffPlace_official@gmail.com</p>
                        </div>
                    </div>
                </div>


            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity="success"
                    elevation={6}
                    variant="filled"
                    sx={{
                        backgroundColor: "rgba(110, 196, 114, 0.7)",
                        color: "rgba(0, 0, 0, 0.8)",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    {copied === "phone" && "Phone number copied!"}
                    {copied === "email" && "Email copied!"}
                </MuiAlert>
            </Snackbar>
        </>
    )
}
