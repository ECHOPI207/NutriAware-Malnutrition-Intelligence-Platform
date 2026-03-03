/**
 * NutriAware Realistic Seeder
 * محرك التوليد الواقعي لبيانات الاستبيان
 * 
 * Features:
 * - Weighted categorical distributions (e.g., Education)
 * - Persona-based correlated generation
 * - Open-text template rotation (banks/slots)
 * - Valid numeric ranges matching survey config
 */

import * as fs from 'fs';
import * as path from 'path';

// --- Types ---
interface DistributionConfig {
    demographics: any;
    healthIndicators: any;
    personas: Persona[];
    openTextBanks: OpenTextBank;
}

interface Persona {
    name: string;
    weight: number;
    constraints: any;
}

interface OpenTextBank {
    challenges: { template: string, weight: number }[];
    likes: { template: string, weight: number }[];
    suggestions: { template: string, weight: number }[];
    slots: Record<string, string[]>;
}

// --- Helper Functions ---
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

// --- Main Seeder Class ---
class RealisticSeeder {
    config: DistributionConfig;

    constructor(configPath: string) {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    generatePersona(): Persona {
        return weightedRandomRecord(this.config.personas) as Persona;
    }

    generateDemographics(persona: Persona) {
        const demo = {
            parentAge: weightedRandomRecord(this.config.demographics.parentAge.choices).value,
            education: weightedRandomRecord(this.config.demographics.education.choices).value,
            childrenCount: weightedRandomRecord(this.config.demographics.childrenCount.choices).value,
            childAge: weightedRandomRecord(this.config.demographics.childAge.choices).value,
            relationship: persona.constraints.relationship || weightedRandomRecord(this.config.demographics.relationship.choices).value,
            gender: weightedRandomRecord(this.config.healthIndicators.gender.choices).value,
            weightPerception: weightedRandomRecord(this.config.healthIndicators.weightPerception.choices).value,
            infoSources: persona.constraints.infoSources_mask ?
                persona.constraints.infoSources_mask.join(', ') :
                weightedRandomRecord(this.config.healthIndicators.infoSources.choices).value
        };
        return demo;
    }

    generateOpenText(category: 'challenges' | 'likes' | 'suggestions') {
        const tpl = weightedRandomRecord(this.config.openTextBanks[category]);
        return renderTemplate(tpl.template, this.config.openTextBanks.slots);
    }

    recentDemographics: string[] = [];

    generateResponse(id: string) {
        let persona: Persona = this.config.personas[0];
        let demo: any;
        let demoHash = "";
        let attempts = 0;

        // Anti-repetition: Ensure we don't generate the exact same profile back-to-back
        do {
            persona = this.generatePersona();
            demo = this.generateDemographics(persona);
            demoHash = `${persona.name}|${demo.parentAge}|${demo.education}|${demo.childrenCount}|${demo.childAge}|${demo.relationship}|${demo.gender}|${demo.weightPerception}|${demo.infoSources}`;
            attempts++;
        } while (this.recentDemographics.includes(demoHash) && attempts < 20);

        this.recentDemographics.push(demoHash);
        if (this.recentDemographics.length > 5) this.recentDemographics.shift(); // Keep last 5 uniqueness history

        // Correlated shift for Likert scales based on persona
        let kBase = 3; let pBase = 3; let sBase = 3;
        if (persona.constraints.knowledge_shift === "+1") kBase = 4;
        if (persona.constraints.knowledge_shift === "0") kBase = 3;
        if (persona.constraints.practices_shift === "+1") pBase = 4;
        if (persona.constraints.practices_shift === "-1") pBase = 2;

        // NPS and satisfaction
        const nps = Math.floor(Math.random() * 11);
        if (nps >= 9) sBase = 5;
        else if (nps >= 7) sBase = 4;
        else if (nps >= 5) sBase = 3;
        else sBase = 2;

        // Ensure within 1-5 bounds with individual variance
        const randomScore = (base: number) => Math.min(5, Math.max(1, base + (Math.random() > 0.6 ? 1 : 0) - (Math.random() > 0.7 ? 1 : 0)));

        const response: Record<string, any> = {
            respondentId: id,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            persona: persona.name,
            demo_parentAge: demo.parentAge,
            demo_education: demo.education,
            demo_relationship: demo.relationship,
            demo_childrenCount: demo.childrenCount,
            demo_childAge: demo.childAge,
            health_gender: demo.gender,
            health_weightPerception: demo.weightPerception,
            health_infoSources: demo.infoSources,
            nps_score: nps,
        };

        // Generate individual knowledge scores (1 to 7)
        for (let i = 1; i <= 7; i++) {
            response[`knowledge_${i}`] = randomScore(kBase);
        }

        // Generate individual practices scores (1 to 8)
        for (let i = 1; i <= 8; i++) {
            response[`practices_${i}`] = randomScore(pBase);
        }

        // Generate individual satisfaction scores (1 to 5)
        for (let i = 1; i <= 5; i++) {
            response[`satisfaction_${i}`] = randomScore(sBase);
        }

        // Retrospectives
        response['retro_know_1'] = randomScore(kBase > 2 ? kBase - 1 : 2);
        response['retro_prac_1'] = randomScore(pBase > 2 ? pBase - 1 : 2);

        // Open text
        response['open_challenges'] = this.generateOpenText('challenges');
        response['open_likes'] = this.generateOpenText('likes');
        response['open_suggestions'] = this.generateOpenText('suggestions');

        return response;
    }

    generateBatch(count: number, outputPath: string) {
        console.log(`🚀 Generating ${count} realistic export-compatible responses...`);

        // Generate headers dynamically
        const sampleKeys = Object.keys(this.generateResponse('sample'));
        const header = sampleKeys.join(',') + '\n';
        fs.writeFileSync(outputPath, header);

        for (let i = 1; i <= count; i++) {
            // Generate ID similar to Firebase (e.g. N7zYuCtZi...)
            const randomId = Array.from({ length: 20 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

            const res = this.generateResponse(randomId);

            // Re-format timestamp to exactly match the user's screenshot format (e.g., 2026-02-23T10:57:21.670Z)
            res.timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

            // Map values carefully, quoting strings
            const rowValues = sampleKeys.map(key => {
                const val = res[key];
                if (typeof val === 'string' && (val.includes(',') || val.includes('\n') || val.includes(' '))) {
                    return `"${val}"`;
                }
                return val;
            });
            fs.appendFileSync(outputPath, rowValues.join(',') + '\n');
            if (i % 1000 === 0) console.log(`  - Generated ${i} rows`);
        }
        console.log(`✅ Finished generating ${count} rows at ${outputPath}`);
    }
}

// Script execution
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv[1] === __filename) {
    const configPath = path.join(__dirname, 'distribution_config.json');
    const seeder = new RealisticSeeder(configPath);
    // Generate a substantial batch for the user to upload
    const outputCsv = path.join(__dirname, 'realistic_seeded_data_for_upload.csv');
    seeder.generateBatch(500, outputCsv);
    console.log(`\n🎉 Data ready for upload: ${outputCsv}`);
}
