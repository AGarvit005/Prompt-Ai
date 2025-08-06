// File: apps/web/src/components/ArchitectureDiagram.tsx
'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { SkeletonLoader } from './SkeletonLoader';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'base',
  themeVariables: {
    background: 'transparent',
    primaryColor: '#1f2937',
    primaryTextColor: '#f9fafb',
    primaryBorderColor: '#4b5563',
    lineColor: '#6b7280',
    textColor: '#d1d5db',
    fontSize: '16px',
  },
});

interface ArchitectureDiagramProps {
  isLoading: boolean;
  architectureData?: {
    diagram_type: string;
    code: string;
  };
}

export function ArchitectureDiagram({ isLoading, architectureData }: ArchitectureDiagramProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isLoading) return; // Don't render while loading

    const renderDiagram = async () => {
      setError('');
      if (architectureData && architectureData.code) {
        try {
          const id = `mermaid-graph-${Date.now()}`;
          const cleanCode = architectureData.code.trim();

          if (!cleanCode) return;
          const { svg: renderedSvg } = await mermaid.render(id, cleanCode);
          setSvg(renderedSvg);
        } catch (e) {
          console.error("Mermaid rendering failed:", e);
          setError('Error rendering diagram. The AI may have generated invalid syntax.');
        }
      }
    };
    renderDiagram();
  }, [architectureData, isLoading]);

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg shadow-lg h-full min-h-[400px] flex justify-center items-center">
      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : svg ? (
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p className="text-gray-500">Your generated architecture will appear here.</p>
      )}
    </div>
  );
}