import React, { useState } from 'react';
import { GlassCard, Icon } from '../components/Core';

const FAQItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-4 hover:bg-white/5 transition-colors">
                <span className="font-semibold text-lg text-white">{q}</span>
                <Icon name={isOpen ? 'x-circle' : 'plus-circle'} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 text-white/80">
                    <p>{a}</p>
                </div>
            )}
        </div>
    )
}

const FAQS = [
    { q: "What is Tarabot?", a: "Tarabot is Kuwait's premier AI-powered innovation ecosystem, a trusted digital hub where verified talent meets strategic capital to architect breakthroughs." },
    { q: "Why is Hawiyti verification required?", a: "We require mandatory Hawiyti verification to ensure a trusted and secure environment for all our users, fostering authentic connections between creators and investors." },
    { q: "What is the AI Super Agent?", a: "The AI Super Agent is your productivity engine. It's a suite of powerful AI tools designed to help you with content creation, research, analysis, and automation, accessible via the Smart Chat Box." },
    { q: "What is the 'Digital Palm'?", a: "Your 'Digital Palm' is your shareable, verifiable digital portfolio. It aggregates your verified skills, project history, and endorsements to build social proof and showcase your expertise." }
];

export const HelpPage: React.FC = () => {
    return (
        <div>
            <h1 className="font-display text-4xl text-white mb-8 hidden md:block">Help & Q&A</h1>

            <GlassCard>
                {FAQS.map((faq, index) => <FAQItem key={index} q={faq.q} a={faq.a} />)}
            </GlassCard>
        </div>
    )
}
