import { SattaGuesserClient } from "./satta-guesser-client";

export default function GuesserPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Satta Guesser</h1>
      </div>
      <p className="text-muted-foreground">
        Enter the URL of a guessing forum to let our AI analyze the community's top picks. 
        The model will identify popular numbers, jodis, and pannas.
      </p>
      <SattaGuesserClient />
    </div>
  );
}
