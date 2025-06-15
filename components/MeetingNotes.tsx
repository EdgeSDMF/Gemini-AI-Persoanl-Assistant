
import React, { useState, useCallback } from 'react';
import { generateTextWithSearch } from '../services/geminiService';
import { ProcessedAiResponse } from '../types';
import OutputDisplay from './OutputDisplay';
import { DocumentTextIcon } from './Icons';

const MeetingNotes: React.FC = () => {
  const [meetingInput, setMeetingInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<ProcessedAiResponse | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!meetingInput.trim()) {
      setError("Meeting content/transcript cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    const prompt = `You are a helpful assistant. Analyze the following meeting content/transcript:
---
${meetingInput}
---
Please provide the following in a structured format:
1.  A concise overview of the meeting.
2.  Key takeaways (as bullet points).
3.  Actionable items (list each with assignee if mentioned, task description, and deadline if mentioned).

Use Google Search if any points require external information for clarification, context, or to verify facts mentioned during the meeting.
Present the output clearly.`;

    try {
      const result = await generateTextWithSearch(prompt);
      setAiResponse(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [meetingInput]);

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-sky-400 mb-6">Meeting Notes Generator</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="meetingInput" className="block text-sm font-medium text-slate-300 mb-1">
            Paste Meeting Transcript or Key Points:
          </label>
          <textarea
            id="meetingInput"
            value={meetingInput}
            onChange={(e) => setMeetingInput(e.target.value)}
            placeholder="e.g., John: We need to discuss the Q3 roadmap. Sarah: Agreed, let's start with the marketing campaign..."
            rows={10}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 text-sm"
          />
        </div>
        
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !meetingInput.trim()}
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating Notes...' : 'Generate Meeting Notes'}
          </button>
        </div>
      </div>

      <OutputDisplay isLoading={isLoading} error={error} aiResponse={aiResponse} title="Generated Meeting Notes" />
    </div>
  );
};

export default MeetingNotes;
