'use server';
/**
 * @fileOverview A Genkit flow for generating multiple professional bio options based on user goals and achievements.
 *
 * - generateProfessionalBio - A function that handles the bio generation process.
 * - GenerateProfessionalBioInput - The input type for the generateProfessionalBio function.
 * - GenerateProfessionalBioOutput - The return type for the generateProfessionalBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfessionalBioInputSchema = z.object({
  professionalGoals: z
    .string()
    .describe('The professional goals of the user.'),
  achievements: z
    .string()
    .describe('Key professional achievements of the user.'),
});
export type GenerateProfessionalBioInput = z.infer<
  typeof GenerateProfessionalBioInputSchema
>;

const GenerateProfessionalBioOutputSchema = z.object({
  bios: z.array(z.string()).describe('An array of generated professional bios.'),
});
export type GenerateProfessionalBioOutput = z.infer<
  typeof GenerateProfessionalBioOutputSchema
>;

export async function generateProfessionalBio(
  input: GenerateProfessionalBioInput
): Promise<GenerateProfessionalBioOutput> {
  return generateProfessionalBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalBioPrompt',
  input: {schema: GenerateProfessionalBioInputSchema},
  output: {schema: GenerateProfessionalBioOutputSchema},
  prompt: `You are an expert professional bio writer. Your task is to craft multiple, high-impact professional bio options based on the provided goals and achievements.

Generate at least three distinct bio options. Each bio should be concise, compelling, and tailored for a professional networking or profile context, such as a LinkedIn summary or an online portfolio.

Focus on highlighting the user's strengths, aspirations, and past successes in a way that captures attention and conveys their unique value proposition.

Professional Goals: {{{professionalGoals}}}
Achievements: {{{achievements}}}

Make sure the output is a JSON object with a single key 'bios' which is an array of strings. Each string in the array should be a professional bio.`,
});

const generateProfessionalBioFlow = ai.defineFlow(
  {
    name: 'generateProfessionalBioFlow',
    inputSchema: GenerateProfessionalBioInputSchema,
    outputSchema: GenerateProfessionalBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
