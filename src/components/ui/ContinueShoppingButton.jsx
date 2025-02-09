import React from 'react';
import PropTypes from 'prop-types';

const ContinueShoppingButton = ({ onClick, href, children }) => {
    return (
        <div className="self-start mt-4">
            <a
                href={href}
                onClick={onClick}
                className="inline-flex items-center border border-gray-300 text-gray-700 hover:bg-[#DFBF00] px-6 py-3 rounded-full transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {children || "Continue Shopping"}
            </a>
        </div>
    );
};

ContinueShoppingButton.propTypes = {
    onClick: PropTypes.func,
    href: PropTypes.string,
    children: PropTypes.node,
};

ContinueShoppingButton.defaultProps = {
    href: "#",
};

export default ContinueShoppingButton;
