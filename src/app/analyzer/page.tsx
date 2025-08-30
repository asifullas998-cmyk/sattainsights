import { AiAnalyzerClient } from "./ai-analyzer-client";

export default function AnalyzerPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Pattern Analyzer</h1>
      </div>
      <p className="text-muted-foreground">
        Paste historical data for a game to get AI-powered insights and pattern analysis. 
        Our model will identify trends, frequencies, and potential opportunities.
      </p>
      <AiAnalyzerClient />
    </div>
  );
}
