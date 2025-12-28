import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { UnitCard } from "../elements/UnitCard";
import { useNavigate } from "react-router-dom";

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
    description: {
        en: string;
        hu: string;
    };
    images: string[];
    occupancy: number;
    type: {
        en: string;
        hu: string;
    };
    comfortLevel: {
        en: string;
        hu: string;
    };
    highlighted: boolean;
};

export function UnitsCatalogue({ unitsRef }: UnitsCatalogueProps) {
    const navigate = useNavigate();
    const [capacity, setCapacity] = useState<number | "">("");
    const [type, setType] = useState<string>("");
    const [comfort, setComfort] = useState<string>("");

    const [units, setUnits] = useState<Unit[]>([]);

    const handleBack = () => {
        navigate("/");
        setTimeout(() => {
            unitsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const fetchUnits = async () => {
        try {
            const res = await fetch(`http://localhost:5000/units`);
            if (!res.ok) throw new Error('Failed to fetch units');
            const data = await res.json();
            setUnits(data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchUnits();
    }, []);


    const sortedUnits = useMemo(() => {
        const filtered = units.filter((unit) => {
            if (capacity && unit.occupancy < capacity) return false;
            if (type && unit.type.en !== type) return false;
            if (comfort && unit.comfortLevel.en !== comfort) return false;
            return true;
        });

        return filtered.sort((a, b) => {
            if (b.highlighted !== a.highlighted) return Number(b.highlighted) - Number(a.highlighted);
            return a.occupancy - b.occupancy;
        });

    }, [units, capacity, type, comfort]);


    return (
        <div className="w-full h-screen p-4 lg:p-10 flex flex-col items-center relative">
            <h2 className="text-[24px] md:text-[32px] lg:text-[42px] font-bold">
                {localStorage.getItem('language') === 'en' ? 'Units Catalogue' : 'Lakáskatalógus'}
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
                        <InputLabel shrink>
                            {localStorage.getItem('language') === 'en' ? 'Capacity' : 'Kapacitás'}
                        </InputLabel>
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
                            <MenuItem value="">
                                {localStorage.getItem('language') === 'en' ? 'Any' : 'Bármely'}
                            </MenuItem>
                            {[1, 2, 4, 6, 8].map((n) => (
                                <MenuItem key={n} value={n}>
                                    {n}+ {localStorage.getItem('language') === 'en' ? 'people' : 'fős'}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small">
                        <InputLabel shrink>
                            {localStorage.getItem('language') === 'en' ? 'Type' : 'Típus'}
                        </InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="">
                                {localStorage.getItem('language') === 'en' ? 'Any' : 'Bármely'}
                            </MenuItem>
                            <MenuItem value="Single">{localStorage.getItem('language') === 'en' ? 'Single' : '1 fős'}</MenuItem>
                            <MenuItem value="2-Person">{localStorage.getItem('language') === 'en' ? '2-Person' : '2 fős'}</MenuItem>
                            <MenuItem value="3-Person">{localStorage.getItem('language') === 'en' ? '3-Person' : '3 fős'}</MenuItem>
                            <MenuItem value="4-Person">{localStorage.getItem('language') === 'en' ? '4-Person' : '4 fős'}</MenuItem>
                            <MenuItem value="6-Person">{localStorage.getItem('language') === 'en' ? '6-Person' : '6 fős'}</MenuItem>
                            <MenuItem value="8-Person">{localStorage.getItem('language') === 'en' ? '8-Person' : '8 fős'}</MenuItem>
                            <MenuItem value="Suite">{localStorage.getItem('language') === 'en' ? 'Suite' : 'Lakosztály'}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small">
                        <InputLabel shrink>
                            {localStorage.getItem('language') === 'en' ? 'Comfort' : 'Komfort'}
                        </InputLabel>

                        <Select
                            value={comfort}
                            onChange={(e) => setComfort(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">
                                {localStorage.getItem('language') === 'en' ? 'Any' : 'Bármely'}
                            </MenuItem>

                            <MenuItem value="Economy">
                                {localStorage.getItem('language') === 'en' ? 'Economy' : 'Gazdaságos'}
                            </MenuItem>
                            <MenuItem value="Standard">
                                {localStorage.getItem('language') === 'en' ? 'Standard' : 'Standard'}
                            </MenuItem>
                            <MenuItem value="Comfort">
                                {localStorage.getItem('language') === 'en' ? 'Comfort' : 'Komfort'}
                            </MenuItem>
                            <MenuItem value="Luxury">
                                {localStorage.getItem('language') === 'en' ? 'Luxury' : 'Luxus'}
                            </MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
            </Box>

            <div className="w-full flex flex-wrap justify-between gap-y-8 mt-8 pb-10">
                {sortedUnits.length > 0 ? (
                    sortedUnits.map((unit, index) => (
                        <UnitCard
                            key={index}
                            images={unit.images}
                            description={
                                localStorage.getItem('language') === 'en' ?
                                    unit.description.en :
                                    unit.description.hu
                            }
                            occupancy={unit.occupancy}
                            type={
                                localStorage.getItem('language') === 'en' ?
                                    unit.type.en :
                                    unit.type.hu
                            }
                            comfortLevel={
                                localStorage.getItem('language') === 'en' ?
                                    unit.comfortLevel.en :
                                    unit.comfortLevel.hu
                            }
                        />
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
                        <p className="text-lg md:text-xl font-medium">
                            No rooms match your current filters.
                        </p>
                        <p className="mt-2 text-sm md:text-base">
                            Try adjusting the capacity, type, or comfort options.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}
