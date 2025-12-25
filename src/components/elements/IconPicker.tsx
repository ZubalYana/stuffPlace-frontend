import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconNames = ["Building2", "CircleDollarSignIcon", "BedDouble", "BusFront", "Cctv", "ShoppingBasketIcon", "Check", "Star", "ThumbsUp", "Heart", "LampDesk"] as const;
type IconName = (typeof iconNames)[number];

export const IconPicker = ({
    value,
    onChange,
}: {
    value: "" | IconName;
    onChange: (icon: "" | IconName) => void;
}) => {
    return (
        <div className="flex flex-wrap gap-3">
            {iconNames.map((name) => {
                const IconComponent = Icons[name] as LucideIcon;

                return (
                    <div
                        key={name}
                        className={`p-2 border rounded cursor-pointer transition-all duration-300 bg-white ${value === name ? "border-[#AE7461] shadow-lg" : ""
                            }`}
                        onClick={() => onChange(name)}
                    >
                        <IconComponent size={24} color={value === name ? '#AE7461' : '#000'} />
                    </div>
                );
            })}
        </div>
    );
};
