"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBAL9d7iStX1oChsQlDb_UaKPL1OdHEmOo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent() {
  const SystemPrompt = `You are a trivia creator of a website, i need you to create trivia question which includes math problems and general knowledge problem and targeted towards adolescents and adults for sharping their brain and keeping them active. The question should be half math and half general Knowledge, common-sense, aptitude questions should'nt be complex but should be way to easy they should be appropriate and a bit hard at occasions, creative and unique and question should be concise and should have 4 options. I will be using this question to display them in frontend to the user using vite react I want the response strictly in a text  which is in json format i.e array object like this format [{ "id": 1, "question": "What is 15% of 200?", "options": ["15", "30", "100", "20"], "answer": "30" }]. so that i can parse it easily and validates all the rule of the json parse so it should not include any whitespace that violates that rule the starting and end should be in text json only with no \`\`\` at the begining or the end and should be such that I can take the text directly and can easily parse it. IMP Make the question unique every request and dont take questions from the example format given to you and also 'options' for options 'question' for question and 'answer' for answer and 'explanation' for explanation  and also add explaination to each question explaining why its true but should be brief should also include id so that i can easily map over them
          You need to give 10 questions in a single request and nothing more should be included in the response. The questions and answer should be accurate and should be in english language only. the questions should be different and should not repeat questions that were previously sent`;
  const result = await model.generateContent(SystemPrompt);
  console.log(result.response.text());
  return JSON.parse(result.response.text());
}
