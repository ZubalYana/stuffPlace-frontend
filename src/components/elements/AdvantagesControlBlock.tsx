import {
    TextField,
} from "@mui/material";
import { useState } from "react";
import { IconPicker } from "./IconPicker";
export const AdvantagesControlBlock = () => {
    const [advIcon, setAdvIcon] = useState<"Building2" | "CircleDollarSignIcon" | "BedDouble" | "BusFront" | "Cctv" | "ShoppingBasketIcon" | "Check" | "Star" | "ThumbsUp" | "Heart" | "">("");
    const [advText, setAdvText] = useState('');

    return (
        <div className="w-full text-[#1E1E1E] mt-6 lg:mt-15 space-y-6">
            <h3 className="font-bold text-[24px] mb-3">Advantages Management</h3>
            <div className="w-full flex flex-col lg:flex-row lg:gap-[4%] mt-4">
                <div className="w-full lg:w-[48%]">
                    <IconPicker value={advIcon} onChange={setAdvIcon} />
                    <TextField
                        label={`Advantage Text ( 100 characters max. )`}
                        inputProps={{ maxLength: 100 }}
                        sx={{ marginTop: '20px' }}
                        fullWidth
                        value={advText}
                        onChange={(e) => { setAdvText(e.target.value) }}
                    />
                </div>
                <div className="w-full lg:w-[48%]">

                </div>
            </div>

        </div>
    )
}