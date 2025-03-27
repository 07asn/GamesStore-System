import React, { useState } from 'react';

const COLORS = {
  gold: '#DFBF00',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
  black: '#000000',
  lightGray: '#DBDBDB',
  mediumGray: '#636362',
  darkGray: '#2A2A2A',
  offWhite: '#F6F6F6',
  glowGold: '0 0 15px rgba(223, 191, 0, 0.5)'
};

const ProductsSection = ({ products }) => {
  const [accordionOpen, setAccordionOpen] = useState({});

  const toggleAccordion = (id) => {
    setAccordionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (keys) => {
    navigator.clipboard.writeText(keys.join(" "));
    alert("Key(s) copied to clipboard!");
  };

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden" style={{ background: COLORS.offWhite, border: `1px solid ${COLORS.lightGray}` }}>
      <h2 className="text-2xl font-bold p-8 border-b" style={{ borderColor: COLORS.lightGray, color: COLORS.darkGray }}>Order Details</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} className="p-6 transition-colors" style={{ borderBottom: `1px solid ${COLORS.lightGray}` }}>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain rounded-xl border"
                style={{ borderColor: COLORS.lightGray, backgroundColor: COLORS.offWhite }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.black }}>{product.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: COLORS.mediumGray }}>
                  <div>
                    <p><span className="font-medium" style={{ color: COLORS.black }}>Unit Price:</span> {product.price} JD</p>
                    <p><span className="font-medium" style={{ color: COLORS.black }}>Quantity:</span> {product.amount}</p>
                  </div>
                  <div>
                    <p><span className="font-medium" style={{ color: COLORS.black }}>Total:</span> {product.total} JD</p>
                    {product.assetCode && (
                      <p><span className="font-medium" style={{ color: COLORS.black }}>Asset Code:</span> {product.assetCode}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => toggleAccordion(product.id)}
                    className="flex items-center font-medium transition-colors"
                    style={{ color: COLORS.gold }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.darkGold}
                    onMouseLeave={(e) => e.target.style.color = COLORS.gold}
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
                  </button>

                  {accordionOpen[product.id] && (
                    <div className="p-4 rounded-lg space-y-2 animate-slide-down" style={{ backgroundColor: COLORS.lightGray }}>
                      {product.keys.map((key, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded">
                          <span className="font-mono text-sm" style={{ color: COLORS.darkGray }}>{key}</span>
                          <button
                            onClick={() => copyKey([key])}
                            className="text-sm font-medium transition-colors"
                            style={{ color: COLORS.mediumGray }}
                            onMouseEnter={(e) => e.target.style.color = COLORS.gold}
                            onMouseLeave={(e) => e.target.style.color = COLORS.mediumGray}
                          >
                            ⎘ Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => copyKey(product.keys)}
                      className="text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{ backgroundColor: COLORS.lightGray, color: COLORS.darkGray }}
                    >
                      ⎘ Copy All Keys
                    </button>
                    <button
                      className="text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{ background: COLORS.goldGradient, color: COLORS.black, boxShadow: COLORS.glowGold }}
                    >
                      Activation Guide
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;