'use server';

/**
 * @fileOverview An AI agent that analyzes a Satta guessing forum to identify popular numbers.
 *
 * - analyzeGuessingForum - A function that handles the forum analysis process.
 * - AnalyzeGuessingForumInput - The input type for the analyzeGuessingForum function.
 * - AnalyzeGuessingForumOutput - The return type for the analyzeGuessingForum function.
 */

import {ai} from '@/ai/genkit';
import {fetchWebsiteContent} from '@/ai/tools/website-fetcher';
import {z} from 'genkit';

const AnalyzeGuessingForumInputSchema = z.object({
  gameName: z.string().describe('The name of the Satta game (e.g., Kalyan).'),
  forumUrl: z.string().url().describe('The URL of the guessing forum page.'),
  date: z.string().describe('The date for which to analyze the guesses (e.g., YYYY-MM-DD).')
});
export type AnalyzeGuessingForumInput = z.infer<typeof AnalyzeGuessingForumInputSchema>;

const AnalyzeGuessingForumOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the most popular guesses and numbers found on the forum page for the given date.'),
  hotNumbers: z.array(z.string()).describe('A list of single digits that are frequently mentioned as "hot" or likely to appear.'),
  popularJodis: z.array(z.string()).describe('A list of 2-digit pairs (Jodis) that are commonly guessed.'),
  popularPannas: z.array(z.string()).describe('A list of 3-digit numbers (Pannas) that are commonly guessed.'),
});
export type AnalyzeGuessingForumOutput = z.infer<typeof AnalyzeGuessingForumOutputSchema>;

export async function analyzeGuessingForum(input: AnalyzeGuessingForumInput): Promise<AnalyzeGuessingForumOutput> {
  return analyzeGuessingForumFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeGuessingForumPrompt',
  input: {schema: z.object({ gameName: z.string(), websiteContent: z.string(), date: z.string() })},
  output: {schema: AnalyzeGuessingForumOutputSchema},
  prompt: `You are an expert Satta analyst. You are analyzing a web page from a guessing forum for the game "{{gameName}}" for the date "{{date}}". The content of the page is provided below.

Your task is to read through the forum posts and identify the most frequently guessed numbers specifically for the date "{{date}}". Summarize the findings and extract the "hot" single digits, popular Jodis (2-digit pairs), and popular Pannas (3-digit numbers).

Do not invent any numbers. Only use numbers that are explicitly mentioned in the provided website content for the specified date.

Website Content:
{{{websiteContent}}}
`,
});

const analyzeGuessingForumFlow = ai.defineFlow(
  {
    name: 'analyzeGuessingForumFlow',
    inputSchema: AnalyzeGuessingForumInputSchema,
    outputSchema: AnalyzeGuessingForumOutputSchema,
    tools: [fetchWebsiteContent],
  },
  async ({gameName, forumUrl, date}) => {
    const websiteContent = await fetchWebsiteContent(forumUrl);
    
    // Basic cleaning: remove HTML tags and extra whitespace
    const textContent = websiteContent.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim();

    if (textContent.length < 50) {
      throw new Error("Could not retrieve enough content from the URL. The page might be empty or require a login.");
    }
    
    const {output} = await prompt({
      gameName,
      websiteContent: textContent,
      date,
    });
    return output!;
  }
);
