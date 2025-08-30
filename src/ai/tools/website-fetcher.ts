'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const fetchWebsiteContent = ai.defineTool(
  {
    name: 'fetchWebsiteContent',
    description: 'Fetches the raw HTML content from a given URL. Useful for analyzing web pages.',
    inputSchema: z.string().url(),
    outputSchema: z.string(),
  },
  async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      return await response.text();
    } catch (error: any) {
      console.error("Error fetching website content:", error);
      throw new Error(`Could not fetch content from the URL: ${error.message}`);
    }
  }
);
