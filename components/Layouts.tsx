import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GlassCard, Icon, Button } from './Core';
import { useAuth } from '../context/AuthContext';
import type { Notification } from '../types';

// AuthLayout for login/role selection
export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-screen h-screen overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="https://picsum.photos/id/10/1920/1080.mp4" // Placeholder video
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {children}
    </div>
  </div>
);

// MinimalLayout for onboarding/language selection
export const MinimalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-screen h-screen flex items-center justify-center bg-black p-4">
    {children}
  </div>
);

// --- Navigation Components used by AppLayout ---
const NAV_ITEMS = [
  { path: '/home', name: 'Dashboard', icon: 'home' as const },
  { path: '/network', name: 'Networking', icon: 'users' as const },
  { path: '/marketplace', name: 'Marketplace', icon: 'briefcase' as const },
  { path: '/messages', name: 'Messages', icon: 'message-circle' as const },
  { path: '/profile', name: 'Profile', icon: 'user' as const },
];

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode; onClick?: () => void; }> = ({ to, active, children, onClick }) => (
  <Link to={to} onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors duration-200 ${active ? 'text-[#2762d4]' : 'text-[#baccde] hover:text-white'}`}>
    {children}
  </Link>
);

const BottomNav: React.FC<{ onOrbClick: () => void; }> = ({ onOrbClick }) => {
  const location = useLocation();
  const navLinks = [NAV_ITEMS[0], NAV_ITEMS[1], null, NAV_ITEMS[3], NAV_ITEMS[4]];

  return (
    <GlassCard className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-16 px-2 z-50 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navLinks.map((item, index) => {
          if (index === 2) { // AI Orb position
            return (
              <div key="orb-wrapper" className="-mt-8">
                <Button variant="icon" onClick={onOrbClick} className="w-16 h-16 bg-[#2762d4] text-white rounded-full shadow-[0_0_20px_#2762d4]">
                    <Icon name="ai-orb" size={32} />
                </Button>
              </div>
            );
          }
          const realIndex = index > 2 ? index-1 : index;
          const itemData = index === 3 ? NAV_ITEMS[3] : NAV_ITEMS[realIndex]
          const isActive = location.pathname.startsWith(itemData.path);
          return (
            <NavLink key={itemData.path} to={itemData.path} active={isActive}>
              <Icon name={itemData.icon} />
              <span className="text-xs">{itemData.name}</span>
            </NavLink>
          );
        })}
      </div>
    </GlassCard>
  );
};

const Sidebar: React.FC<{ onOrbClick: () => void; }> = ({ onOrbClick }) => {
    const location = useLocation();
    const { user } = useAuth();
    
    return (
        <GlassCard className="hidden md:flex flex-col h-[calc(100vh-2rem)] w-64 p-4 m-4 z-40">
            <h1 className="font-display text-2xl text-white text-center mb-8">TARABOT</h1>
            <div className="flex-grow space-y-2">
                {NAV_ITEMS.map(item => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link key={item.path} to={item.path} className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#2762d4]/20 text-[#2762d4]' : 'text-[#baccde] hover:bg-white/10'}`}>
                            <Icon name={item.icon} />
                            <span className="font-semibold">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
             <Button onClick={onOrbClick} className="w-full flex items-center justify-center gap-2 mb-4" variant="primary">
                <Icon name="ai-orb" size={20} />
                AI Super Agent
            </Button>
            <div className="border-t border-white/10 pt-4">
                 <Link to="/profile" className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/40?u=${user?.email}`} alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-white">{user?.name}</p>
                        <p className="text-sm text-[#baccde]">{user?.role}</p>
                    </div>
                </Link>
            </div>
        </GlassCard>
    );
}

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void; onOrbClick: () => void; }> = ({ isOpen, onClose, onOrbClick }) => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <GlassCard className={`absolute top-0 left-0 h-full w-[80%] max-w-xs p-6 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 mb-8">
                    <img src={`https://i.pravatar.cc/40?u=${user?.email}`} alt="Avatar" className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-semibold text-white text-lg">{user?.name}</p>
                        <p className="text-sm text-[#baccde]">{user?.role}</p>
                    </div>
                </div>
                <div className="flex-grow space-y-2">
                    {NAV_ITEMS.map(item => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link key={item.path} to={item.path} onClick={onClose} className={`flex items-center gap-4 p-3 rounded-lg text-lg transition-colors duration-200 ${isActive ? 'bg-[#2762d4]/20 text-[#2762d4]' : 'text-[#baccde] hover:bg-white/10'}`}>
                                <Icon name={item.icon} />
                                <span className="font-semibold">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
                <Button onClick={() => { onOrbClick(); onClose(); }} className="w-full flex items-center justify-center gap-2" variant="primary">
                    <Icon name="ai-orb" size={20} />
                    AI Super Agent
                </Button>
            </GlassCard>
        </div>
    );
};

const NotificationDropdown: React.FC = () => {
    const MOCK_NOTIFICATIONS: Notification[] = [
        { id: 1, icon: 'message-circle', text: 'You have a new message from Dana Al-Fahad.', time: '5m ago' },
        { id: 2, icon: 'users', text: 'Khaled Al-Mutairi endorsed your "UI/UX Design" skill.', time: '1h ago' },
        { id: 3, icon: 'dollar-sign', text: 'Your project "Fintech for Kuwait" received new funding.', time: '3h ago' }
    ];

    return (
        <GlassCard className="absolute top-full right-0 mt-2 w-80 p-2 z-50">
            <div className="p-2 font-semibold text-white">Notifications</div>
            <div className="space-y-1">
                {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                        <Icon name={n.icon} className="text-[#2762d4] mt-1" size={20} />
                        <div>
                            <p className="text-sm">{n.text}</p>
                            <p className="text-xs text-white/50">{n.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    )
}

const AppHeader: React.FC<{ onMenuClick: () => void; }> = ({ onMenuClick }) => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const currentNavItem = NAV_ITEMS.find(item => location.pathname.startsWith(item.path));
    const title = currentNavItem ? currentNavItem.name : "Dashboard";

    return (
        <div className="md:hidden sticky top-0 z-30 p-4 bg-black/50 backdrop-blur-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Button variant="icon" onClick={onMenuClick} className="-ml-2">
                        <Icon name="menu" />
                    </Button>
                    <h1 className="font-display text-3xl text-white">{title}</h1>
                </div>
                <div className="relative">
                    <Button variant="icon" onClick={() => setShowNotifications(s => !s)}>
                        <Icon name="bell" />
                    </Button>
                    {showNotifications && <NotificationDropdown />}
                </div>
            </div>
        </div>
    );
};

const AppFooter: React.FC = () => (
    <footer className="text-center p-4 text-xs text-gray-500 border-t border-white/10 mt-auto">
        <p>&copy; {new Date().getFullYear()} Tarabot. All rights reserved.</p>
        <div className="mt-2 space-x-4">
            <a href="#/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#/contact" className="hover:text-white transition-colors">Contact Us</a>
        </div>
    </footer>
)

export const AppLayout: React.FC<{ children: React.ReactNode; onOrbClick: () => void }> = ({ children, onOrbClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-black min-h-screen text-[#baccde] flex">
        <Sidebar onOrbClick={onOrbClick} />
        <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} onOrbClick={onOrbClick} />
        <main className="flex-grow md:pl-0 flex flex-col w-full min-w-0">
            <AppHeader onMenuClick={() => setMenuOpen(true)} />
            <div className="flex-grow p-4 md:p-8 pb-24 md:pb-8 h-full overflow-y-auto">
                 {children}
            </div>
            <div className="hidden md:block">
                 <AppFooter />
            </div>
        </main>
      <BottomNav onOrbClick={onOrbClick} />
    </div>
  );
};
