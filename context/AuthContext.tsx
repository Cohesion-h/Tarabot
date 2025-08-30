import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { AuthContextType, User, Role } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

const getInitialState = () => {
    try {
        const storedState = localStorage.getItem('tarabot_auth');
        if (storedState) {
            const parsed = JSON.parse(storedState);
            // Derive complex states
            parsed.isOnboarded = !!parsed.user?.profileData?.fullName;
            return parsed;
        }
    } catch (error) {
        console.error("Failed to parse auth state from localStorage", error);
        localStorage.removeItem('tarabot_auth');
    }
    return {
        user: null,
        isAuthenticated: false,
        isVerified: false,
        isOnboarded: false,
    };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState(getInitialState);

    const persistState = (state: any) => {
        localStorage.setItem('tarabot_auth', JSON.stringify(state));
    };

    const login = useCallback(() => {
        const newUser: User = { name: 'Anonymous User', email: `user@tarabot.com`, role: null, profileData: {} };
        const newState = { ...authState, user: newUser, isAuthenticated: true, isVerified: false, isOnboarded: false };
        setAuthState(newState);
        persistState(newState);
    }, [authState]);
    
    const setUserRole = useCallback((role: Role) => {
        setAuthState(prevState => {
            if (!prevState.user) return prevState;
            const updatedUser = { ...prevState.user, role };
            const newState = { ...prevState, user: updatedUser };
            persistState(newState);
            return newState;
        });
    }, []);

    const setVerified = useCallback(() => {
        setAuthState(prevState => {
            const newState = { ...prevState, isVerified: true };
            persistState(newState);
            return newState;
        });
    }, []);

    const logout = useCallback(() => {
        const initialState = { user: null, isAuthenticated: false, isVerified: false, isOnboarded: false };
        setAuthState(initialState);
        localStorage.removeItem('tarabot_auth');
        window.location.hash = '/login';
    }, []);

    const updateUser = useCallback((data: Record<string, any>) => {
        setAuthState(prevState => {
            if (!prevState.user) return prevState;
            const updatedUser = {
                ...prevState.user,
                profileData: { ...prevState.user.profileData, ...data },
                name: data.fullName || prevState.user.name,
            };
            const isOnboarded = !!updatedUser.profileData.fullName;
            const newState = { ...prevState, user: updatedUser, isOnboarded };
            persistState(newState);
            return newState;
        });
    }, []);
    
    const value = { ...authState, login, logout, setUserRole, setVerified, updateUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
