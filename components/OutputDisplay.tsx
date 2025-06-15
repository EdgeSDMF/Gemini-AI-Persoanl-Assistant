
import React from 'react';
import { ProcessedAiResponse, GroundingSource } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { LinkIcon, LightBulbIcon, ExclamationTriangleIcon } from './Icons';

interface OutputDisplayProps {
  isLoading: boolean;
  error: string | null;
  aiResponse: ProcessedAiResponse | null;
  title?: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, error, aiResponse, title = "AI Assistant's Response" }) => {
  if (isLoading) {
    return (
      <div className="mt-6 p-6 bg-slate-800 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sky-300">Generating response...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-6 bg-red-900 border border-red-700 rounded-xl shadow-lg text-red-300">
        <div className="flex items-center mb-2">
          <ExclamationTriangleIcon className="w-6 h-6 mr-2 text-red-400" />
          <h3 className="text-xl font-semibold text-red-300">Error</h3>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  if (!aiResponse || (!aiResponse.text.trim() && aiResponse.sources.length === 0)) {
    return (
        <div className="mt-6 p-6 bg-slate-800 rounded-xl shadow-lg text-slate-400 min-h-[100px] flex items-center justify-center">
            <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-400"/>
            <p>Enter your query above and click "Generate" to see results.</p>
        </div>
    );
  }
  
  return (
    <div className="mt-6 p-6 bg-slate-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-sky-400 mb-4">{title}</h3>
      {aiResponse.text && (
        <pre className="whitespace-pre-wrap break-words bg-slate-700 p-4 rounded-md text-slate-200 text-sm leading-relaxed font-sans">
          {aiResponse.text}
        </pre>
      )}

      {aiResponse.sources && aiResponse.sources.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h4 className="text-lg font-medium text-sky-300 mb-3">Grounding Sources:</h4>
          <ul className="space-y-2">
            {aiResponse.sources.map((source, index) => (
              <li key={index} className="flex items-start">
                <LinkIcon className="w-4 h-4 mr-2 mt-1 text-sky-500 flex-shrink-0" />
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline break-all text-sm"
                  title={source.uri}
                >
                  {source.title || source.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
