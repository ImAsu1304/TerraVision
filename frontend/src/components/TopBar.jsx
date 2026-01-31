const TopBar = ({regionStatus}) => {
    return (
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-800">
            <h1 className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">TerraVision</h1>
            <span className="text-blue-500 font-extrabold"> {regionStatus} </span>
        </div>
    );
};

export default TopBar;