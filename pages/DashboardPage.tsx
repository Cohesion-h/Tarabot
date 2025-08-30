import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GlassCard, Icon, Button } from '../components/Core';
import { Link } from 'react-router-dom';
// FIX: Imported ICONS to correctly type the 'icon' prop in ActionCard. This resolves the downstream type error for the 'title' prop.
import { ICONS } from '../constants';

const ActionCard: React.FC<{ to: string, icon: keyof typeof ICONS, title: string, description: string }> = ({ to, icon, title, description }) => (
    <Link to={to}>
        <GlassCard className="p-4 flex flex-col items-center text-center hover:bg-white/5 transition-colors h-full">
            <Icon name={icon} size={32} className="text-[#2762d4] mb-2" />
            <h3 className="font-semibold text-lg text-white">{title}</h3>
            <p className="text-sm">{description}</p>
        </GlassCard>
    </Link>
);

const CreatorDashboard: React.FC = () => (
    <div className="space-y-8">
        <div>
            <h2 className="font-display text-3xl text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActionCard to="/submit-idea" icon="lightbulb" title="Project Spark" description="Use AI to kickstart your next big idea." />
                <ActionCard to="/marketplace" icon="briefcase" title="Find a Co-Creator" description="Explore the marketplace for talent." />
                <ActionCard to="#" icon="send" title="Generate Ad Materials" description="Let the AI generate marketing copy." />
            </div>
        </div>
         <div>
            <h2 className="font-display text-3xl text-white mb-4">Opportunity Matches</h2>
            <GlassCard className="p-4">
                 <p className="text-center">Investor and project matches will appear here.</p>
            </GlassCard>
        </div>
    </div>
);

const InvestorDashboard: React.FC = () => (
     <div className="space-y-8">
        <div>
            <h2 className="font-display text-3xl text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActionCard to="/network" icon="users" title="Discover Creators" description="Browse trending profiles." />
                <ActionCard to="/submit-idea" icon="check-circle" title="Review New Submissions" description="Check the pipeline for new projects." />
                <ActionCard to="#" icon="settings" title="Market Research" description="Ask the AI for industry insights." />
            </div>
        </div>
         <div>
            <h2 className="font-display text-3xl text-white mb-4">Curated Deal Flow</h2>
             <GlassCard className="p-4">
                 <p className="text-center">Verified investment opportunities will be listed here.</p>
            </GlassCard>
        </div>
    </div>
);


export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div>
            <h1 className="font-display text-4xl text-white mb-2 hidden md:block">Welcome, {user?.name.split(' ')[0]}</h1>
            <p className="text-[#baccde] mb-8 hidden md:block">Here's your personalized dashboard.</p>

            {user?.role === 'Creator' ? <CreatorDashboard /> : <InvestorDashboard />}
        </div>
    );
};