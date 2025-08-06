// File: apps/web/src/app/page.tsx
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { enhancePrompt } from '../services/api';
import { PromptEditor } from '../components/PromptEditor';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

interface ApiResponse {
  original_prompt: string;
  enhanced_prompt: string;
  quality_score: number;
  architecture: {
    code: string;
    diagram_type: string;
  };
  roadmap: string[];
}

export default function HomePage() {
  const [prompt, setPrompt] = useState<string>('');
  
  const mutation = useMutation<ApiResponse, Error, string>({
    mutationFn: enhancePrompt,
  });

  return (
    <main className="container mx-auto p-4 md:p-8 text-white min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
          PromptCraft AI
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Transform simple ideas into production-ready system architectures with the power of AI.</p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <PromptEditor
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onSubmit={() => prompt.trim() && mutation.mutate(prompt)}
          isLoading={mutation.isPending}
        />
      </div>

      <AnimatePresence>
        {(mutation.isSuccess || mutation.isPending) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 text-gray-300">Generated Architecture</h2>
                <ArchitectureDiagram
                  architectureData={mutation.data?.architecture}
                  isLoading={mutation.isPending}
                />
              </div>
              <div className="flex flex-col">
                 <h2 className="text-2xl font-semibold mb-4 text-gray-300">Enhanced Prompt</h2>
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg shadow-lg h-full flex items-center">
                   {mutation.isPending ? (
                     <p className="text-gray-500">Generating enhanced prompt...</p>
                   ) : (
                    <p className="text-gray-200 font-mono text-base leading-relaxed">
                      {mutation.data?.enhanced_prompt}
                    </p>
                   )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mutation.isError && (
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-red-900/20 border border-red-700 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-red-300">An Error Occurred</h3>
              <p className="text-red-400 font-mono">{mutation.error.message}</p>
           </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}