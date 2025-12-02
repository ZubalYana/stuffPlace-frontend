import { Header } from "../elements/Header"
export function MainPage() {
    return (
        <div className="w-full h-screen p-10">
            <div className="z-20 relative">
                <Header />
            </div>
            <div>
                <img src="/main page bg.webp" alt="main page background" className="w-full max-h-screen absolute top-0 left-0 z-0" />
            </div>
        </div>
    )
}