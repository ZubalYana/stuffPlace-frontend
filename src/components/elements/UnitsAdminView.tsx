import { useState } from "react";
import { UnitDetailsDialog } from "./UnitDetailsDialog";

export const UnitsAdminView = ({
    units,
    setUnits,
}: {
    units: any[];
    setUnits: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
    const [selectedUnit, setSelectedUnit] = useState<any | null>(null);

    return (
        <div className="w-full h-full flex flex-col">
            <h3 className="font-bold text-[24px] mb-3">Units View</h3>

            <div className="w-full h-full overflow-y-auto custom-scroll">
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
                        "
                    >
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
