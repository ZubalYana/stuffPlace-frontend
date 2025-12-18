import { useState, useEffect } from "react";
export const UnitsAdminView = ({ units }: { units: any[] }) => {

    return (
        <div className="w-full h-full flex flex-col">
            <h3 className="font-bold text-[24px] mb-3">Units View</h3>
            <div className="w-full h-full overflow-y-auto custom-scroll">
                {units.map((unit: any) => (
                    <div key={unit._id} className="p-4 mb-3 bg-white shadow-sm text-[#1E1E1E] rounded-md flex w-[98%]">
                        <div>
                            <img src={unit.images.length > 0 ? unit.images[0] : ''} alt={unit.description} className="w-[150px] h-[100px] object-cover rounded-md" />
                        </div>
                        <div className="ml-4">
                            <div className="flex gap-4 mb-2">
                                <p className="font-light text-[14px]">Occupancy: <span className="font-semibold">{unit.occupancy}</span></p>
                                <p className="font-light text-[14px]">Type: <span className="font-semibold">{unit.type.en}</span></p>
                                <p className="font-light text-[14px]">Comfort Level: <span className="font-semibold">{unit.comfortLevel.en}</span></p>
                            </div>
                            <div className="w-[380px]">
                                <p className="font-light text-[14px]">{(unit.description.en).slice(0, 170)}...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}