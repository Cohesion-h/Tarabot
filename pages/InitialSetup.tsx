
import React, { useEffect } from 'react';
import { GlassCard, Button, InputField } from '../components/Core';
import { useAuth } from '../context/AuthContext';

export const LanguageSelectionPage: React.FC = () => {
    const handleSelect = (lang: 'en' | 'ar') => {
        localStorage.setItem('tarabot_lang', lang);
        window.location.reload();
    };

    useEffect(() => {
        const lang = localStorage.getItem('tarabot_lang');
        if (lang) {
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }, []);

    return (
        <GlassCard className="p-8 w-full max-w-md text-center">
            <h1 className="font-display text-3xl text-white mb-6">Select Language</h1>
            <div className="space-y-4">
                <Button className="w-full" onClick={() => handleSelect('en')}>English</Button>
                <Button className="w-full font-['Tajawal']" onClick={() => handleSelect('ar')}>العربية</Button>
            </div>
        </GlassCard>
    );
};

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    
    // In a real app, these would trigger OAuth flows
    const handleSocialLogin = () => {
        login();
    };
    
    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    };

    return (
        <GlassCard className="p-8 w-full max-w-sm text-center">
            <h1 className="font-display text-5xl text-white mb-8">Join Tarabot</h1>
            <div className="space-y-4">
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={handleSocialLogin}>
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.61-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.63,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    Continue with Google
                </Button>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={handleSocialLogin}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01,16.23c-1.34,0-2.87-0.67-4.14-1.92c-1.42-1.4-2.22-3.43-2.22-5.32c0-2.15,0.9-4.25,2.44-5.54c1.3-1.09,2.94-1.7,4.4-1.7c0.4,0,1.96,0.17,3.32,1.19c-0.02,0.01-1.96,1.13-1.96,3.31c0,2.41,2.18,3.48,2.2,3.5c-0.2,0.5-0.51,1.13-0.92,1.71c-0.78,1.14-1.79,2.28-3.19,2.29C12.09,16.24,12.05,16.23,12.01,16.23z M13.7,2.26C12.33,2.25,10.7,3.01,9.63,3.95C7.57,5.77,6.6,8.23,6.6,10.51c0,2.62,1.1,5.2,2.95,6.86c1.13,1.01,2.43,1.68,3.87,1.68c0.05,0,0.1,0,0.15,0c1.53,0,2.9-0.93,3.85-2.23c0.91-1.22,1.3-2.82,1.33-2.88c-0.01,0-2.8-1.12-2.83-4.22c0-2.83,2.38-3.95,2.45-4c-1.3-1.2-3.13-1.23-3.3-1.23C14.07,2.26,13.88,2.26,13.7,2.26z"></path></svg>
                    Continue with Apple
                </Button>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-white/20" />
                    <span className="px-2 text-sm uppercase">Or</span>
                    <hr className="flex-grow border-white/20" />
                </div>
                
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <InputField label="" id="email" type="email" placeholder="Enter your email" className="text-center"/>
                    <Button type="submit" className="w-full">Continue with Email</Button>
                </form>
            </div>
        </GlassCard>
    );
};
