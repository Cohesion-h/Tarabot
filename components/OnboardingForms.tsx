
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { InputField, Button, GlassCard } from './Core';

type FormData = Record<string, string>;

const CreatorForm: React.FC = () => {
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState<FormData>({ fullName: '', sector: '', projectStage: '', needs: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <InputField label="Sector (e.g., Tech, Design)" name="sector" value={formData.sector} onChange={handleChange} required />
            <InputField label="Project Stage (e.g., Idea, MVP)" name="projectStage" value={formData.projectStage} onChange={handleChange} required />
            <InputField label="Needs (e.g., Funding, Mentorship)" name="needs" value={formData.needs} onChange={handleChange} required />
            <Button type="submit" className="w-full">Complete Profile</Button>
        </form>
    );
};

const InvestorForm: React.FC = () => {
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState<FormData>({ fullName: '', ticketSize: '', preferredSectors: '', offers: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <InputField label="Average Ticket Size (e.g., <$50k)" name="ticketSize" value={formData.ticketSize} onChange={handleChange} required />
            <InputField label="Preferred Sectors" name="preferredSectors" value={formData.preferredSectors} onChange={handleChange} required />
            <InputField label="Offers (e.g., Capital, Network Access)" name="offers" value={formData.offers} onChange={handleChange} required />
            <Button type="submit" className="w-full">Complete Profile</Button>
        </form>
    );
};

export const OnboardingCreatorForm = CreatorForm;
export const OnboardingInvestorForm = InvestorForm;
