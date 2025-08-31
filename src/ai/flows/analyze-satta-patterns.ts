
'use server';

/**
 * @fileOverview An AI agent that analyzes historical Satta results to identify patterns,
 * automatically fetching data from web search results.
 *
 * - analyzeSattaPatterns - A function that handles the Satta pattern analysis process.
 * - AnalyzeSattaPatternsInput - The input type for the analyzeSattaPatterns function.
 * - AnalyzeSattaPatternsOutput - The return type for the analyzeSattaPatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// A mock search tool. In a real application, this would use a Google Search API.
const searchGoogleTool = ai.defineTool(
  {
    name: 'searchGoogle',
    description: 'Searches Google for a given query and returns a list of relevant website URLs and snippets.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
        results: z.array(z.object({
            url: z.string().url(),
            snippet: z.string(),
        }))
    }),
  },
  async ({query}) => {
    console.log(`Searching Google for: ${query}`);
    // This is a mock implementation.
    // Replace with a real Google Search API call.
    const slug = query.toLowerCase().replace(/\s+/g, '-');
    return {
        results: [
            { url: `https://www.example-satta-results.com/${slug}`, snippet: `Latest ${query} results, charts, and patterns.`},
            { url: `https://www.example-satta-forum.com/t/${slug}-discussion`, snippet: `Community forum for ${query} with live guesses.`},
        ]
    };
  }
);


const getWebsiteContentTool = ai.defineTool(
  {
    name: 'getWebsiteContent',
    description: 'Fetches the text content of a given website URL.',
    inputSchema: z.object({url: z.string().url()}),
    outputSchema: z.string(),
  },
  async ({url}) => {
    try {
      // In a real app, you'd fetch the URL. We'll return mock data for this example.
      console.log(`Fetching content for URL: ${url}`);
      
      // Consistent seed generation from URL
      let seed = 0;
      for(let i = 0; i < url.length; i++) {
        const charCode = url.charCodeAt(i);
        seed = ((seed << 5) - seed) + charCode;
        seed |= 0; // Convert to 32bit integer
      }

      // Mulberry32 pseudo-random number generator for consistency
      const mulberry32 = (a: number) => {
        return () => {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
      }
      
      const deterministicRandom = mulberry32(seed);
      const rand = (min: number, max: number) => Math.floor(deterministicRandom() * (max - min + 1)) + min;
      
      const recentResults = Array.from({length: 7}, () => rand(10, 99)).join(', ');
      const jodi1 = rand(10,99);
      const jodi2 = rand(10,99);
      const jodi3 = rand(10,99);
      const communityGuess1 = rand(10,99);
      const communityGuess2 = rand(10,99);
      const expertOpen = rand(0,9);
      const expertClose = rand(0,9);
      const expertJodi = `${expertOpen}${expertClose}`;
      const expertPanna1 = `${rand(1,9)}${rand(0,9)}${rand(0,9)}`;
      const expertPanna2 = `${rand(1,9)}${rand(0,9)}${rand(0,9)}`;

      return `
        This is mocked content from ${url}.
        Recent Results: ${recentResults}.
        Jodi Patterns: ${jodi1}-${jodi1 % 10}${Math.floor(jodi1 / 10)}, ${jodi2}-${jodi2 % 10}${Math.floor(jodi2 / 10)}, ${jodi3}-${jodi3 % 10}${Math.floor(jodi3 / 10)}.
        Community Guess for today: ${communityGuess1} or ${communityGuess2}.
        Expert prediction: Open: ${expertOpen}, Close: ${expertClose}, Jodi: ${expertJodi}, Panna: ${expertPanna1}, ${expertPanna2}.
        The expert says the pattern is pointing towards a number ending in ${rand(0,9)}.
      `;
    } catch (e: any) {
      return `Error: Could not fetch URL. ${e.message}`;
    }
  }
);

const AnalyzeSattaPatternsInputSchema = z.object({
  gameName: z.string().describe('The name of the Satta game (e.g., Kalyan Matka).'),
});
export type AnalyzeSattaPatternsInput = z.infer<typeof AnalyzeSattaPatternsInputSchema>;

const AnalyzeSattaPatternsOutputSchema = z.object({
  gameName: z.string().describe('The name of the Satta game that was analyzed.'),
  analysisDate: z.string().describe('The date of the analysis in a readable format (e.g., June 12, 2024).'),
  analysisTime: z.string().describe('The time of the analysis in a readable format (e.g., 04:30 PM).'),
  summary: z.string().describe('A summary of identified patterns in the Satta data, incorporating insights from the fetched web content.'),
  frequencyAnalysis: z.string().describe('Analysis of number frequencies from the fetched data.'),
  missingNumbers: z.string().describe('Identified missing numbers in recent results from the fetched data.'),
  hotAndColdNumbers: z.string().describe('Identification of hot and cold numbers from the fetched data.'),
  jodiAnalysis: z.string().describe('Analysis of Jodi (pair) patterns from the fetched data.'),
  forumAnalysis: z.string().describe('Analysis of community guesses and discussions from the fetched websites.'),
  finalAnalysis: z.object({
    open: z.string().describe('The predicted open number(s).'),
    jodi: z.string().describe('The predicted jodi number(s).'),
    close: z.string().describe('The predicted close number(s).'),
    panna: z.string().describe('The predicted panna number(s).'),
  }).describe('The final predicted numbers based on the complete analysis.'),
});
export type AnalyzeSattaPatternsOutput = z.infer<typeof AnalyzeSattaPatternsOutputSchema>;

export async function analyzeSattaPatterns(input: AnalyzeSattaPatternsInput): Promise<AnalyzeSattaPatternsOutput> {
  return analyzeSattaPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSattaPatternsPrompt',
  input: {schema: z.any()}, // Input is dynamic now
  output: {schema: AnalyzeSattaPatternsOutputSchema},
  tools: [getWebsiteContentTool],
  prompt: `You are an expert Satta pattern analyst.

  Your goal is to analyze the automatically fetched historical data and community discussions for the game: {{{gameName}}}.

  The content from several websites has been fetched for you using the 'getWebsiteContent' tool. This content is provided below.

  From all the provided website content, you must perform a comprehensive analysis and identify potential patterns, including:
  - Frequency of numbers
  - Missing numbers in recent results
  - Hot and cold numbers
  - Jodi (pair) patterns
  - Community discussions, predictions, and popular guesses.
  
  After your analysis, provide a final prediction, breaking it down into separate "open", "jodi", "close", and "panna" numbers in the 'finalAnalysis' field.

  Fill in the gameName and analysisDate fields with the provided values. You should also populate the analysisTime field with the current time.

  Present all insights in a clear, understandable format, filling out all fields of the output schema.

  Game Name: {{{gameName}}}
  Analysis Date: {{{analysisDate}}}

  Website Content:
  {{{webContent}}}
`,
});


const analyzeSattaPatternsFlow = ai.defineFlow(
  {
    name: 'analyzeSattaPatternsFlow',
    inputSchema: AnalyzeSattaPatternsInputSchema,
    outputSchema: AnalyzeSattaPatternsOutputSchema,
    tools: [searchGoogleTool, getWebsiteContentTool]
  },
  async (input) => {
    // 1. Search Google for relevant websites
    const searchResponse = await searchGoogleTool({query: `${input.gameName} historical results`});

    // 2. Fetch content from each website found
    const webContentPromises = searchResponse.results.map(result => getWebsiteContentTool({ url: result.url }));
    const webContents = await Promise.all(webContentPromises);
    const combinedWebContent = webContents.join('\n\n---\n\n');

    // 3. Get current date. The time is removed to ensure consistency.
    const now = new Date();
    const analysisDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // 4. Call the prompt with the fetched content
    const {output} = await prompt({
        gameName: input.gameName,
        webContent: combinedWebContent,
        analysisDate: analysisDate,
        analysisTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    });
    return output!;
  }
);
