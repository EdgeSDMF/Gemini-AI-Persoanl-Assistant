
import React, { useState, useEffect } from 'react';
import { Feature } from './types';
import FeatureSelector from './components/FeatureSelector';
import EmailReply from './components/EmailReply';
import SubscriptionCanceller from './components/SubscriptionCanceller';
import MeetingNotes from './components/MeetingNotes';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState<Feature>(Feature.REPLY_EMAIL);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  useEffect(() => {
    // In a real build process, process.env.API_KEY would be set.
    // For local dev without a build process, it might be undefined.
    // This check simulates that.
    if (!process.env.API_KEY) {
      // A simple way to alert, in a real app this might be more robust
      // or handled by build-time checks if the key is truly embedded.
      // However, per instructions, API_KEY is assumed to be available.
      // This is a fallback for development environments where it might not be injected.
      // console.warn("API_KEY environment variable is not set. Using a placeholder for UI rendering. API calls will fail.");
      // To strictly follow "assume it's pre-configured", this explicit check for demo purposes
      // can be more lenient or specific to a dev scenario. For now, we'll flag it if truly undefined.
       if (typeof process.env.API_KEY === 'undefined' || process.env.API_KEY === "") {
        setApiKeyMissing(true);
        console.error("CRITICAL: API_KEY environment variable is not set or is empty.");
      }
    }
  }, []);

  const renderFeatureComponent = () => {
    switch (currentFeature) {
      case Feature.REPLY_EMAIL:
        return <EmailReply />;
      case Feature.CANCEL_SUBSCRIPTION:
        return <SubscriptionCanceller />;
      case Feature.MEETING_NOTES:
        return <MeetingNotes />;
      default:
        return <EmailReply />;
    }
  };

  if (apiKeyMissing) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-red-600 border border-red-700 text-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Configuration Error</h1>
          <p className="text-lg">The Gemini API Key (<code>API_KEY</code>) is missing or not configured in your environment.</p>
          <p className="mt-3 text-sm">This application cannot function without a valid API key. Please ensure it is correctly set up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3">
          <SparklesIcon className="w-10 h-10 text-sky-400" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-emerald-400">
            Gemini Personal Assistant
          </h1>
        </div>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
          Your AI-powered helper for emails, subscriptions, and meeting summaries, grounded with Google Search.
        </p>
      </header>

      <FeatureSelector currentFeature={currentFeature} onSelectFeature={setCurrentFeature} />

      <main className="w-full max-w-3xl mt-8">
        {renderFeatureComponent()}
      </main>
      
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Assistant. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
