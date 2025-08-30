import { PredictionDiary } from "@/components/prediction-diary";

export default function DiaryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Prediction Diary</h1>
      </div>
      <p className="text-muted-foreground">
        Keep track of your guesses and analyze your performance. All data is saved locally in your browser.
      </p>
      <PredictionDiary />
    </div>
  );
}
