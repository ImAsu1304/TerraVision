const TopBar = ({regionStatus}) => {
    return (
        <div className="h-12 flex
        items-center justify-between px-4 border-b border-gray-800">
            <h1 className="font-semibold tracking-wide">TerraVision</h1>
            <span className="text-sm text-gray-400"> {regionStatus} </span>
        </div>
    );
};

export default TopBar;