import { useState, useEffect } from "react";
import { Phone, MailIcon } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function Footer() {
    const [copied, setCopied] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [footerSubtext, setFooterSubtext] = useState('');
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

    const fetchText = async () => {
        try {
            const res = await fetch('http://localhost:5000/text')
            if (!res.ok) throw new Error("Failed to fetch text");
            const data = await res.json();

            setFooterSubtext(data.footerSubtext.en);
        } catch (err) {
            console.log('Error fetching text:', err)
        }
    }

    useEffect(() => {
        fetchText();
    }, []);

    return (
        <div className="w-full min-h-[48vh] relative mt-8">
            <div className="p-4 lg:p-10 relative z-20 text-[#F5F5F5] w-full flex flex-col md:flex-row md:justify-between">
                <div className="md:w-[40%] md:h-full">
                    <h3 className="uppercase text-[24px] md:text-[28px] lg:text-[32px] font-bold">StuffPlace</h3>
                    <p className="text-[12px] xs:text-[13px] md:text-[14px] lg:text-[16px] font-light">{footerSubtext}</p>
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
                    <div className="flex gap-4 mt-6">
                        <a
                            href="https://facebook.com/stuffPlace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-4 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                        >
                            <img src="./socials/facebook.svg" alt="facebook" className="w-auto h-full" />
                        </a>
                        <a
                            href="https://instagram.com/stuffPlace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                        >
                            <img src="./socials/instagram.svg" alt="instagram" className="w-auto h-full" />
                        </a>
                        <a
                            href="https://t.me/stuffPlace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                        >
                            <img src="./socials/telegram.svg" alt="telegram" className="w-auto h-full" />
                        </a>
                        <a
                            href="viber://chat?number=%36307428619"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                        >
                            <img src="./socials/viber.svg" alt="viber" className="w-auto h-full" />
                        </a>
                    </div>

                </div>
                <div className="md:w-[50%] md:h-full md:flex md:justify-end md:items-center mt-8 md:mt-0">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.3767058046706!2d19.083405775881904!3d47.540996592506204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dbb972d42c51%3A0x5b231660d387055c!2zQnVkYXBlc3QsIELDqWtlIHUuLCDQo9Cz0L7RgNGJ0LjQvdCw!5e0!3m2!1suk!2sua!4v1765110250576!5m2!1suk!2sua"
                        width={'100%'}
                        height={240}
                        style={{ border: 0, borderRadius: '10px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

            </div>

            <div className="absolute z-10 bg-[#AE7461] opacity-95 w-full h-full top-0 left-0"></div>
            <div className="absolute w-full h-full top-0 left-0 z-0">
                <img src="./footer-bg.webp" alt="footer-background" className="w-full h-full object-cover object-center" />
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

        </div>
    );
}