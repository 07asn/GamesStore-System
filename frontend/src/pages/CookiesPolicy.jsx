import React from 'react';
import { Cookie, Settings, ShieldCheck } from 'lucide-react';

const CookiesPolicy = () => {
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
                            <Cookie size={48} style={{ color: colors.royalGold }} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4" style={{ color: colors.richBlack, fontFamily: "'Cinzel', serif" }}>
                        Cookies Policy
                    </h1>
                    <p className="text-lg" style={{ color: colors.charcoal }}>
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <Settings size={20} /> What Are Cookies
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            Cookies are small text files stored on your device when you visit websites. They help the site remember information about your visit.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.royalGold }}>How We Use Cookies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Essential</h3>
                                <p style={{ color: colors.charcoal }}>Necessary for site functionality and security</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Preferences</h3>
                                <p style={{ color: colors.charcoal }}>Remember your settings and preferences</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Analytics</h3>
                                <p style={{ color: colors.charcoal }}>Help us improve our services</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: `1px solid ${colors.royalGold}20` }}>
                                <h3 className="font-medium mb-2" style={{ color: colors.royalGold }}>Marketing</h3>
                                <p style={{ color: colors.charcoal }}>Deliver relevant advertisements</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm" style={{ border: `1px solid ${colors.royalGold}30` }}>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.royalGold }}>
                            <ShieldCheck size={20} /> Managing Cookies
                        </h2>
                        <p className="mb-4" style={{ color: colors.charcoal }}>
                            You can control and/or delete cookies through your browser settings. However, disabling essential cookies may affect site functionality.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{
                                background: colors.goldGradient,
                                color: colors.richBlack,
                                border: `1px solid ${colors.darkGold}`
                            }}>
                                Accept All
                            </button>
                            <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{
                                background: 'transparent',
                                color: colors.charcoal,
                                border: `1px solid ${colors.charcoal}`
                            }}>
                                Configure
                            </button>
                            <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{
                                background: 'transparent',
                                color: colors.charcoal,
                                border: `1px solid ${colors.charcoal}`
                            }}>
                                Reject Non-Essential
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicy;