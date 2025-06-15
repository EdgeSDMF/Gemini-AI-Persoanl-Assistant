
import React, { useState, useCallback } from 'react';
import { generateTextWithSearch } from '../services/geminiService';
import { ProcessedAiResponse } from '../types';
import OutputDisplay from './OutputDisplay';
import { ScissorsIcon } from './Icons';

const SubscriptionCanceller: React.FC = () => {
  const [subscriptionName, setSubscriptionName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<ProcessedAiResponse | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!subscriptionName.trim()) {
      setError("Subscription name cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    let prompt = `You are a helpful assistant. Please draft a formal email to cancel the subscription for: "${subscriptionName}".`;
    if (reason.trim()) {
      prompt += `\nThe reason for cancellation is: "${reason}".`;
    }
    prompt += `\nInclude placeholders for account details if necessary (e.g., [Your Name], [Account Number]). 
If the request is general, like "how to cancel Netflix", use Google Search to provide helpful, generic steps or advice for finding cancellation information.
Provide the cancellation email draft or guidance.`;

    try {
      const result = await generateTextWithSearch(prompt);
      setAiResponse(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionName, reason]);

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-sky-400 mb-6">Cancel Subscription</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="subscriptionName" className="block text-sm font-medium text-slate-300 mb-1">
            Subscription Name:
          </label>
          <input
            type="text"
            id="subscriptionName"
            value={subscriptionName}
            onChange={(e) => setSubscriptionName(e.target.value)}
            placeholder="e.g., Netflix, Spotify Premium"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 text-sm"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-1">
            Reason for Cancellation (Optional):
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., No longer using the service, Found a better alternative"
            rows={3}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 text-sm"
          />
        </div>
        
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !subscriptionName.trim()}
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
          >
            <ScissorsIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating Draft...' : 'Generate Cancellation Draft'}
          </button>
        </div>
      </div>

      <OutputDisplay isLoading={isLoading} error={error} aiResponse={aiResponse} title="Subscription Cancellation Draft/Guidance" />
    </div>
  );
};

export default SubscriptionCanceller;
