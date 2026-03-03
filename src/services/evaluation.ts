import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface EvaluationData {
  consent: boolean;
  demographics: Record<string, any>;
  healthIndicators: Record<string, any>;
  knowledge: Record<string, string>;
  practices: Record<string, string>;
  intervention: {
    stories: Record<string, string>;
    platform: {
      usability: Record<string, string>;
      content: Record<string, string>;
      tools: Record<string, string>;
      consultation: Record<string, string>;
    };
  };
  satisfaction: Record<string, string>;
  behavioralIntent: Record<string, string>;
  nps?: string;
  retrospective: {
    knowledge: { before: string; after: string };
    practices: { before: string; after: string };
    [key: string]: { before: string; after: string };
  };
  openQuestions: Record<string, string>;
  _schemaVersion?: number;
}

export const saveEvaluation = async (data: EvaluationData) => {
  try {
    const docRef = await addDoc(collection(db, "project_evaluations"), {
      ...data,
      createdAt: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving evaluation:", error);
    throw error;
  }
};
