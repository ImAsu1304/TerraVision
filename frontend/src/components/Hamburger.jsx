import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Hamburger = ({ isOpen, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`md:hidden fixed top-16 right-4 z-401 p-2 mr-7 bg-black rounded-full hover:cursor-pointer text-white border-2 ${isOpen ? "hidden" : "block"}`}
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faBars} />
            </div>
        </button>
    );
};

export default Hamburger;