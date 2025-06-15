
import React from 'react';
import { Feature } from '../types';

interface FeatureSelectorProps {
  currentFeature: Feature;
  onSelectFeature: (feature: Feature) => void;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ currentFeature, onSelectFeature }) => {
  const features = Object.values(Feature);

  return (
    <div className="w-full max-w-3xl bg-slate-800 shadow-lg rounded-xl p-2">
      <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" aria-label="Features">
        {features.map((feature) => (
          <button
            key={feature}
            onClick={() => onSelectFeature(feature)}
            className={`
              flex-1 whitespace-nowrap px-4 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
              ${
                currentFeature === feature
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-700 text-sky-300 hover:bg-slate-600 hover:text-sky-200'
              }
            `}
            aria-current={currentFeature === feature ? 'page' : undefined}
          >
            {feature}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FeatureSelector;
