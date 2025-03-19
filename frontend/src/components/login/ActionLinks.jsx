import { FaUserPlus, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ActionLinks = () => {
    return (
        <div className="flex flex-col space-y-4 mt-8">
            <Link
                to="/register"
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] border-2 border-[#C1A811] hover:border-[#DFBF00] rounded-xl text-[#2A2A2A] font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
                <FaUserPlus className="text-[#2A2A2A]" />
                <span>Register New Account</span>
            </Link>

            <Link
                to="/"
                className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#2A2A2A] hover:bg-[#000000] border border-[#818181] hover:border-[#2A2A2A] rounded-xl text-[#FFFFFF] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
                <FaHome className="text-[#FFDF00]" />
                <span>Return to Home Page</span>
            </Link>
        </div>
    );
};

export default ActionLinks;
