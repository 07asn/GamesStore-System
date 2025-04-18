import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, PlatformIcons, PLATFORMS } from './constants';

const ActivationInstructionsHub = ({ isOpen, onClose, productTitle }) => {
    const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0].id);
    const [completedSteps, setCompletedSteps] = useState({});

    const toggleStepCompletion = (stepIndex) => {
        const platformId = selectedPlatform;
        const key = `${platformId}-${stepIndex}`;
        setCompletedSteps(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const currentPlatform = PLATFORMS.find(p => p.id === selectedPlatform);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        className="w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden m-4"
                        style={{ backgroundColor: COLORS.offWhite }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with product title */}
                        <div
                            className="relative p-8 border-b"
                            style={{
                                borderColor: COLORS.brightGold,
                                backgroundImage: COLORS.gold,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '140px'
                            }}
                        >
                            <div className="absolute inset-0 bg-[#FFDF00] opacity-80"></div>
                            <div className="relative z-10 flex justify-between items-start h-full">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">
                                        Activation Guide
                                    </h2>
                                    {productTitle && (
                                        <div className="inline-block py-1 px-4 rounded-lg bg-black bg-opacity-40 backdrop-blur-sm">
                                            <span className="text-xl font-medium text-white">{productTitle}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full transition-all hover:bg-black hover:bg-opacity-40 text-white hover:scale-110"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row">
                            {/* Sidebar */}
                            <div className="md:w-64 border-r" style={{ borderColor: COLORS.lightGray }}>
                                <div className="p-4 border-b" style={{ borderColor: COLORS.lightGray, backgroundColor: COLORS.offWhite }}>
                                    <h3 className="font-medium text-lg" style={{ color: COLORS.darkGray }}>Select Platform</h3>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                    {PLATFORMS.map(platform => (
                                        <motion.button
                                            key={platform.id}
                                            className="w-full text-left p-4 flex items-center transition-all"
                                            style={{
                                                backgroundColor: selectedPlatform === platform.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                                                color: selectedPlatform === platform.id ? platform.color : COLORS.mediumGray,
                                                borderLeft: selectedPlatform === platform.id ? `4px solid ${platform.color}` : '4px solid transparent'
                                            }}
                                            onClick={() => setSelectedPlatform(platform.id)}
                                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="text-xl mr-3" style={{
                                                color: selectedPlatform === platform.id ? platform.color : COLORS.mediumGray
                                            }}>
                                                {platform.icon}
                                            </span>
                                            <span className="font-medium">{platform.name}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="flex-1 p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                                <div className="mb-8 flex items-center">
                                    <motion.div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-md"
                                        style={{
                                            backgroundColor: currentPlatform.color,
                                            color: '#FFFFFF'
                                        }}
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                    >
                                        {currentPlatform.icon}
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold" style={{ color: currentPlatform.color }}>
                                            {currentPlatform.name}
                                        </h3>
                                        <p className="text-sm" style={{ color: COLORS.mediumGray }}>
                                            Follow these steps to activate your product
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 relative">
                                    {/* Vertical timeline line */}
                                    <div
                                        className="absolute left-5 top-0 bottom-0 w-0.5"
                                        style={{ backgroundColor: COLORS.lightGray }}
                                    ></div>

                                    {currentPlatform.steps.map((step, index) => {
                                        const isCompleted = completedSteps[`${selectedPlatform}-${index}`];
                                        return (
                                            <motion.div
                                                key={index}
                                                className="flex items-start pl-12 relative"
                                                onClick={() => toggleStepCompletion(index)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                {/* Step marker */}
                                                <motion.div
                                                    className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer shadow-sm"
                                                    style={{
                                                        backgroundColor: isCompleted ? currentPlatform.color : COLORS.lightGray,
                                                        color: isCompleted ? '#FFFFFF' : COLORS.darkGray,
                                                        zIndex: 1
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {isCompleted ? (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                                style={{
                                                                    strokeDasharray: "40",
                                                                    strokeDashoffset: "0",
                                                                    animation: "checkmarkDraw 0.5s ease-in-out forwards"
                                                                }}
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <span className="font-semibold">{index + 1}</span>
                                                    )}
                                                </motion.div>

                                                {/* Step content */}
                                                <motion.div
                                                    className={`flex-1 p-4 rounded-lg cursor-pointer transition-all ${isCompleted ? 'opacity-80' : 'opacity-100'}`}
                                                    style={{
                                                        backgroundColor: isCompleted ? COLORS.offWhite : index % 2 === 0 ? COLORS.lightGray : COLORS.offWhite,
                                                        borderLeft: `3px solid ${isCompleted ? currentPlatform.color : 'transparent'}`,
                                                        textDecoration: isCompleted ? 'line-through' : 'none'
                                                    }}
                                                    whileHover={{
                                                        boxShadow: isCompleted ? `0 0 0 2px ${currentPlatform.color}40` : '0 0 0 2px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    <p style={{ color: isCompleted ? COLORS.mediumGray : COLORS.darkGray }}>{step}</p>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Tips section */}
                                <motion.div
                                    className="mt-8 p-5 rounded-xl"
                                    style={{ backgroundColor: `${currentPlatform.color}10`, border: `1px solid ${currentPlatform.color}20` }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h4 className="font-semibold flex items-center mb-3 text-lg" style={{ color: currentPlatform.color }}>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Helpful Tips
                                    </h4>
                                    <ul className="space-y-3">
                                        {currentPlatform.tips.map((tip, index) => (
                                            <motion.li
                                                key={index}
                                                className="flex items-start text-sm"
                                                style={{ color: COLORS.darkGray }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + index * 0.05 }}
                                            >
                                                <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0" fill={currentPlatform.color} viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {tip}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Support section */}
                                <motion.div
                                    className="mt-6 flex flex-col sm:flex-row justify-between items-center p-5 rounded-xl"
                                    style={{ backgroundColor: COLORS.offWhite, border: `1px dashed ${COLORS.lightGray}` }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="mb-4 sm:mb-0">
                                        <p className="text-sm mb-1 font-medium" style={{ color: COLORS.darkGray }}>
                                            Need additional help?
                                        </p>
                                        <p className="text-xs" style={{ color: COLORS.mediumGray }}>
                                            Visit the official {currentPlatform.name} support site
                                        </p>
                                    </div>
                                    <motion.button
                                        className="px-5 py-2.5 rounded-lg font-medium transition-all flex items-center"
                                        style={{
                                            background: COLORS.goldGradient,
                                            color: COLORS.black
                                        }}
                                        onClick={() => window.open(currentPlatform.supportUrl, '_blank')}
                                        whileHover={{ scale: 1.03, boxShadow: COLORS.glowGold }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Visit Support
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 flex flex-col sm:flex-row justify-between items-center" style={{ borderColor: COLORS.lightGray }}>
                            <div className="text-xs mb-2 sm:mb-0" style={{ color: COLORS.mediumGray }}>
                                Click on steps to mark them as completed
                            </div>
                            <motion.button
                                className="px-6 py-2 rounded-lg font-medium transition-colors"
                                style={{
                                    background: 'transparent',
                                    color: COLORS.darkGray,
                                    border: `1px solid ${COLORS.lightGray}`
                                }}
                                onClick={onClose}
                                whileHover={{ backgroundColor: COLORS.lightGray }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Close Guide
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ActivationInstructionsHub;