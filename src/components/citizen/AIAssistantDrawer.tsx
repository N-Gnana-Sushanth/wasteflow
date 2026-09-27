import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, HelpCircle } from 'lucide-react';
import { generateAssistantAnswer } from '../../services/aiService';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  suggestedActions?: { label: string; action: string }[];
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Hello Ananya! I am your WasteFlow AI Assistant. You can ask me how to dispose of specific items, track your doorstep pickup, learn about municipal bin rules, or check your eco-rewards balance.',
      time: 'Just now',
      suggestedActions: [
        { label: 'Where should I dispose old laptop & batteries?', action: 'ASK_EWASTE' },
        { label: 'When is my next pickup?', action: 'ASK_PICKUP' },
        { label: 'How do I redeem points for Metro Pass?', action: 'ASK_REWARDS' }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question) return;

    const userMsg: Message = {
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateAssistantAnswer(question);
      const assistantMsg: Message = {
        sender: 'assistant',
        text: resp.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: resp.suggestedActions
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleActionClick = (action: string, label: string) => {
    if (action.startsWith('ASK_')) {
      handleSend(label);
      return;
    }

    if (onNavigateTab) {
      if (action === 'OPEN_SCANNER') onNavigateTab('scanner');
      else if (action === 'OPEN_PICKUP_FORM' || action === 'OPEN_PICKUPS') onNavigateTab('pickups');
      else if (action === 'OPEN_TRACKING') onNavigateTab('tracking');
      else if (action === 'OPEN_REWARDS') onNavigateTab('rewards');
      else if (action === 'OPEN_CENTERS') onNavigateTab('centers');
      else if (action === 'OPEN_DUMPING_FORM') onNavigateTab('dumping');
      else if (action === 'OPEN_MAP') onNavigateTab('home');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-slate-950">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">WasteFlow AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 font-mono">ONLINE • NATURAL LANGUAGE ENGINE</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'assistant' && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30 shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-500 text-slate-950 font-medium'
                    : 'bg-slate-800 border border-slate-700 text-slate-200'
                }`}>
                  <p>{m.text}</p>
                  
                  {/* Suggested actions chips */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                      {m.suggestedActions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act.action, act.label)}
                          className="flex items-center gap-1 rounded-lg bg-slate-900/90 hover:bg-slate-950 text-brand-300 border border-brand-500/40 px-2 py-1 text-[10px] font-medium transition-colors"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Bot className="h-4 w-4 text-brand-400 animate-spin" />
                <span>AI Assistant is drafting response...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask e.g. 'Where should I dispose old paint?'"
                className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 p-2.5 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
