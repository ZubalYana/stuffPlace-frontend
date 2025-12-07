import { Phone, MailIcon } from "lucide-react";
export function Footer() {
    return (
        <div className="w-full h-[48vh] relative">
            <div className="p-4 lg:p-10 relative z-20 text-[#F5F5F5] w-full flex">
                <div className="md:w-[40%] md:h-full">
                    <h3 className="uppercase text-[32px] font-bold">StuffPlace</h3>
                    <p className="text-[12px] xs:text-[13px] md:text-[16px] font-light">Contemporary accommodation for individual residents and corporate teams in the heart of Budapest.</p>
                    <div className="flex gap-2 items-center mt-4">
                        <div>
                            <Phone size={20} strokeWidth={2.5} />
                        </div>
                        <p className="font-semibold">+36 30 742 8619</p>
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <div>
                            <MailIcon size={20} strokeWidth={2.5} />
                        </div>
                        <p className="font-semibold">staffPlace_official@gmail.com</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="w-4 h-6 flex justify-center items-center cursor-pointer">
                            <img src="./socials/facebook.svg" alt="facebook" className="w-auto h-full" />
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center cursor-pointer">
                            <img src="./socials/instagram.svg" alt="instagram" className="w-auto h-full" />
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center cursor-pointer">
                            <img src="./socials/telegram.svg" alt="telegram" className="w-auto h-full" />
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center cursor-pointer">
                            <img src="./socials/viber.svg" alt="viber" className="w-auto h-full" />
                        </div>
                    </div>
                </div>
                <div className="md:w-[60%] md:h-full md:flex md:justify-end md:items-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.3767058046706!2d19.083405775881904!3d47.540996592506204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dbb972d42c51%3A0x5b231660d387055c!2zQnVkYXBlc3QsIELDqWtlIHUuLCDQo9Cz0L7RgNGJ0LjQvdCw!5e0!3m2!1suk!2sua!4v1765110250576!5m2!1suk!2sua"
                        width={600}
                        height={240}
                        style={{ border: 0 }}
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
        </div>
    );
}