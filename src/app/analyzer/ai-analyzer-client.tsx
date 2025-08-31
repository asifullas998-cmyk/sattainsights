
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
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap, BarChart, Search, Target, Puzzle, BrainCircuit, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const formSchema = z.object({
  gameName: z.string().min(1, 'Please select a game.'),
});

// A component to find and style numbers in a string
const HighlightNumbers = ({ text }: { text: string }) => {
    if (!text) return null;

    // Regex to find numbers, number pairs with '-', and number groups
    const parts = text.split(/(\b\d{1,3}-\d{1,2}-\d{1,3}\b|\b\d{2,3}\b|\b\d{1,2}\b)/g);

    return (
      <span className="leading-relaxed">
        {parts.map((part, index) =>
          /(\b\d{1,3}-\d{1,2}-\d{1,3}\b|\b\d{2,3}\b|\b\d{1,2}\b)/.test(part) ? (
            <Badge key={index} variant="default" className="text-md mx-1">
              {part}
            </Badge>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </span>
    );
};

export function AiAnalyzerClient() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSattaPatternsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSattaPatterns({
        gameName: values.gameName,
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing the data. Please check the console for details.',
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
            <CardTitle>Analyze Game</CardTitle>
            <CardDescription>Select a game to start the analysis.</CardDescription>
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
                          <SelectItem value="MADHUR DAY">Madhur Day</SelectItem>
                          <SelectItem value="MADHUR NIGHT">Madhur Night</SelectItem>
                          <SelectItem value="SUPREME DAY">Supreme Day</SelectItem>
                          <SelectItem value="SUPREME NIGHT">Supreme Night</SelectItem>
                          <SelectItem value="MAIN BOMBAY">Main Bombay</SelectItem>
                          <SelectItem value="GUESSING FORUM">Guessing Forum</SelectItem>
                          <SelectItem value="PADMAVATI">Padmavati</SelectItem>
                          <SelectItem value="KALYAN STARLINE">Kalyan Starline</SelectItem>
                          <SelectItem value="GOA NIGHT">Goa Night</SelectItem>
                          <SelectItem value="CHENNAI MORNING">Chennai Morning</SelectItem>
                        </SelectContent>
                      </Select>
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
                <p className="text-muted-foreground">Fetching data and analyzing patterns... This may take a moment.</p>
              </div>
            )}
            {analysisResult ? (
              <div className="space-y-4">
                 {analysisResult.finalAnalysis && (
                  <Card className="bg-primary/10 border-primary/20">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <div className="p-2 rounded-lg bg-primary/20 text-primary-foreground"><Star className="w-6 h-6 text-primary" /></div>
                      <CardTitle>Final Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                              <p className="text-sm font-medium text-muted-foreground">Open</p>
                              <div className="text-2xl font-bold"><HighlightNumbers text={analysisResult.finalAnalysis.open} /></div>
                          </div>
                           <div>
                              <p className="text-sm font-medium text-muted-foreground">Close</p>
                              <div className="text-2xl font-bold"><HighlightNumbers text={analysisResult.finalAnalysis.close} /></div>
                          </div>
                          <div>
                              <p className="text-sm font-medium text-muted-foreground">Jodi</p>
                              <div className="text-2xl font-bold"><HighlightNumbers text={analysisResult.finalAnalysis.jodi} /></div>
                          </div>
                           <div>
                              <p className="text-sm font-medium text-muted-foreground">Panna</p>
                              <div className="text-lg font-bold"><HighlightNumbers text={analysisResult.finalAnalysis.panna} /></div>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary"><Puzzle className="w-6 h-6" /></div>
                    <CardTitle>Overall Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                     <HighlightNumbers text={analysisResult.summary} />
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary"><Users className="w-6 h-6" /></div>
                    <CardTitle>Community Forum Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                        <HighlightNumbers text={analysisResult.forumAnalysis} />
                     </p>
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><BarChart className="w-6 h-6" /></div>
                            <CardTitle>Frequency Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <HighlightNumbers text={analysisResult.frequencyAnalysis} />
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Search className="w-6 h-6" /></div>
                            <CardTitle>Missing Numbers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <HighlightNumbers text={analysisResult.missingNumbers} />
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Target className="w-6 h-6" /></div>
                            <CardTitle>Hot &amp; Cold Numbers</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground leading-relaxed">
                             <HighlightNumbers text={analysisResult.hotAndColdNumbers} />
                           </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Zap className="w-6 h-6" /></div>
                            <CardTitle>Jodi Analysis</CardTitle>
                        </Header>
                        <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <HighlightNumbers text={analysisResult.jodiAnalysis} />
                            </p>
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
