import logo from "../assets/Logo.png"

const GlobalLoader = () => {
    return (
        <div className="h-screen w-screen flex flex-col gap-9 items-center justify-center bg-gray-950 text-stone-300">
            <img src={logo} alt="TerraVision" className="w-32 animate-pulse"/>
            {/* <p>Loading . . .</p> */}
        </div>
    )
}

export default GlobalLoader;