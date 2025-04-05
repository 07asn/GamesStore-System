import React from 'react';
import { Shield, Lock, EyeOff } from 'lucide-react';

const PrivacyPolicy = () => {
    // Royal Gold color palette
    const colors = {
        royalGold: '#D4AF37',
        brightGold: '#FFD700',
        darkGold: '#996515',
        parchment: '#F8F4E6',
        richBlack: '#0A0A0A',
        charcoal: '#333333',
        goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #996515 100%)'
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: colors.parchment }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                            <Shield size={48} style={{ color: colors.royalGold }} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: colors.richBlack, fontFamily: "'Cinzel', serif" }}>
                        Privacy Policy
                    </h1>
                    <p className="text-lg" style={{ color: colors.charcoal }}>
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <Lock size={20} /> Information Collection
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            We collect information to provide better services to all our users. This includes information you provide directly, information we collect automatically, and information we obtain from third parties.
                        </p>
                        <ul className="space-y-2 pl-5">
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>Personal information like name, email, and contact details when you register</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>Usage data including how you interact with our services</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>Device information for security and optimization</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <EyeOff size={20} /> Data Protection
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Encryption</h3>
                                <p style={{ color: colors.charcoal }}>All data is encrypted in transit and at rest using industry-standard protocols</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Access Control</h3>
                                <p style={{ color: colors.charcoal }}>Strict access controls limit who can view and process your information</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.royalGold }}>Your Rights</h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            You have rights regarding your personal data, including access, correction, deletion, and the right to object to processing.
                        </p>

                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;