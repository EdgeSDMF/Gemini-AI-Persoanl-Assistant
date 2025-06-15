
import React from 'react';

interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25.813a4.5 4.5 0 01-3.09 3.09L11.25 19.75l.813-2.846a4.5 4.5 0 013.09-3.09L17 12.001l2.846-.813a4.5 4.5 0 013.09-3.09L21.75 4.25l-.813 2.846a4.5 4.5 0 01-3.09 3.09L17 11.999z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const ScissorsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.167 2.167 0 011.536-.887m0 0a2.167 2.167 0 012.167 0m0 0a2.167 2.167 0 010 2.167m0 0a2.167 2.167 0 01-.887 1.536m0 0l-1.536.887m0 0a3 3 0 11-5.196 3 3 3 0 015.196-3zm-3.072-3.072a2.167 2.167 0 010-2.167m0 0a2.167 2.167 0 012.167 0m0 0a2.167 2.167 0 010 2.167M16.152 8.25l-1.536.887m0 0a2.167 2.167 0 00-1.536-.887m0 0a2.167 2.167 0 00-2.167 0m0 0a2.167 2.167 0 000 2.167m0 0a2.167 2.167 0 00.887 1.536m0 0l1.536.887m0 0a3 3 0 115.196 3 3 3 0 01-5.196-3zm3.072-3.072a2.167 2.167 0 000-2.167m0 0a2.167 2.167 0 00-2.167 0m0 0a2.167 2.167 0 000 2.167" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-4.5 0m4.5 0v.75A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V18m7.5 0a7.5 7.5 0 00-7.5 0M12 12.75a2.25 2.25 0 010-4.5m0 4.5a2.25 2.25 0 000-4.5M12 12.75v-1.5m0 1.5a6.006 6.006 0 003.75-1.073M12 11.25a6.006 6.006 0 01-3.75-1.073m7.5 1.823A6.01 6.01 0 0012 5.25a6.01 6.01 0 00-3.75 1.073" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

