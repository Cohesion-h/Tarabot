import React, { useState, useEffect } from 'react';
import { GlassCard, Button, Icon } from '../components/Core';
import { useAuth } from '../context/AuthContext';

export const VerificationPage: React.FC = () => {
    const { setVerified } = useAuth();
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerifiedState] = useState(false);

    const handleVerify = () => {
        setVerifying(true);
        // Simulate API call to Hawiyti
        setTimeout(() => {
            setVerifying(false);
            setVerifiedState(true);
            setTimeout(() => {
                setVerified();
            }, 1500);
        }, 2000);
    };

    return (
        <GlassCard className="p-8 w-full max-w-md text-center">
            <Icon name="shield-check" size={64} className="mx-auto text-[#2762d4] mb-4" />
            <h1 className="font-display text-4xl text-white mb-2">Identity Verification</h1>
            <p className="text-[#baccde] mb-8">Tarabot requires all users to verify their identity with Hawiyti to ensure a trusted ecosystem.</p>
            
            {!verified && !verifying && (
                <Button className="w-full" onClick={handleVerify}>
                    Verify with Hawiyti
                </Button>
            )}

            {verifying && (
                <div className="flex items-center justify-center gap-4 text-white">
                    <Icon name="loader" size={24} />
                    <span>Verifying... Please wait.</span>
                </div>
            )}

            {verified && (
                <div className="flex items-center justify-center gap-4 text-[#10b981] text-xl font-semibold">
                    <Icon name="check-circle" size={24} />
                    <span>Verification Successful!</span>
                </div>
            )}
        </GlassCard>
    );
};
