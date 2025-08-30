'use server';

/**
 * @fileOverview An AI agent that analyzes historical Satta results to identify patterns.
 *
 * - analyzeSattaPatterns - A function that handles the Satta pattern analysis process.
 * - AnalyzeSattaPatternsInput - The input type for the analyzeSattaPatterns function.
 * - AnalyzeSattaPatternsOutput - The return type for the analyzeSattaPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSattaPatternsInputSchema = z.object({
  gameName: z.string().describe('The name of the Satta game (e.g., Kalyan Matka).'),
  historicalData: z.string().describe('Historical Satta result data as a string.'),
});
export type AnalyzeSattaPatternsInput = z.infer<typeof AnalyzeSattaPatternsInputSchema>;

const AnalyzeSattaPatternsOutputSchema = z.object({
  summary: z.string().describe('A summary of identified patterns in the Satta data.'),
  frequencyAnalysis: z.string().describe('Analysis of number frequencies.'),
  missingNumbers: z.string().describe('Identified missing numbers in recent results.'),
  hotAndColdNumbers: z.string().describe('Identification of hot and cold numbers.'),
  jodiAnalysis: z.string().describe('Analysis of Jodi (pair) patterns.'),
});
export type AnalyzeSattaPatternsOutput = z.infer<typeof AnalyzeSattaPatternsOutputSchema>;

export async function analyzeSattaPatterns(input: AnalyzeSattaPatternsInput): Promise<AnalyzeSattaPatternsOutput> {
  return analyzeSattaPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSattaPatternsPrompt',
  input: {schema: AnalyzeSattaPatternsInputSchema},
  output: {schema: AnalyzeSattaPatternsOutputSchema},
  prompt: `You are an expert Satta pattern analyst.

  Analyze the provided historical Satta result data for the game: {{{gameName}}}.

  Identify and summarize potential patterns, including:
  - Frequency of numbers
  - Missing numbers in recent results
  - Hot and cold numbers
  - Jodi (pair) patterns

  Present these insights in a clear, understandable format.

  Historical Data: {{{historicalData}}}
`,
});

const analyzeSattaPatternsFlow = ai.defineFlow(
  {
    name: 'analyzeSattaPatternsFlow',
    inputSchema: AnalyzeSattaPatternsInputSchema,
    outputSchema: AnalyzeSattaPatternsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
