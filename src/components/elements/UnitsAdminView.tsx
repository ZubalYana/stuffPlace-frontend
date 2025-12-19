import { useState } from "react";
import { UnitDetailsDialog } from "./UnitDetailsDialog";
import { Heart } from "lucide-react";
export const UnitsAdminView = ({
    units,
    setUnits,
}: {
    units: any[];
    setUnits: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
    const [selectedUnit, setSelectedUnit] = useState<any | null>(null);

    const toggleHighlight = async (
        e: React.MouseEvent,
        unitId: string
    ) => {
        e.stopPropagation();

        const res = await fetch(
            `http://localhost:5000/units/${unitId}/highlight`,
            { method: "PATCH" }
        );

        const updated = await res.json();

        setUnits(prev =>
            prev.map(u => (u._id === updated._id ? updated : u))
        );
    };


    return (
        <div className="w-full h-full flex flex-col">
            <h3 className="font-bold text-[24px] mb-3">Units View</h3>

            <div className="w-full h-full overflow-y-auto custom-scroll">

                {units.length === 0 ? <p>You don't have any units so far</p> : ''}
                {units.map((unit: any) => (
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
                                    Occupancy:{" "}
                                    <span className="font-semibold">
                                        {unit.occupancy}
                                    </span>
                                </p>
                                <p className="font-light text-[14px]">
                                    Type:{" "}
                                    <span className="font-semibold">
                                        {unit.type.en}
                                    </span>
                                </p>
                                <p className="font-light text-[14px]">
                                    Comfort Level:{" "}
                                    <span className="font-semibold">
                                        {unit.comfortLevel.en}
                                    </span>
                                </p>
                            </div>

                            <div className="w-[380px]">
                                <p className="font-light text-[14px]">
                                    {unit.description.en.slice(0, 170)}…
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
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
