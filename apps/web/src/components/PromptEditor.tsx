// File: apps/web/src/components/PromptEditor.tsx

interface PromptEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function PromptEditor({ value, onChange, onSubmit, isLoading }: PromptEditorProps) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-300">1. Describe Your Idea</h2>
      <textarea
        className="w-full h-28 bg-gray-900 border border-gray-700 rounded-md p-4 text-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
        placeholder="e.g., 'A mobile app that uses the camera to identify plants and give care instructions...'"
        value={value}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? '🧠 Generating...' : '✨ Generate & Craft'}
      </button>
    </div>
  );
}