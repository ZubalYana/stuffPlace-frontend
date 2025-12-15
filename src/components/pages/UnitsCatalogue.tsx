import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { UnitCard } from "../elements/UnitCard";
import { useNavigate } from "react-router-dom";
import type { SelectChangeEvent } from "@mui/material";

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";

interface UnitsCatalogueProps {
    unitsRef: React.RefObject<HTMLDivElement | null>;
}

type Unit = {
    img: string;
    description: string;
    occupancy: number;
    type: string;
    comfortLevel: string;
};

export function UnitsCatalogue({ unitsRef }: UnitsCatalogueProps) {
    const navigate = useNavigate();

    const [capacity, setCapacity] = useState<number | "">("");
    const [type, setType] = useState<string>("");
    const [comfort, setComfort] = useState<string>("");

    const handleBack = () => {
        navigate("/");
        setTimeout(() => {
            unitsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const placeholderUnits = [
        {
            img: './placeholder_unit1.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 2,
            type: 'Group Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit2.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 6,
            type: 'Group Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit3.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 2,
            type: 'Suite',
            comfortLevel: 'Comfort'
        },
        {
            img: './placeholder_unit4.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 4,
            type: 'Group Room',
            comfortLevel: 'Normal'
        },
        {
            img: './placeholder_unit5.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 1,
            type: 'Single Room',
            comfortLevel: 'Superior'
        },
        {
            img: './placeholder_unit6.webp',
            description: 'A clean, modern room filled with natural light from its sunny-side location. It offers two well-built bunk beds, a small but functional furnished kitchenette, and a neat private bathroom with all essentials. A simple, comfortable space tailored for easy living.',
            occupancy: 8,
            type: 'Group Room',
            comfortLevel: 'High'
        },
    ]


    const sortedUnits = useMemo(() => {
        const matches = (unit: Unit) => {
            if (capacity && unit.occupancy < capacity) return false;
            if (type && unit.type !== type) return false;
            if (comfort && unit.comfortLevel !== comfort) return false;
            return true;
        };

        return [...placeholderUnits].sort((a, b) => {
            const aMatch = matches(a);
            const bMatch = matches(b);
            return Number(bMatch) - Number(aMatch);
        });
    }, [capacity, type, comfort]);

    return (
        <div className="w-full h-screen p-4 lg:p-10 flex flex-col items-center relative">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] font-bold">
                Units Catalogue
            </h2>

            <div
                className="w-10 h-10 absolute top-4 left-4 lg:top-10 lg:left-10 bg-white rounded-full shadow-xl flex justify-center items-center cursor-pointer"
                onClick={handleBack}
            >
                <ArrowLeft />
            </div>

            <Box className="w-full mt-6 flex justify-end">
                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <FormControl variant="standard" size="small">
                        <InputLabel shrink>Capacity</InputLabel>
                        <Select
                            value={capacity}
                            onChange={(e) =>
                                setCapacity((e.target.value as number) || "")
                            }
                            disableUnderline
                            displayEmpty
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            {[1, 2, 4, 6, 8].map((n) => (
                                <MenuItem key={n} value={n}>
                                    {n}+ people
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small">
                        <InputLabel shrink>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="Group Room">Group Room</MenuItem>
                            <MenuItem value="Suite">Suite</MenuItem>
                            <MenuItem value="Single Room">Single Room</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small">
                        <InputLabel shrink>Comfort</InputLabel>
                        <Select
                            value={comfort}
                            onChange={(e) => setComfort(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Comfort">Comfort</MenuItem>
                            <MenuItem value="Superior">Superior</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>


            {/* Units */}
            <div className="w-full flex flex-wrap justify-between gap-y-8 mt-8 pb-10">
                {sortedUnits.map((unit, index) => (
                    <UnitCard key={index} {...unit} />
                ))}
            </div>
        </div>
    );
}
