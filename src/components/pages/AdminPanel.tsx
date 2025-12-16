import { Logo } from "../elements/Logo admin"
import { UnitsControlBlock } from "../elements/UnitsControlBlock"
export const AdminPanel = () => {
    return (
        <div className="w-full min-h-screen p-4 lg:p-10 flex flex-col relative mt-6 lg:mt-0">
            <Logo />
            <UnitsControlBlock />
        </div>
    )
}