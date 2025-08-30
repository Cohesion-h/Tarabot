
import React from 'react';
import { GlassCard } from '../components/Core';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

export const RoleSelectionPage: React.FC = () => {
    const { setUserRole } = useAuth();
    
    const RoleCard: React.FC<{ role: Role; description: string }> = ({ role, description }) => (
        <div 
            onClick={() => setUserRole(role)} 
            className="p-8 border border-white/10 rounded-lg text-center cursor-pointer transition-all duration-200 hover:bg-[#2762d4]/20 hover:border-[#2762d4]"
        >
            <h3 className="font-display text-2xl text-white mb-2">{role}</h3>
            <p className="text-[#baccde]">{description}</p>
        </div>
    );
    
    return (
        <GlassCard className="p-8 w-full max-w-lg text-center">
            <h1 className="font-display text-4xl text-white mb-2">Choose Your Role</h1>
            <p className="text-[#baccde] mb-8">This helps us tailor your Tarabot experience.</p>
            <div className="space-y-6">
                <RoleCard role="Creator" description="For entrepreneurs and innovators." />
                <RoleCard role="Investor" description="For CEOs and capital providers." />
            </div>
        </GlassCard>
    );
};
