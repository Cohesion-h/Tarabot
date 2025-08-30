import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthLayout, MinimalLayout, AppLayout } from './components/Layouts';
import { LanguageSelectionPage, LoginPage } from './pages/InitialSetup';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { VerificationPage } from './pages/VerificationPage';
import { AIOnboardingPage } from './pages/AIOnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CrowdfundingPage } from './pages/CrowdfundingPage';
import { NetworkingFeedPage, ProfilePage, MorePage } from './pages/CoreAppPages';
import { MessagesPage } from './pages/MessagesPage';
import { ProjectSparkPage } from './pages/ProjectSparkPage';
import { HelpPage } from './pages/HelpPage';
import { SmartChatBox } from './components/SmartChatBox';

const AppRoutes: React.FC = () => {
    const { isAuthenticated, user, isVerified, isOnboarded } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const lang = localStorage.getItem('tarabot_lang');
    
    useEffect(() => {
        if (lang) {
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }, [lang]);

    // 1. Language Selection
    if (!lang) {
        return <MinimalLayout><LanguageSelectionPage /></MinimalLayout>;
    }
    
    // 2. Authentication Flow
    if (!isAuthenticated) {
        return (
            <AuthLayout>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthLayout>
        );
    }
    
    // 3. Role Selection
    if (!user?.role) {
         return <MinimalLayout><RoleSelectionPage /></MinimalLayout>;
    }

    // 4. Hawiyti Verification
    if (!isVerified) {
        return <MinimalLayout><VerificationPage /></MinimalLayout>;
    }

    // 5. AI-Powered Onboarding
    if (!isOnboarded) {
        return <MinimalLayout><AIOnboardingPage /></MinimalLayout>;
    }

    // 6. Main App
    return (
        <AppLayout onOrbClick={() => setModalOpen(true)}>
            <SmartChatBox isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            <Routes>
                <Route path="/home" element={<DashboardPage />} />
                <Route path="/network" element={<NetworkingFeedPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/crowdfunding" element={<CrowdfundingPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/more" element={<MorePage />} />
                <Route path="/submit-idea" element={<ProjectSparkPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </AppLayout>
    );
};


const App: React.FC = () => (
    <AuthProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AuthProvider>
);

export default App;
