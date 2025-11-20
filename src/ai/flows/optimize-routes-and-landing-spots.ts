'use server';

/**
 * @fileOverview A Genkit flow that analyzes real-time weather data, identifies mission risks, and suggests alternative safe routes and landing spots for drone flights.
 *
 * - optimizeRoutesAndLandingSpots - A function that optimizes drone routes and landing spots based on weather data and mission risks.
 * - OptimizeRoutesAndLandingSpotsInput - The input type for the optimizeRoutesAndLandingSpots function.
 * - OptimizeRoutesAndLandingSpotsOutput - The return type for the optimizeRoutesAndLandingSpots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRoutesAndLandingSpotsInputSchema = z.object({
  missionDetails: z.string().describe('Details of the drone mission, including current route and landing spot.'),
  weatherData: z.string().describe('Real-time weather data for the mission area.'),
});
export type OptimizeRoutesAndLandingSpotsInput = z.infer<typeof OptimizeRoutesAndLandingSpotsInputSchema>;

const OptimizeRoutesAndLandingSpotsOutputSchema = z.object({
  safeRoute: z.string().describe('Suggested safe alternative route for the drone mission.'),
  safeLandingSpot: z.string().describe('Suggested safe alternative landing spot for the drone mission.'),
  riskAnalysis: z.string().describe('Analysis of potential risks associated with the mission based on weather data.'),
});
export type OptimizeRoutesAndLandingSpotsOutput = z.infer<typeof OptimizeRoutesAndLandingSpotsOutputSchema>;

export async function optimizeRoutesAndLandingSpots(
  input: OptimizeRoutesAndLandingSpotsInput
): Promise<OptimizeRoutesAndLandingSpotsOutput> {
  return optimizeRoutesAndLandingSpotsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutesAndLandingSpotsPrompt',
  input: {schema: OptimizeRoutesAndLandingSpotsInputSchema},
  output: {schema: OptimizeRoutesAndLandingSpotsOutputSchema},
  prompt: `You are an AI assistant specialized in optimizing drone flight routes and landing spots based on real-time weather data and mission details.

  Analyze the provided mission details and weather data to identify potential risks.
  Suggest a safe alternative route and landing spot, considering the weather conditions and potential hazards.

  Mission Details: {{{missionDetails}}}
  Weather Data: {{{weatherData}}}

  Respond with a risk analysis, a safe route, and a safe landing spot.
  Format the output in JSON according to the schema.`,
});

const optimizeRoutesAndLandingSpotsFlow = ai.defineFlow(
  {
    name: 'optimizeRoutesAndLandingSpotsFlow',
    inputSchema: OptimizeRoutesAndLandingSpotsInputSchema,
    outputSchema: OptimizeRoutesAndLandingSpotsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
