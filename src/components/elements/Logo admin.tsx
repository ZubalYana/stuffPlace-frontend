export function Logo() {
    return (
        <div className="flex items-center relative">
            <img src="/logo icon.svg" alt="logo icon" className="w-[50px] xl:w-[65px]" />
            <p className="text-[16px] font-bold text-[#1E1E1E] absolute left-[25px] top-1.5 xl:left-[33px] xl:top-2.5 xl:text-[18px]">StaffPlace • Admin Panel</p>
        </div>
    )
}