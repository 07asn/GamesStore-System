import { FaGoogle } from 'react-icons/fa';

const GoogleSignInButton = () => {
    return (
        <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-red-400 border border-red-400 hover:border-red-600 rounded-xl text-[#2A2A2A] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
        >
            <FaGoogle className="text-white" />
            <span  className="text-white">Google</span>
        </button>
    );
};

export default GoogleSignInButton;
