import React from 'react';
import { GlassCard, Button, Icon } from '../components/Core';
import { Link } from 'react-router-dom';

interface Campaign {
    id: number;
    title: string;
    author: string;
    description: string;
    raised: number;
    goal: number;
    image: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
    { id: 1, title: "AI-Powered Logistics for Kuwait", author: "Fahad Al-Sabah", description: "Optimizing supply chains with a predictive AI model.", raised: 4500, goal: 10000, image: "https://picsum.photos/id/1074/400/200" },
    { id: 2, title: "Sustainable Vertical Farming", author: "Noura Al-Jaber", description: "A new approach to urban agriculture to ensure food security.", raised: 8200, goal: 15000, image: "https://picsum.photos/id/106/400/200" },
    { id: 3, title: "EdTech Platform for Arabic Coders", author: "Yousef Naser", description: "An interactive platform to teach coding with a localized curriculum.", raised: 19500, goal: 20000, image: "https://picsum.photos/id/2/400/200" },
];

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
    const progress = Math.round((campaign.raised / campaign.goal) * 100);
    return (
        <GlassCard className="p-4 flex flex-col">
            <img src={campaign.image} alt={campaign.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
            <h3 className="font-display text-xl text-white mb-1">{campaign.title}</h3>
            <p className="text-sm text-white/70 mb-3">by {campaign.author}</p>
            <p className="text-sm flex-grow mb-4">{campaign.description}</p>
            
            <div className="w-full bg-white/10 rounded-full h-2.5 mb-2">
                <div className="bg-[#10b981] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm">
                <span><span className="font-bold text-white">${campaign.raised.toLocaleString()}</span> raised</span>
                <span className="font-bold text-white">{progress}%</span>
            </div>
            <Button variant="secondary" className="w-full mt-4">View & Fund</Button>
        </GlassCard>
    );
}

export const CrowdfundingPage: React.FC = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h1 className="font-display text-4xl text-white">Crowdfunding Portal</h1>
                 <Link to="/submit-idea">
                    <Button variant="primary">
                        <Icon name="plus-circle" className="mr-2"/>
                        Launch a Campaign
                    </Button>
                 </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_CAMPAIGNS.map(c => <CampaignCard key={c.id} campaign={c} />)}
            </div>
        </div>
    );
};
