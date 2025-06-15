
import React, { useState, useCallback } from 'react';
import { generateTextWithSearch } from '../services/geminiService';
import { ProcessedAiResponse } from '../types';
import OutputDisplay from './OutputDisplay';
import { PaperAirplaneIcon } from './Icons';

const EmailReply: React.FC = () => {
  const [emailContent, setEmailContent] = useState<string>('');
  const [tone, setTone] = useState<string>('Formal');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<ProcessedAiResponse | null>(null);

  const tones = ['Formal', 'Casual', 'Concise', 'Persuasive', 'Friendly', 'Direct'];

  const handleSubmit = useCallback(async () => {
    if (!emailContent.trim()) {
      setError("Email content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    const prompt = `You are a helpful assistant. Please draft a reply to the following email.
The desired tone for the reply is: ${tone}.
Use Google Search if the email content requires external information or current events to formulate an accurate and helpful response.

Original Email:
---
${emailContent}
---

Suggested Reply:`;

    try {
      const result = await generateTextWithSearch(prompt);
      setAiResponse(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [emailContent, tone]);

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-sky-400 mb-6">Reply to Email</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="emailContent" className="block text-sm font-medium text-slate-300 mb-1">
            Paste Email Content Here:
          </label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="e.g., Subject: Meeting Request..."
            rows={8}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 text-sm"
          />
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-1">
            Select Tone:
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 text-sm"
          >
            {tones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !emailContent.trim()}
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
          >
            <PaperAirplaneIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating Reply...' : 'Generate Email Reply'}
          </button>
        </div>
      </div>

      <OutputDisplay isLoading={isLoading} error={error} aiResponse={aiResponse} title="Suggested Email Reply" />
    </div>
  );
};

export default EmailReply;
