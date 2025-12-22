import { useState, useMemo } from "react";
import { UnitDetailsDialog } from "./UnitDetailsDialog";
import { Heart } from "lucide-react";
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";


export const UnitsAdminView = ({
    units,
    setUnits,
}: {
    units: any[];
    setUnits: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
    const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
    const [capacity, setCapacity] = useState<number | "">("");
    const [type, setType] = useState<string>("");
    const [comfortLevel, setComfortLevel] = useState<string>("");
    const [highlightedFirst, setHighlightedFirst] = useState<boolean>(false);

    const sortedUnits = useMemo(() => {
        let filtered = units.filter((unit) => {
            if (capacity && unit.occupancy < capacity) return false;
            if (type && unit.type.en !== type) return false;
            if (comfortLevel && unit.comfortLevel.en !== comfortLevel) return false;
            return true;
        });

        filtered.sort((a, b) => {
            if (highlightedFirst && b.highlighted !== a.highlighted)
                return Number(b.highlighted) - Number(a.highlighted);
            return a.occupancy - b.occupancy;
        });

        return filtered;
    }, [units, capacity, type, comfortLevel, highlightedFirst]);

    const toggleHighlight = async (e: React.MouseEvent, unitId: string) => {
        e.stopPropagation();
        const res = await fetch(`http://localhost:5000/units/${unitId}/highlight`, {
            method: "PATCH",
        });
        const updated = await res.json();
        setUnits((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
    };

    const types = Array.from(new Set(units.map((u) => u.type.en)));
    const comfortLevels = Array.from(new Set(units.map((u) => u.comfortLevel.en)));

    return (
        <div className="w-full h-full flex flex-col">

            <h3 className="font-bold text-[24px] mb-3">Units View</h3>

            <Box className="w-full flex justify-end">
                <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
                    <FormControl variant="standard" size="small" sx={{ minWidth: 60 }}>
                        <InputLabel shrink>Occupancy</InputLabel>
                        <Select
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value) || "")}
                            disableUnderline
                            displayEmpty
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            {[1, 2, 3, 4, 6, 8].map((n) => (
                                <MenuItem key={n} value={n}>
                                    {n}+ people
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small" sx={{ minWidth: 50 }}>
                        <InputLabel shrink>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">All</MenuItem>
                            {types.map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" size="small" sx={{ minWidth: 70 }}>
                        <InputLabel shrink>Comfort Level</InputLabel>
                        <Select
                            value={comfortLevel}
                            onChange={(e) => setComfortLevel(e.target.value)}
                            disableUnderline
                            displayEmpty
                            MenuProps={{ disableScrollLock: true }}
                        >
                            <MenuItem value="">All</MenuItem>
                            {comfortLevels.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={highlightedFirst}
                                onChange={(e) => setHighlightedFirst(e.target.checked)}
                                size="small"
                            />
                        }
                        label="Highlighted"
                    />
                </Stack>
            </Box>

            <div className="w-full h-full overflow-y-auto custom-scroll">
                {sortedUnits.length === 0 ? (
                    <p className="text-gray-500 text-center mt-4">
                        No units match the current filters.
                    </p>
                ) : (
                    sortedUnits.map((unit) => (
                        <div
                            key={unit._id}
                            onClick={() => setSelectedUnit(unit)}
                            className="
                            p-4 mb-3
                            bg-white
                            shadow-sm
                            text-[#1E1E1E]
                            rounded-md
                            flex
                            w-[98%]
                            cursor-pointer
                            transition
                            hover:shadow-md
                            hover:bg-[#fafafa]
                            relative
                        "
                        >
                            <Heart
                                onClick={(e) => toggleHighlight(e, unit._id)}
                                className="absolute top-5 left-5 cursor-pointer"
                                size={20}
                                fill={unit.highlighted ? "#E11D48" : "none"}
                                color={unit.highlighted ? "#E11D48" : "#D1D5DB"}
                            />
                            <div>
                                <img
                                    src={unit.images?.length ? unit.images[0] : ""}
                                    alt={unit.description?.en}
                                    className="w-[150px] h-[100px] object-cover rounded-md"
                                />
                            </div>

                            <div className="ml-4">
                                <div className="flex gap-4 mb-2">
                                    <p className="font-light text-[14px]">
                                        Occupancy: <span className="font-semibold">{unit.occupancy}</span>
                                    </p>
                                    <p className="font-light text-[14px]">
                                        Type: <span className="font-semibold">{unit.type.en}</span>
                                    </p>
                                    <p className="font-light text-[14px]">
                                        Comfort Level: <span className="font-semibold">{unit.comfortLevel.en}</span>
                                    </p>
                                </div>

                                <div className="w-[380px]">
                                    <p className="font-light text-[14px]">
                                        {unit.description.en.slice(0, 170)}…
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedUnit && (
                <UnitDetailsDialog
                    unit={selectedUnit}
                    onClose={() => setSelectedUnit(null)}
                    setUnits={setUnits}
                />
            )}
        </div>
    );
};
