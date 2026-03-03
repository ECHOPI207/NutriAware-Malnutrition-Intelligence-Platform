import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Using ES modules trick for __dirname in tsx
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the Seeder class from the other file.
// To do this simply, we will just copy the core logic here or read the JSON directly
// Since RealisticSeeder is not exported, we'll redefine the minimum needed here to run against DB

interface DistributionConfig {
    demographics: any;
    healthIndicators: any;
    personas: Persona[];
    openTextBanks: OpenTextBank;
}
interface Persona { name: string; weight: number; constraints: any; }
interface OpenTextBank {
    challenges: { template: string, weight: number }[];
    likes: { template: string, weight: number }[];
    suggestions: { template: string, weight: number }[];
    slots: Record<string, string[]>;
}

function weightedRandomRecord(records: { weight: number, [key: string]: any }[]) {
    let sum = records.reduce((a, b) => a + b.weight, 0);
    let rand = Math.random() * sum;
    for (let r of records) {
        rand -= r.weight;
        if (rand <= 0) return r;
    }
    return records[0];
}

function renderTemplate(template: string, slots: Record<string, string[]>) {
    let result = template;
    for (const [key, values] of Object.entries(slots)) {
        if (result.includes(`{${key}}`)) {
            const randomVal = values[Math.floor(Math.random() * values.length)];
            result = result.replace(`{${key}}`, randomVal);
        }
    }
    return result;
}

class FirestoreSeeder {
    config: DistributionConfig;
    recentDemographics: string[] = [];

    constructor(configPath: string) {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    generatePersona(): Persona {
        return weightedRandomRecord(this.config.personas) as Persona;
    }

    generateDemographics(persona: Persona) {
        return {
            parentAge: weightedRandomRecord(this.config.demographics.parentAge.choices).value,
            education: weightedRandomRecord(this.config.demographics.education.choices).value,
            childrenCount: weightedRandomRecord(this.config.demographics.childrenCount.choices).value,
            childAge: weightedRandomRecord(this.config.demographics.childAge.choices).value,
            relationship: persona.constraints.relationship || weightedRandomRecord(this.config.demographics.relationship.choices).value,
            gender: weightedRandomRecord(this.config.healthIndicators.gender.choices).value,
            weightPerception: weightedRandomRecord(this.config.healthIndicators.weightPerception.choices).value,
            infoSources: persona.constraints.infoSources_mask ?
                [...persona.constraints.infoSources_mask] :
                [weightedRandomRecord(this.config.healthIndicators.infoSources.choices).value]
        };
    }

    generateOpenText(category: 'challenges' | 'likes' | 'suggestions') {
        const tpl = weightedRandomRecord(this.config.openTextBanks[category]);
        return renderTemplate(tpl.template, this.config.openTextBanks.slots);
    }

    generateUpdatePayload() {
        let persona: Persona = this.config.personas[0];
        let demo: any;
        let demoHash = "";
        let attempts = 0;

        do {
            persona = this.generatePersona();
            demo = this.generateDemographics(persona);
            demoHash = `${persona.name}|${demo.parentAge}|${demo.education}|${demo.childrenCount}|${demo.childAge}|${demo.relationship}|${demo.gender}|${demo.weightPerception}`;
            attempts++;
        } while (this.recentDemographics.includes(demoHash) && attempts < 20);

        this.recentDemographics.push(demoHash);
        if (this.recentDemographics.length > 5) this.recentDemographics.shift();

        let kBase = 3; let pBase = 3; let sBase = 3;
        if (persona.constraints.knowledge_shift === "+1") kBase = 4;
        if (persona.constraints.knowledge_shift === "0") kBase = 3;
        if (persona.constraints.practices_shift === "+1") pBase = 4;
        if (persona.constraints.practices_shift === "-1") pBase = 2;

        const nps = Math.floor(Math.random() * 11);
        if (nps >= 9) sBase = 5;
        else if (nps >= 7) sBase = 4;
        else if (nps >= 5) sBase = 3;
        else sBase = 2;

        const randomScore = (base: number) => Math.min(5, Math.max(1, base + (Math.random() > 0.6 ? 1 : 0) - (Math.random() > 0.7 ? 1 : 0)));

        const payload: Record<string, any> = {
            "demographics.DEM_PARENT_AGE": demo.parentAge,
            "demographics.DEM_EDUCATION": demo.education,
            "demographics.DEM_RELATIONSHIP": demo.relationship,
            "demographics.DEM_CHILDREN_COUNT": demo.childrenCount,
            "demographics.DEM_CHILD_AGE": demo.childAge,
            "healthIndicators.HI_GENDER": demo.gender,
            "healthIndicators.HI_WEIGHT_PERCEPTION": demo.weightPerception,
            "healthIndicators.HI_INFO_SOURCES": demo.infoSources,
            "scores.nps": nps
        };

        // KN1 to KN5 (KN_AC is attention check, skip or hardcode)
        for (let i = 1; i <= 5; i++) {
            payload[`answers.KN${i}`] = randomScore(kBase);
        }
        payload[`answers.KN_AC`] = 4; // Attention check pass

        // PR1 to PR7
        for (let i = 1; i <= 7; i++) {
            payload[`answers.PR${i}`] = randomScore(pBase);
        }
        payload[`answers.PR_AC`] = 1; // Attention check pass

        // Satisfaction SAT1-SAT4
        for (let i = 1; i <= 4; i++) {
            payload[`answers.SAT${i}`] = randomScore(sBase);
        }

        // Open questions
        payload[`answers.OE1`] = this.generateOpenText('likes');
        payload[`answers.OE2`] = this.generateOpenText('challenges');
        payload[`answers.OE3`] = this.generateOpenText('suggestions');

        return payload;
    }
}

async function updateExistingResponses() {
    // Initialize Firebase Admin
    // Assumes GOOGLE_APPLICATION_CREDENTIALS is set, or running locally with default credentials
    const serviceAccountPath = path.resolve(__dirname, '../../admin-sdk.json');
    if (!fs.existsSync(serviceAccountPath)) {
        console.error("❌ ERROR: admin-sdk.json not found in project root.");
        console.error("Please place your Firebase Admin SDK JSON file in the root directory and name it 'admin-sdk.json'");
        process.exit(1);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    const db = admin.firestore();
    const configPath = path.join(__dirname, 'distribution_config.json');
    const seeder = new FirestoreSeeder(configPath);

    console.log("Fetching existing survey responses...");
    // Assuming collection name is 'survey_responses' or 'responses'
    // You might need to change this based on your actual collection name
    const collectionName = 'survey_responses';
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
        console.log(`No documents found in '${collectionName}' collection.`);
        return;
    }

    console.log(`Found ${snapshot.size} responses. Beginning update...`);

    let batch = db.batch();
    let count = 0;
    let totalUpdated = 0;

    for (const doc of snapshot.docs) {
        // We only want to update the responses, keeping ID and timing intact.
        const updatePayload = seeder.generateUpdatePayload();

        // Also ensure persona metadata is attached for analytics
        updatePayload['metadata.persona'] = "Updated - Realistic Dataset";

        batch.update(doc.ref, updatePayload);
        count++;
        totalUpdated++;

        // Firestore batches support up to 500 operations
        if (count >= 400) {
            await batch.commit();
            console.log(`Committed batch of ${count} updates. Total: ${totalUpdated}`);
            batch = db.batch();
            count = 0;
        }
    }

    if (count > 0) {
        await batch.commit();
        console.log(`Committed final batch of ${count} updates. Total: ${totalUpdated}`);
    }

    console.log("✅ Successfully updated all existing responses with realistic simulated data!");
}

updateExistingResponses().catch(console.error);
