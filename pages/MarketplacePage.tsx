import React from 'react';
import { GlassCard, Icon, Button } from '../components/Core';
import { Link } from 'react-router-dom';

const TalentCard: React.FC<{name: string, skill: string}> = ({ name, skill }) => (
    <GlassCard className="p-4 text-center">
        <img src={`https://i.pravatar.cc/100?u=${name}`} alt={name} className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-white/20"/>
        <h4 className="text-lg font-bold text-white">{name}</h4>
        <p className="text-sm text-[#2762d4]">{skill}</p>
    </GlassCard>
);

export const MarketplacePage: React.FC = () => {
    return (
        <div>
            <h1 className="font-display text-4xl text-white mb-8 hidden md:block">Innovation Marketplace</h1>

            <div className="space-y-12">
                {/* Crowdfunding Section */}
                <GlassCard className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="font-display text-3xl text-white">Raise Capital for Your Vision</h2>
                        <p>Launch a crowdfunding campaign and bring your innovative projects to life with community support.</p>
                    </div>
                    <Link to="/crowdfunding">
                        <Button variant="primary">Explore Crowdfunding</Button>
                    </Link>
                </GlassCard>

                {/* Talent Section */}
                <div>
                    <h2 className="font-display text-3xl text-white mb-4">Talent for Hire</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <TalentCard name="Dana Al-Fahad" skill="UI/UX Designer" />
                        <TalentCard name="Khaled Al-Mutairi" skill="Full-Stack Developer" />
                        <TalentCard name="Noura Hussein" skill="AI/ML Engineer" />
                        <TalentCard name="Yousef Naser" skill="Brand Strategist" />
                        <TalentCard name="Fatima Abdullah" skill="Content Creator" />
                    </div>
                </div>
                
                {/* Payment Integrations Section */}
                <GlassCard className="p-6">
                    <p className="text-center text-sm text-gray-400 mb-4">Powered by trusted payment partners</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-60 grayscale">
                        {/* SVGs would be better here for consistent styling */}
                        <span className="font-bold text-2xl">Apple Pay</span>
                        <span className="font-bold text-2xl">Google Pay</span>
                        <span className="font-bold text-2xl">KNET</span>
                        <span className="font-bold text-2xl">Tabby</span>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
