'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { analyzeGuessingForum, AnalyzeGuessingForumOutput } from '@/ai/flows/analyze-guessing-forum';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap, Users, Target, Flame, Bot, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  gameName: z.string().min(1, 'Please select a game.'),
  forumUrl: z.string().url('Please enter a valid URL.'),
  date: z.date({
    required_error: 'A date is required.',
  }),
});

function AnalysisResultCard({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export function SattaGuesserClient() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeGuessingForumOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: 'KALYAN',
      forumUrl: '',
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeGuessingForum({
        ...values,
        date: format(values.date, 'yyyy-MM-dd'),
      });
      setAnalysisResult(result);
    } catch (error: any) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: error.message || 'An error occurred while analyzing the forum. Please check the URL and try again.',
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
            <CardTitle>Analyze Guessing Forum</CardTitle>
            <CardDescription>Enter a URL to a Satta guessing forum.</CardDescription>
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
                          <SelectItem value="MAIN BAZAR">Main Bazar</SelectItem>
                          <SelectItem value="MILAN NIGHT">Milan Night</SelectItem>
                          <SelectItem value="RAJDHANI NIGHT">Rajdhani Night</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="forumUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forum URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/guessing-forum"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  Analyze Community Guesses
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Community Guessing Analysis</CardTitle>
            <CardDescription>Results from the guessing forum will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Bot className="w-16 h-16 text-primary animate-pulse" />
                <p className="text-muted-foreground">Reading the forum... Please wait.</p>
              </div>
            )}
            {analysisResult ? (
              <div className="space-y-4">
                 <AnalysisResultCard icon={<Zap className="w-6 h-6" />} title="AI Summary">
                    <p className="text-sm text-muted-foreground">{analysisResult.analysisSummary}</p>
                </AnalysisResultCard>
                <div className="grid gap-4 md:grid-cols-3">
                    <AnalysisResultCard icon={<Flame className="w-6 h-6" />} title="Hot Numbers">
                        <div className="flex flex-wrap gap-2">
                            {analysisResult.hotNumbers.map(n => <div key={n} className="bg-primary/10 text-primary font-bold text-lg rounded-md w-12 h-12 flex items-center justify-center">{n}</div>)}
                        </div>
                    </AnalysisResultCard>
                    <AnalysisResultCard icon={<Target className="w-6 h-6" />} title="Popular Jodis">
                        <div className="flex flex-wrap gap-2">
                             {analysisResult.popularJodis.map(n => <div key={n} className="bg-primary/10 text-primary font-bold text-lg rounded-md w-12 h-12 flex items-center justify-center">{n}</div>)}
                        </div>
                    </AnalysisResultCard>
                    <AnalysisResultCard icon={<Users className="w-6 h-6" />} title="Popular Pannas">
                         <div className="flex flex-wrap gap-2">
                             {analysisResult.popularPannas.map(n => <div key={n} className="bg-primary/10 text-primary font-bold text-lg rounded-md w-14 h-12 flex items-center justify-center">{n}</div>)}
                        </div>
                    </AnalysisResultCard>
                </div>
              </div>
            ) : (
              !isLoading && (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
                <Users className="w-16 h-16 text-muted-foreground/50" />
                <p className="mt-4 text-center text-muted-foreground">
                  Analysis of community guesses will appear here.
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
