'use server';

/**
 * @fileOverview An AI agent that analyzes historical Satta results to identify patterns,
 * optionally using content from external websites for additional context.
 *
 * - analyzeSattaPatterns - A function that handles the Satta pattern analysis process.
 * - AnalyzeSattaPatternsInput - The input type for the analyzeSattaPatterns function.
 * - AnalyzeSattaPatternsOutput - The return type for the analyzeSattaPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define a tool to fetch content from a URL
const getWebsiteContentTool = ai.defineTool(
  {
    name: 'getWebsiteContent',
    description: 'Fetches the text content of a given website URL.',
    inputSchema: z.object({url: z.string().url()}),
    outputSchema: z.string(),
  },
  async ({url}) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Error: Failed to fetch URL with status ${response.status}.`;
      }
      // A real implementation would parse the HTML and extract the main content.
      // For this example, we'll just return a summary of the response.
      const text = await response.text();
      return text.substring(0, 5000); // Return first 5000 chars to avoid excessive length
    } catch (e: any) {
      return `Error: Could not fetch URL. ${e.message}`;
    }
  }
);

const AnalyzeSattaPatternsInputSchema = z.object({
  gameName: z.string().describe('The name of the Satta game (e.g., Kalyan Matka).'),
  historicalData: z.string().describe('Historical Satta result data as a string.'),
  urls: z.array(z.string().url()).optional().describe('A list of website URLs to analyze for additional context.'),
});
export type AnalyzeSattaPatternsInput = z.infer<typeof AnalyzeSattaPatternsInputSchema>;

const AnalyzeSattaPatternsOutputSchema = z.object({
  summary: z.string().describe('A summary of identified patterns in the Satta data, incorporating insights from any provided web content.'),
  frequencyAnalysis: z.string().describe('Analysis of number frequencies from historical data.'),
  missingNumbers: z-string().describe('Identified missing numbers in recent results from historical data.'),
  hotAndColdNumbers: z.string().describe('Identification of hot and cold numbers from historical data.'),
  jodiAnalysis: z.string().describe('Analysis of Jodi (pair) patterns from historical data.'),
  forumAnalysis: z.string().describe('Analysis of community guesses and discussions from the provided website URLs. If no URLs are provided, state that this analysis was not performed.'),
});
export type AnalyzeSattaPatternsOutput = z.infer<typeof AnalyzeSattaPatternsOutputSchema>;

export async function analyzeSattaPatterns(input: AnalyzeSattaPatternsInput): Promise<AnalyzeSattaPatternsOutput> {
  return analyzeSattaPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSattaPatternsPrompt',
  input: {schema: AnalyzeSattaPatternsInputSchema},
  output: {schema: AnalyzeSattaPatternsOutputSchema},
  tools: [getWebsiteContentTool],
  prompt: `You are an expert Satta pattern analyst.

  Your primary goal is to analyze the provided historical Satta result data for the game: {{{gameName}}}.

  From the historical data, you must identify and summarize potential patterns, including:
  - Frequency of numbers
  - Missing numbers in recent results
  - Hot and cold numbers
  - Jodi (pair) patterns

  {{#if urls}}
  Additionally, you have been provided with a list of URLs. Use the 'getWebsiteContent' tool to fetch the content from each URL. Analyze the fetched content for community discussions, predictions, and popular guesses related to the game. Summarize these findings in the 'forumAnalysis' field. Use the insights from the websites to enrich your overall summary.
  {{/if}}
  
  Present all insights in a clear, understandable format, filling out all fields of the output schema.

  Historical Data:
  {{{historicalData}}}
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
