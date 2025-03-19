import { FaGamepad, FaTrophy, FaHeadset } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => (
    <div className="flex p-4 bg-white shadow-md rounded-xl border border-gray-100 hover:border-[#FFDF00] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:translate-x-1">
        <div className="w-12 h-12 bg-[#1a1a1a] text-white rounded-lg flex items-center justify-center text-xl shadow-md">
            {icon}
        </div>
        <div className="ml-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-[#818181] text-sm mt-1">{description}</p>
        </div>
    </div>
);

const features = [
    {
        icon: <FaGamepad />,
        title: 'Unlimited Access',
        description: 'Get instant access to thousands of premium titles',
    },
    {
        icon: <FaTrophy />,
        title: 'Exclusive Rewards',
        description: 'Earn points with every purchase and redeem for rewards',
    },
    {
        icon: <FaHeadset />,
        title: 'Premium Support',
        description: '24/7 priority customer service for all your gaming needs',
    },
];

const FeatureList = () => {
    return (
        <div className="space-y-6 mt-12">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </div>
    );
};

export default FeatureList;
