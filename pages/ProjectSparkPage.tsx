import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, Button, Icon, InputField } from '../components/Core';
import { geminiService } from '../services/geminiService';

export const ProjectSparkPage: React.FC = () => {
    const [idea, setIdea] = useState('');
    const [audience, setAudience] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState('');

    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [result]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idea.trim() || !audience.trim()) return;

        setIsGenerating(true);
        setResult('');

        const stream = geminiService.generateProjectSpark(idea, audience);
        const reader = stream.getReader();
        let generatedText = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            generatedText += value;
            setResult(generatedText);
        }

        setIsGenerating(false);
    };

    return (
        <div>
            <h1 className="font-display text-4xl text-white mb-8 hidden md:block">AI Project Spark</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Icon name="lightbulb" size={32} className="text-[#2762d4]" />
                        <h2 className="font-display text-3xl text-white">Generate Your Idea</h2>
                    </div>
                    <p className="text-white/70 mb-6">Provide the core details of your project, and the AI Super Agent will generate a foundational "Project Spark" document to get you started.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            id="idea"
                            label="What is your core project idea?"
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="e.g., A mobile app for sustainable fashion swaps"
                            required
                        />
                         <div>
                            <label htmlFor="audience" className="block text-sm font-medium text-[#baccde] mb-1">Who is your target audience?</label>
                            <textarea
                                id="audience"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                placeholder="e.g., Gen Z users in Kuwait passionate about sustainability"
                                required
                                className="w-full bg-[#191919] p-2 rounded-lg text-[#baccde] border border-[#baccde]/50 transition-all duration-200 ease-in-out focus:outline-none focus:border-[#2762d4] focus:ring-2 focus:ring-[#2762d4]/50"
                                rows={3}
                            ></textarea>
                        </div>
                        <Button type="submit" className="w-full" disabled={isGenerating}>
                            {isGenerating ? 'Generating...' : 'Generate Spark'}
                        </Button>
                    </form>
                </GlassCard>

                <GlassCard className="p-6 h-[60vh] flex flex-col">
                    <h2 className="font-display text-3xl text-white mb-4">Your Project Spark</h2>
                    <div ref={resultRef} className="flex-grow overflow-y-auto bg-black/20 rounded-lg p-4 prose prose-invert prose-p:text-white/80 prose-headings:text-white">
                        {isGenerating && !result && <p>Generating your document...</p>}
                        {result ? (
                             <pre className="whitespace-pre-wrap font-body">{result}</pre>
                        ) : (
                           !isGenerating && <p className="text-white/50">Your generated document will appear here.</p>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
