'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeSattaPatterns, AnalyzeSattaPatternsOutput } from '@/ai/flows/analyze-satta-patterns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap, BarChart, Search, Target, Puzzle, BrainCircuit } from 'lucide-react';

const formSchema = z.object({
  gameName: z.string().min(1, 'Please select a game.'),
  historicalData: z.string().min(20, 'Please provide at least 20 characters of historical data.'),
});

export function AiAnalyzerClient() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSattaPatternsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: 'KALYAN',
      historicalData: `Monday: 589-27-160
Tuesday: 340-71-290
Wednesday: 680-45-140
Thursday: 237-29-450
Friday: 115-78-350
Saturday: 580-30-127
Sunday: 224-81-470`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSattaPatterns(values);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing the data. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Data</CardTitle>
            <CardDescription>Select a game and provide data to start.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="gameName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a game" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="KALYAN">Kalyan</SelectItem>
                          <SelectItem value="KALYAN MORNING">Kalyan Morning</SelectItem>
                          <SelectItem value="KALYAN NIGHT">Kalyan Night</SelectItem>
                          <SelectItem value="MAIN BAZAR">Main Bazar</SelectItem>
                          <SelectItem value="MILAN DAY">Milan Day</SelectItem>
                          <SelectItem value="MILAN MORNING">Milan Morning</SelectItem>
                          <SelectItem value="MILAN NIGHT">Milan Night</SelectItem>
                          <SelectItem value="RAJDHANI NIGHT">Rajdhani Night</SelectItem>
                          <SelectItem value="TIME BAZAR">Time Bazar</SelectItem>
                          <SelectItem value="SRIDEVI">Sridevi</SelectItem>
                          <SelectItem value="SRIDEVI NIGHT">Sridevi Night</SelectItem>
                          <SelectItem value="MADHUR DAY">Madhur Day</Ite` +
      `m>
                          <SelectItem value="MADHUR NIGHT">Madhur Night</SelectItem>
                          <SelectItem value="SUPREME DAY">Supreme Day</SelectItem>
                          <SelectItem value="SUPREME NIGHT">Supreme Night</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="historicalData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Historical Data</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste historical Satta results here, e.g., 'Monday: 123-6-789'"
                          className="min-h-[200px] font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Analyze Patterns
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>Results from our AI model will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <BrainCircuit className="w-16 h-16 text-primary animate-pulse" />
                <p className="text-muted-foreground">Analyzing patterns... Please wait.</p>
              </div>
            )}
            {analysisResult ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary"><Puzzle className="w-6 h-6" /></div>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><BarChart className="w-6 h-6" /></div>
                            <CardTitle>Frequency Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{analysisResult.frequencyAnalysis}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Search className="w-6 h-6" /></div>
                            <CardTitle>Missing Numbers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{analysisResult.missingNumbers}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Target className="w-6 h-6" /></div>
                            <CardTitle>Hot & Cold Numbers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{analysisResult.hotAndColdNumbers}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Zap className="w-6 h-6" /></div>
                            <CardTitle>Jodi Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{analysisResult.jodiAnalysis}</p>
                        </CardContent>
                    </Card>
                </div>
              </div>
            ) : (
              !isLoading && (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
                <BrainCircuit className="w-16 h-16 text-muted-foreground/50" />
                <p className="mt-4 text-center text-muted-foreground">
                  Your analysis will be displayed here.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
