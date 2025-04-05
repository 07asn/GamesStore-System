import React from 'react';
import { ScrollText, Gavel, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
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
                            <ScrollText size={48} style={{ color: colors.royalGold }} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: colors.richBlack, fontFamily: "'Cinzel', serif" }}>
                        Terms of Service
                    </h1>
                    <p className="text-lg" style={{ color: colors.charcoal }}>
                        Effective date: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <Gavel size={20} /> Agreement to Terms
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.royalGold }}>User Responsibilities</h2>
                        <ul className="space-y-3 pl-5">
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>You must be at least 18 years old or have parental consent</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>You are responsible for maintaining the confidentiality of your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span style={{ color: colors.royalGold }}>•</span>
                                <span style={{ color: colors.charcoal }}>You agree not to use the service for any illegal or unauthorized purpose</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <AlertTriangle size={20} /> Limitations
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            Our service is provided "as is" without warranties of any kind. We shall not be liable for any damages resulting from use of our services.
                        </p>
                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                            <p style={{ color: colors.charcoal }}>
                                <strong style={{ color: colors.royalGold }}>Note:</strong> We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;