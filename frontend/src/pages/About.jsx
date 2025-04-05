// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sword, Shield, Gamepad2, Trophy, Gem } from 'lucide-react';

const About = () => {
    // Royal Gaming Gold color palette
    const colors = {
        royalGold: '#D4AF37',
        brightGold: '#FFD700',
        darkGold: '#996515',
        parchment: '#F8F4E6',
        richBlack: '#0A0A0A',
        charcoal: '#333333',
        goldGradient: 'linear-gradient(135deg, #D4AF37, #996515)',
        gamingRed: '#D22B2B'
    };

    const features = [
        {
            icon: <Gamepad2 size={32} />,
            title: "Premium Selection",
            description: "Curated collection of the finest gaming gear and titles."
        },
        {
            icon: <Gem size={32} />,
            title: "Exclusive Editions",
            description: "Rare collector's items and limited editions."
        },
        {
            icon: <Shield size={32} />,
            title: "Secure Shopping",
            description: "100% safe transactions with royal-grade protection."
        },
        {
            icon: <Trophy size={32} />,
            title: "VIP Rewards",
            description: "Earn crowns with every purchase for exclusive perks."
        }
    ];

    const team = [
        {
            name: "Reginald von Gamestein",
            role: "Founder & CEO",
            bio: "Former esports champion turned gaming entrepreneur.",
            avatar: "/img/team/reginald.jpg"
        },
        {
            name: "Lady Isabella Pixelsworth",
            role: "Creative Director",
            bio: "Gaming aesthetics visionary with 15 years of experience.",
            avatar: "/img/team/isabella.jpg"
        },
        {
            name: "Sir Geoffrey Controller",
            role: "Tech Master",
            bio: "Hardware wizard and performance optimization guru.",
            avatar: "/img/team/geoffrey.jpg"
        }
    ];

    return (
        <div className="min-h-screen w-full" style={{ background: colors.parchment }}>
            {/* Hero Section */}
            <div
                className="relative py-20 px-4 text-center bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/img/gaming-banner.jpg')`,
                    backgroundBlendMode: 'multiply'
                }}
            >
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Crown size={24} style={{ color: colors.royalGold }} />
                    <span className="text-sm font-medium tracking-wider" style={{ color: colors.royalGold }}>
                        ROYAL GAMING EST. 2020
                    </span>
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1
                        className="text-5xl md:text-6xl font-bold mb-6"
                        style={{
                            color: colors.parchment,
                            fontFamily: "'Cinzel', serif",
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        The Royal Standard in Gaming
                    </h1>
                    <p
                        className="text-xl mb-8 max-w-2xl mx-auto"
                        style={{ color: colors.brightGold }}
                    >
                        Where every gamer is treated like royalty. Premium gear, exclusive titles, and unparalleled service.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/shop"
                            className="px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                            style={{
                                background: colors.goldGradient,
                                color: colors.richBlack,
                                border: `1px solid ${colors.darkGold}`,
                                fontFamily: "'Cinzel', serif"
                            }}
                        >
                            <Sword size={20} /> Explore Our Collection
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 rounded-lg font-medium transition-all duration-200"
                            style={{
                                background: 'transparent',
                                color: colors.parchment,
                                border: `1px solid ${colors.royalGold}`,
                                fontFamily: "'Cinzel', serif"
                            }}
                        >
                            Join Our Guild
                        </Link>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="py-16 px-4 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <div
                            className="rounded-xl overflow-hidden shadow-xl"
                            style={{ border: `4px solid ${colors.royalGold}` }}
                        >
                            <img
                                src="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/mirage-games-desktop-wallpaper-template-9reykia126f192.webp"
                                alt="Royal Gaming Store"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-px" style={{ background: colors.royalGold }}></div>
                            <span className="text-sm font-medium tracking-wider" style={{ color: colors.royalGold }}>
                                OUR LEGACY
                            </span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-6"
                            style={{
                                color: colors.richBlack,
                                fontFamily: "'Cinzel', serif"
                            }}
                        >
                            Forged in Gameplay, Crowned in Excellence
                        </h2>
                        <p className="mb-6" style={{ color: colors.charcoal }}>
                            Founded in 2015 by esports veterans, Royal Gaming Store began as a passion project to bring premium gaming experiences to discerning players. What started as a small boutique has grown into the most prestigious gaming destination, known for our uncompromising standards and royal treatment of every customer.
                        </p>
                        <p className="mb-8" style={{ color: colors.charcoal }}>
                            We meticulously select every product in our collection, testing each item to ensure it meets our royal seal of approval. From limited edition consoles to tournament-grade peripherals, we offer only what we would proudly use ourselves.
                        </p>
                        <div className="flex items-center gap-4">
                            <div
                                className="p-3 rounded-full"
                                style={{
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    border: `1px solid ${colors.royalGold}`
                                }}
                            >
                                <Trophy size={24} style={{ color: colors.royalGold }} />
                            </div>
                            <div>
                                <h3 className="font-bold" style={{ color: colors.richBlack }}>15+ Industry Awards</h3>
                                <p className="text-sm" style={{ color: colors.charcoal }}>Recognized excellence in retail and esports</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="py-16 px-4" style={{ background: '#FDF8E4' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{
                                color: colors.richBlack,
                                fontFamily: "'Cinzel', serif"
                            }}
                        >
                            The Royal Treatment
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg" style={{ color: colors.charcoal }}>
                            What sets us apart in the kingdom of gaming retailers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-xl text-center transition-all hover:transform hover:-translate-y-2"
                                style={{
                                    background: colors.parchment,
                                    border: `1px solid ${colors.royalGold}30`,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div
                                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
                                    style={{
                                        background: colors.goldGradient,
                                        color: colors.richBlack
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    className="text-xl font-bold mb-3"
                                    style={{
                                        color: colors.richBlack,
                                        fontFamily: "'Cinzel', serif"
                                    }}
                                >
                                    {feature.title}
                                </h3>
                                <p style={{ color: colors.charcoal }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* CTA */}
            <div
                className="py-20 px-4 text-center"
                style={{
                    background: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('/img/gaming-cta-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'multiply'
                }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        style={{
                            color: colors.parchment,
                            fontFamily: "'Cinzel', serif"
                        }}
                    >
                        Ready for the Royal Treatment?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: colors.brightGold }}>
                        Join our noble guild of gamers and experience gaming elevated to an art form.
                    </p>
                    <Link
                        to="/register"
                        className="px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-all duration-200"
                        style={{
                            background: colors.goldGradient,
                            color: colors.richBlack,
                            border: `1px solid ${colors.darkGold}`,
                            fontFamily: "'Cinzel', serif"
                        }}
                    >
                        <Crown size={20} /> Become a Member
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
