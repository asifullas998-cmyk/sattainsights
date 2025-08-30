"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const predictionSchema = z.object({
  gameName: z.string().min(1, 'Please select a game.'),
  jodi: z.string().length(2, 'Jodi must be 2 digits.').regex(/^\d+$/, 'Jodi must be numbers only.'),
  panna: z.string().length(3, 'Panna must be 3 digits.').regex(/^\d+$/, 'Panna must be numbers only.').optional().or(z.literal('')),
  notes: z.string().optional(),
});

type Prediction = z.infer<typeof predictionSchema> & {
  id: string;
  date: string;
};

const STORAGE_KEY = 'satta-insights-diary';

export function PredictionDiary() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedPredictions = localStorage.getItem(STORAGE_KEY);
      if (savedPredictions) {
        setPredictions(JSON.parse(savedPredictions));
      }
    } catch (error) {
      console.error("Could not load predictions from localStorage", error);
    }
  }, []);

  const form = useForm<z.infer<typeof predictionSchema>>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      gameName: '',
      jodi: '',
      panna: '',
      notes: '',
    },
  });

  const savePredictions = (newPredictions: Prediction[]) => {
    try {
      setPredictions(newPredictions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPredictions));
    } catch (error) {
      console.error("Could not save predictions to localStorage", error);
    }
  };

  const onSubmit = (values: z.infer<typeof predictionSchema>) => {
    const newPrediction: Prediction = {
      ...values,
      id: new Date().toISOString(),
      date: format(new Date(), 'PP'),
    };
    const updatedPredictions = [newPrediction, ...predictions];
    savePredictions(updatedPredictions);
    form.reset();
    toast({
        title: "Prediction Saved",
        description: `Your guess for ${values.gameName} has been added to the diary.`,
    });
  };

  const deletePrediction = (id: string) => {
    const updatedPredictions = predictions.filter((p) => p.id !== id);
    savePredictions(updatedPredictions);
    toast({
        title: "Prediction Deleted",
        description: "The selected prediction has been removed from your diary.",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Prediction</CardTitle>
            <CardDescription>Save your guess for a future game.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="gameName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a game" /></SelectTrigger>
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
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="jodi"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Jodi (2-digit)</FormLabel>
                        <FormControl><Input placeholder="e.g., 42" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="panna"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Panna (3-digit)</FormLabel>
                        <FormControl><Input placeholder="e.g., 157" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl><Input placeholder="e.g., Based on last week's pattern" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Save Prediction
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>My Predictions</CardTitle>
            <CardDescription>A log of all your saved guesses.</CardDescription>
          </CardHeader>
          <CardContent>
            {predictions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Jodi</TableHead>
                  <TableHead>Panna</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                    <TableCell className="font-medium text-primary">{p.gameName}</TableCell>
                    <TableCell className="font-bold text-accent">{p.jodi}</TableCell>
                    <TableCell>{p.panna || '-'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{p.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => deletePrediction(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                    <p className="mt-4 text-center text-muted-foreground">
                        You haven't saved any predictions yet.
                    </p>
                    <p className="text-sm text-center text-muted-foreground/80">
                        Use the form on the left to add your first guess.
                    </p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
