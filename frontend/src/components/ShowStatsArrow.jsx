import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const ShowStatsArrow = ({isOpen, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={` z-400 bg-gray-950 w-[36px] hover:cursor-pointer text-white  ${isOpen ? "hidden" : "block"}`}
        >
            <div>
                <FontAwesomeIcon icon={faAnglesLeft} />
            </div>
        </button>
    );
}

export default ShowStatsArrow;