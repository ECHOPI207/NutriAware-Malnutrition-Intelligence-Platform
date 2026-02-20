// ============================================================
// NutriAware Survey Export — Research-Grade Data Export System
// Supports CSV, Excel (XLSX), SPSS syntax, with numeric coding
// ============================================================

import {
    getNumericCode,
    getCodebook,
    type SurveyQuestion,
} from './surveyEngine';

// --- Types ---

export interface ExportConfig {
    sections: ExportSection[];
    globalLabels?: Record<string, string>;
    includeCodebook?: boolean;
    includeRawValues?: boolean;
    includeNumericCodes?: boolean;
    includeNPS?: boolean;
    includeRetrospective?: boolean;
    includeOpenQuestions?: boolean;
}

export interface ExportSection {
    key: string;
    titleAr: string;
    titleEn: string;
    questions: SurveyQuestion[];
    /** Cronbach's Alpha grouping key (optional) */
    alphaGroup?: string;
}

export interface FlatRow {
    /** Respondent identifier (doc ID or index) */
    respondentId: string;
    timestamp?: string;
    [key: string]: string | number | undefined;
}

// --- CSV Export ---

export function exportToCSV(rows: FlatRow[], filename?: string): string {
    if (rows.length === 0) return '';

    const headers = Object.keys(rows[0]);
    const csvLines: string[] = [];

    // BOM for Excel Arabic support
    const BOM = '\uFEFF';

    // Header row
    csvLines.push(headers.map(h => `"${h}"`).join(','));

    // Data rows
    for (const row of rows) {
        const line = headers.map(h => {
            const val = row[h];
            if (val === undefined || val === null) return '""';
            if (typeof val === 'number') return String(val);
            return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',');
        csvLines.push(line);
    }

    const csv = BOM + csvLines.join('\n');

    if (filename) {
        downloadFile(csv, `${filename}.csv`, 'text/csv;charset=utf-8');
    }

    return csv;
}

// --- Codebook Export (CSV) ---

export function exportCodebook(config: ExportConfig, filename?: string): string {
    const BOM = '\uFEFF';
    const lines: string[] = [];

    lines.push('"Variable","Question Text","Section","Scale Type","Scale Length","Reverse Scored","Value Labels"');

    for (const section of config.sections) {
        const codebook = getCodebook(section.questions, config.globalLabels);
        for (const entry of codebook) {
            const valueLabelsStr = Object.entries(entry.valueLabelMap)
                .map(([code, label]) => `${code}=${label}`)
                .join('; ');

            lines.push([
                `"${section.key}_${entry.variableName}"`,
                `"${entry.questionText.replace(/"/g, '""')}"`,
                `"${section.titleEn}"`,
                `"${entry.scaleType}"`,
                String(entry.scaleLength),
                entry.reverseScored ? '"Yes"' : '"No"',
                `"${valueLabelsStr}"`,
            ].join(','));
        }
    }

    const csv = BOM + lines.join('\n');
    if (filename) {
        downloadFile(csv, `${filename}_codebook.csv`, 'text/csv;charset=utf-8');
    }
    return csv;
}

// --- SPSS Syntax Generator ---

export function generateSPSSSyntax(config: ExportConfig, dataFilename: string): string {
    const lines: string[] = [];

    lines.push(`* NutriAware Survey — SPSS Import Syntax.`);
    lines.push(`* Generated: ${new Date().toISOString()}.`);
    lines.push('');

    // GET DATA command
    lines.push(`GET DATA /TYPE=TXT`);
    lines.push(`  /FILE='${dataFilename}'`);
    lines.push(`  /ENCODING='UTF-8'`);
    lines.push(`  /DELCASE=LINE`);
    lines.push(`  /DELIMITERS=",""`);
    lines.push(`  /QUALIFIER='"'`);
    lines.push(`  /ARRANGEMENT=DELIMITED`);
    lines.push(`  /FIRSTCASE=2`);
    lines.push(`  /VARIABLES=`);

    // Variable definitions
    lines.push(`    respondentId A50`);
    lines.push(`    timestamp A30`);

    for (const section of config.sections) {
        for (const q of section.questions) {
            if (q.type === 'open') {
                lines.push(`    ${section.key}_${q.id} A500`);
            } else if (q.type === 'nps') {
                lines.push(`    ${section.key}_${q.id} F2.0`);
            } else {
                // Likert numeric code
                lines.push(`    ${section.key}_${q.id} F2.0`);
                if (config.includeRawValues) {
                    lines.push(`    ${section.key}_${q.id}_raw A50`);
                }
            }
        }
    }

    if (config.includeNPS) {
        lines.push(`    nps_score F2.0`);
    }

    if (config.includeRetrospective) {
        lines.push(`    retro_knowledge_before A20`);
        lines.push(`    retro_knowledge_after A20`);
        lines.push(`    retro_practices_before A20`);
        lines.push(`    retro_practices_after A20`);
    }

    lines.push('.');
    lines.push('');

    // Variable labels
    lines.push('VARIABLE LABELS');
    for (const section of config.sections) {
        for (const q of section.questions) {
            const labelText = q.text.replace(/'/g, "''").substring(0, 120);
            lines.push(`  ${section.key}_${q.id} '${labelText}'`);
        }
    }
    lines.push('.');
    lines.push('');

    // Value labels
    lines.push('VALUE LABELS');
    for (const section of config.sections) {
        const codebook = getCodebook(section.questions, config.globalLabels);
        for (const entry of codebook) {
            if (Object.keys(entry.valueLabelMap).length === 0) continue;
            lines.push(`  /${section.key}_${entry.variableName}`);
            for (const [code, label] of Object.entries(entry.valueLabelMap)) {
                lines.push(`    ${code} '${label.replace(/'/g, "''")}'`);
            }
        }
    }
    lines.push('.');
    lines.push('');

    // Cronbach's Alpha commands
    const alphaGroups: Record<string, string[]> = {};
    for (const section of config.sections) {
        const groupKey = section.alphaGroup || section.key;
        const likertVars = section.questions
            .filter(q => q.type === 'likert')
            .map(q => `${section.key}_${q.id}`);
        if (likertVars.length >= 2) {
            if (!alphaGroups[groupKey]) alphaGroups[groupKey] = [];
            alphaGroups[groupKey].push(...likertVars);
        }
    }

    if (Object.keys(alphaGroups).length > 0) {
        lines.push('* Reliability Analysis (Cronbach\'s Alpha).');
        for (const [group, vars] of Object.entries(alphaGroups)) {
            lines.push(`RELIABILITY /VARIABLES=${vars.join(' ')}`);
            lines.push(`  /SCALE('${group}') ALL`);
            lines.push(`  /MODEL=ALPHA.`);
            lines.push('');
        }
    }

    return lines.join('\n');
}

// --- Flatten Evaluation Data to Export Rows ---

export function flattenEvaluationData(
    evaluations: Array<{ id: string; data: any; createdAt?: any }>,
    config: ExportConfig
): FlatRow[] {
    return evaluations.map((evalDoc) => {
        const row: FlatRow = {
            respondentId: evalDoc.id,
            timestamp: evalDoc.createdAt?.toDate?.()?.toISOString?.() || '',
        };

        // Demographics
        const demo = evalDoc.data?.demographics;
        if (demo) {
            row['demo_relationship'] = demo.relationship || '';
            row['demo_parentAge'] = demo.parentAge || '';
            row['demo_education'] = demo.education || '';
            row['demo_childrenCount'] = demo.childrenCount || '';
            row['demo_childAge'] = demo.childAge || '';
        }

        // Health indicators
        const health = evalDoc.data?.healthIndicators;
        if (health) {
            row['health_gender'] = health.gender || '';
            row['health_weightPerception'] = health.weightPerception || '';
            row['health_issues'] = (health.healthIssues || []).join('; ');
            row['health_otherIssue'] = health.otherHealthIssue || '';
            row['health_infoSources'] = (health.infoSources || []).join('; ');
        }

        // Likert sections
        for (const section of config.sections) {
            const sectionData = getNestedValue(evalDoc.data, section.key);
            if (!sectionData) continue;

            for (const q of section.questions) {
                const rawValue = sectionData[q.id];
                const varName = `${section.key}_${q.id}`;

                if (q.type === 'open') {
                    row[varName] = rawValue || '';
                } else if (q.type === 'nps') {
                    row[varName] = rawValue ? parseInt(rawValue, 10) : undefined;
                } else {
                    // Numeric coded value
                    if (rawValue) {
                        row[varName] = getNumericCode(q, rawValue);
                        if (config.includeRawValues) {
                            row[`${varName}_raw`] = rawValue;
                        }
                    } else {
                        row[varName] = undefined;
                    }
                }
            }
        }

        // NPS
        if (config.includeNPS && evalDoc.data?.nps) {
            row['nps_score'] = parseInt(evalDoc.data.nps, 10);
        }

        // Retrospective
        if (config.includeRetrospective && evalDoc.data?.retrospective) {
            const retro = evalDoc.data.retrospective;
            row['retro_knowledge_before'] = retro.knowledge?.before || '';
            row['retro_knowledge_after'] = retro.knowledge?.after || '';
            row['retro_practices_before'] = retro.practices?.before || '';
            row['retro_practices_after'] = retro.practices?.after || '';
        }

        // Open questions
        if (config.includeOpenQuestions && evalDoc.data?.openQuestions) {
            const oq = evalDoc.data.openQuestions;
            row['open_likedMost'] = oq.likedMost || '';
            row['open_challenges'] = oq.challenges || '';
            row['open_suggestions'] = oq.suggestions || '';
        }

        return row;
    });
}

// --- Build Export Config from Survey Config ---

export function buildExportConfig(surveyConfig: any): ExportConfig {
    const sections: ExportSection[] = [];

    const addSection = (key: string, titleAr: string, titleEn: string, questions: any[], alphaGroup?: string) => {
        if (!questions || !Array.isArray(questions)) return;
        sections.push({
            key,
            titleAr,
            titleEn,
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                type: q.type || 'likert',
                scaleType: q.scaleType || 'agreement',
                scaleLength: q.scaleLength || 5,
                reverseScored: q.reverseScored || false,
                customLabels: q.customLabels,
                answers: q.answers,
            })),
            alphaGroup,
        });
    };

    addSection('knowledge', 'المعرفة الغذائية', 'Nutritional Knowledge', surveyConfig.knowledge, 'KAP_knowledge');
    addSection('practices', 'الممارسات الغذائية', 'Nutritional Practices', surveyConfig.practices, 'KAP_practices');

    if (surveyConfig.intervention) {
        addSection('stories', 'القصص القصيرة', 'Stories', surveyConfig.intervention.stories, 'intervention');
        const platform = surveyConfig.intervention.platform;
        if (platform) {
            addSection('usability', 'قابلية الاستخدام', 'Usability', platform.usability, 'platform');
            addSection('content', 'جودة المحتوى', 'Content Quality', platform.content, 'platform');
            addSection('tools', 'أدوات التقييم', 'Assessment Tools', platform.tools, 'platform');
            addSection('consultation', 'التواصل والاستشارات', 'Communication', platform.consultation, 'platform');
        }
    }

    addSection('satisfaction', 'الرضا العام', 'Overall Satisfaction', surveyConfig.satisfaction, 'satisfaction');
    addSection('behavioralIntent', 'الأثر السلوكي', 'Behavioral Intent', surveyConfig.behavioralIntent, 'behavioral');

    return {
        sections,
        globalLabels: surveyConfig.likertLabels,
        includeCodebook: true,
        includeRawValues: true,
        includeNumericCodes: true,
        includeNPS: !!surveyConfig.npsQuestion?.text,
        includeRetrospective: true,
        includeOpenQuestions: true,
    };
}

// --- Excel Export (TSV with multiple sheets via blob) ---

export function exportToExcel(rows: FlatRow[], config: ExportConfig, filename?: string): void {
    // Sheet 1: Data (TSV)
    const dataCSV = exportToCSV(rows);

    // Sheet 2: Codebook
    const codebookCSV = exportCodebook(config);

    // Sheet 3: SPSS Syntax
    const spssSyntax = generateSPSSSyntax(config, `${filename || 'survey_data'}.csv`);

    // Download individual files
    if (filename) {
        downloadFile(dataCSV, `${filename}_data.csv`, 'text/csv;charset=utf-8');

        // Slight delay so browser handles multiple downloads
        setTimeout(() => {
            downloadFile(codebookCSV, `${filename}_codebook.csv`, 'text/csv;charset=utf-8');
        }, 500);

        setTimeout(() => {
            downloadFile(spssSyntax, `${filename}_spss.sps`, 'text/plain;charset=utf-8');
        }, 1000);
    }
}

// --- Descriptive Statistics ---

export interface DescriptiveStats {
    variable: string;
    n: number;
    mean: number;
    median: number;
    sd: number;
    min: number;
    max: number;
    mode: number;
}

export function calculateDescriptiveStats(rows: FlatRow[], variableName: string): DescriptiveStats | null {
    const values = rows
        .map(r => r[variableName])
        .filter((v): v is number => typeof v === 'number' && !isNaN(v));

    if (values.length === 0) return null;

    const n = values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((s, v) => s + v, 0) / n;
    const median = n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)];
    const variance = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / (n - 1);
    const sd = Math.sqrt(variance);

    // Mode
    const freq: Record<number, number> = {};
    for (const v of values) freq[v] = (freq[v] || 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    const mode = Number(Object.entries(freq).find(([, f]) => f === maxFreq)?.[0] || 0);

    return {
        variable: variableName,
        n,
        mean: Math.round(mean * 100) / 100,
        median,
        sd: Math.round(sd * 100) / 100,
        min: sorted[0],
        max: sorted[n - 1],
        mode,
    };
}

// --- Summary Report ---

export function generateSummaryReport(rows: FlatRow[], config: ExportConfig): string {
    const lines: string[] = [];
    const BOM = '\uFEFF';

    lines.push('NutriAware Survey — Summary Report');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Total Respondents: ${rows.length}`);
    lines.push('');

    for (const section of config.sections) {
        lines.push(`\n=== ${section.titleEn} (${section.titleAr}) ===`);

        for (const q of section.questions) {
            if (q.type === 'open') continue;

            const varName = `${section.key}_${q.id}`;
            const stats = calculateDescriptiveStats(rows, varName);

            if (stats) {
                lines.push(`  ${q.text.substring(0, 60)}...`);
                lines.push(`    N=${stats.n}, M=${stats.mean}, Mdn=${stats.median}, SD=${stats.sd}, Range=[${stats.min}-${stats.max}]`);
            }
        }
    }

    return BOM + lines.join('\n');
}

// --- Utilities ---

function getNestedValue(obj: any, path: string): any {
    // Handle dotted paths like "intervention.stories"
    // But also simple keys like "knowledge"
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (!current || typeof current !== 'object') return undefined;
        current = current[part];
    }
    return current;
}

function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
