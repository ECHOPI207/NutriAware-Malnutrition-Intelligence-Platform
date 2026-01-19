import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface EvaluationData {
  consent: boolean;
  demographics: {
    relationship: string;
    otherRelationship?: string;
    parentAge: string;
    education: string;
    childrenCount: string;
    childAge: string;
  };
  healthIndicators: {
    gender: string;
    weightPerception: string;
    healthIssues: string[];
    otherHealthIssue?: string;
    infoSources: string[];
    otherInfoSource?: string;
  };
  knowledge: Record<string, string>; // Values 1-5 as strings
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
  retrospective: {
    knowledge: { before: string; after: string };
    practices: { before: string; after: string };
  };
  openQuestions: {
    likedMost: string;
    challenges: string;
    suggestions: string;
  };
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
