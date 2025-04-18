import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivationInstructionsHub from './ActivationInstructionsHub';
import { COLORS } from './constants';

const ProductsSection = ({ products }) => {
  const [accordionOpen, setAccordionOpen] = useState({});
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const toggleAccordion = (id) => {
    setAccordionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (keys) => {
    navigator.clipboard.writeText(keys.join(" "));
    // Add a nice toast notification instead of alert
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium shadow-lg';
    toast.textContent = 'Key(s) copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  const openActivationGuide = (product) => {
    setCurrentProduct(product);
    setActivationModalOpen(true);
  };

  return (
    <>
      <div className="rounded-2xl shadow-lg overflow-hidden" style={{ background: COLORS.offWhite, border: `1px solid ${COLORS.lightGray}` }}>
        <h2 className="text-2xl font-bold p-8 border-b" style={{ borderColor: COLORS.lightGray, color: COLORS.darkGray }}>Order Details</h2>
        <div>
          {products.map((product) => (
            <div key={product.id} className="p-8 transition-colors hover:bg-gray-50" style={{ borderBottom: `1px solid ${COLORS.lightGray}` }}>
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div 
                  className="w-40 h-40 rounded-xl border flex-shrink-0 overflow-hidden"
                  style={{ borderColor: COLORS.lightGray, backgroundColor: COLORS.offWhite }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.black }}>{product.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4" style={{ color: COLORS.mediumGray }}>
                    <div className="space-y-1">
                      <p><span className="font-medium" style={{ color: COLORS.black }}>Unit Price:</span> {product.price} JD</p>
                      <p><span className="font-medium" style={{ color: COLORS.black }}>Quantity:</span> {product.amount}</p>
                    </div>
                    <div className="space-y-1">
                      <p><span className="font-medium" style={{ color: COLORS.black }}>Total:</span> {product.total} JD</p>
                      {product.assetCode && (
                        <p><span className="font-medium" style={{ color: COLORS.black }}>Asset Code:</span> {product.assetCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      onClick={() => toggleAccordion(product.id)}
                      className="flex items-center font-medium transition-colors"
                      style={{ color: COLORS.gold }}
                      whileHover={{ color: COLORS.darkGold }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {accordionOpen[product.id] ? 'Hide' : 'Show'} Product Keys
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${accordionOpen[product.id] ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>

                    <AnimatePresence>
                      {accordionOpen[product.id] && (
                        <motion.div 
                          className="p-4 rounded-lg space-y-3"
                          style={{ backgroundColor: COLORS.lightGray }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {product.keys.map((key, index) => (
                            <motion.div 
                              key={index} 
                              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <span className="font-mono text-sm" style={{ color: COLORS.darkGray }}>{key}</span>
                              <motion.button
                                onClick={() => copyKey([key])}
                                className="text-sm font-medium px-2 py-1 rounded transition-colors"
                                style={{ color: COLORS.mediumGray }}
                                whileHover={{ color: COLORS.gold, backgroundColor: 'rgba(0,0,0,0.05)' }}
                                whileTap={{ scale: 0.95 }}
                              >
                                ⎘ Copy
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={() => copyKey(product.keys)}
                        className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
                        style={{ backgroundColor: COLORS.lightGray, color: COLORS.darkGray }}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        ⎘ Copy All Keys
                      </motion.button>
                      <motion.button
                        onClick={() => openActivationGuide(product)}
                        className="text-sm px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all"
                        style={{ 
                          background: COLORS.goldGradient, 
                          color: COLORS.black
                        }}
                        whileHover={{ scale: 1.03, boxShadow: COLORS.glowGold }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Activation Guide
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activation Instructions Modal */}
      <ActivationInstructionsHub 
        isOpen={activationModalOpen} 
        onClose={() => setActivationModalOpen(false)}
        productTitle={currentProduct?.title}
      />

      <style jsx global>{`
        @keyframes checkmarkDraw {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${COLORS.lightGray};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${COLORS.mediumGray};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${COLORS.darkGray};
        }
      `}</style>
    </>
  );
};

export default ProductsSection;