import { useState, useEffect } from "react";
import { Logo } from "../elements/Logo admin";
import { UnitsControlBlock } from "../elements/UnitsControlBlock";
import { TextControlBlock } from "../elements/TextControlBlock";
import { AdvantagesControlBlock } from "../elements/AdvantagesControlBlock";
import { FacilitiesControlBlock } from "../elements/FacilitiesControlBlock";
import { ContactsControlBlock } from "../elements/ContactsControlBlock";
export interface Unit {
    description: {
        en: string;
        hu: string;
    };
    occupancy: number;
    type: {
        en: string;
        hu: string;
    };
    comfortLevel: {
        en: string;
        hu: string;
    };
    images: string[];
}
export const AdminPanel = () => {
    const [units, setUnits] = useState<Unit[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/units")
            .then(res => res.json())
            .then(data => setUnits(data.reverse()));
    }, []);

    return (
        <div className="w-full min-h-screen p-4 lg:p-10 flex flex-col relative mt-6 lg:mt-0">
            <Logo />
            <UnitsControlBlock units={units} setUnits={setUnits} />
            <TextControlBlock />
            <AdvantagesControlBlock />
            <FacilitiesControlBlock />
            <ContactsControlBlock />
        </div>
    )
}