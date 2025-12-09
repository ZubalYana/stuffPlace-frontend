export function WhatsAppIcon() {
    return (
        <a
            href="https://wa.me/36307428619"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-bounce-slow z-9999 relative"
        >
            <div className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] bg-[#F5F5F5] rounded-full cursor-pointer flex justify-center items-center fixed right-4 bottom-4 lg:right-10 lg:bottom-10 z-100 transition-transform duration-300 hover:scale-110 animate-bounce-slow">
                <img src="./socials/whatsApp.svg" alt="whatsApp" width={'60%'} />
            </div>
        </a>
    );
}
