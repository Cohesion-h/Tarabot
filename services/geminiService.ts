import type { ChatMessage } from '../types';

const MOCK_CHAT_RESPONSES = [
    "Of course. Based on your profile as a Creator, I can help generate a comprehensive business plan. Let's start with your project's core value proposition.",
    "Analyzing market trends for the fintech sector in the MENA region... It seems there's a growing demand for micro-investment platforms. I can draft a competitive analysis for you.",
    "I can act as your AI agent to identify potential investors. My algorithm suggests three VCs who have recently invested in projects similar to yours. Would you like me to prepare a draft outreach email?",
    "To create advertising materials, we need to define the target audience. Are we targeting Gen Z on social media, or a more professional audience on platforms like LinkedIn?",
    "Understood. I will generate a content strategy focused on short-form video to maximize engagement for your brand. This will include a 30-day content calendar with prompts."
];

const streamResponse = (text: string) => {
    let index = 0;
    return new ReadableStream({
      start(controller) {
        const interval = setInterval(() => {
          if (index < text.length) {
            const chunk = text.substring(index, index + 5);
            controller.enqueue(chunk);
            index += 5;
          } else {
            clearInterval(interval);
            controller.close();
          }
        }, 50);
      },
    });
}

export const geminiService = {
  streamChat: (history: ChatMessage[]): ReadableStream<string> => {
    const lastUserMessage = history[history.length - 1]?.parts[0].text.toLowerCase();
    
    if (lastUserMessage.includes('/createslide')) {
        return streamResponse("Excellent! Let's create a pitch deck. What is the title of your presentation?");
    }
    if (lastUserMessage.includes('/deepresearch')) {
        return streamResponse("I can do that. What topic should I research for you? Please be as specific as possible.");
    }

    const randomResponse = MOCK_CHAT_RESPONSES[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.length)];
    return streamResponse(randomResponse);
  },
  
  generateProjectSpark: (idea: string, audience: string): ReadableStream<string> => {
      const sparkDocument = `
## Project Spark: ${idea}

### 1. Mission Statement
To revolutionize the [Industry related to '${idea}'] sector by providing a unique solution for ${audience} that addresses their core needs with unmatched efficiency and design.

### 2. Core Features
- **Feature A:** An intuitive user interface focused on simplicity and engagement for the ${audience}.
- **Feature B:** AI-powered personalization to deliver a tailored experience.
- **Feature C:** Seamless integration with existing platforms to ensure a smooth workflow.

### 3. Basic Business Model Canvas
- **Value Proposition:** A highly accessible and innovative solution for '${idea}'.
- **Target Audience:** Primarily targeting ${audience}.
- **Revenue Streams:** Freemium model with premium features, and B2B licensing.
- **Key Channels:** Digital marketing, strategic partnerships, and community building on the Tarabot platform.
      `;
      return streamResponse(sparkDocument);
  }
};
