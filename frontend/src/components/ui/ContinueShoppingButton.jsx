import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


const ContinueShoppingButton = ({ onClick, href, children }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-400 font-medium transition-colors"
  >
    <ArrowLeft size={18} />
    {children}
  </a>
);

export default ContinueShoppingButton;
