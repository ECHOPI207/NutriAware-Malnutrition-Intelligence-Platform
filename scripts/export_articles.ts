/**
 * Export intervention articles to JSON and Markdown preview formats.
 * Run: npx tsx scripts/export_articles.ts
 */
import { axis1Articles } from '../src/data/articles/axis1.js';
import { axis2Articles } from '../src/data/articles/axis2.js';
import { axis3Articles } from '../src/data/articles/axis3.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AXES = [
    { id: 1, title_ar: 'سلامة الغذاء', title_en: 'Food Safety', week_range: '1-2', article_count: 5 },
    { id: 2, title_ar: 'التغذية المتوازنة والمغذيات الكبرى', title_en: 'Balanced Nutrition & Macronutrients', week_range: '3-4', article_count: 5 },
    { id: 3, title_ar: 'المغذيات الدقيقة والتنوع الغذائي', title_en: 'Micronutrients & Dietary Diversity', week_range: '5-6', article_count: 8 },
];

const allArticles = [...axis1Articles, ...axis2Articles, ...axis3Articles];
const docsDir = path.join(__dirname, '..', 'docs');

// ── JSON Export ────────────────────────────────────────────────
const jsonData = {
    version: '1.0',
    generated: new Date().toISOString(),
    total_articles: allArticles.length,
    axes: AXES,
    articles: allArticles,
};

fs.writeFileSync(
    path.join(docsDir, 'intervention_articles.json'),
    JSON.stringify(jsonData, null, 2),
    'utf-8'
);
console.log(`✅ JSON export: docs/intervention_articles.json (${allArticles.length} articles)`);

// ── Markdown Preview ───────────────────────────────────────────
let md = `# NutriAware Learning Path — Articles Preview\n\n`;
md += `> Generated: ${new Date().toISOString()}\n`;
md += `> Total Articles: ${allArticles.length} | Axes: ${AXES.length} | Weeks: 6\n\n`;
md += `---\n\n`;

for (const axis of AXES) {
    md += `## المحور ${axis.id}: ${axis.title_ar} / ${axis.title_en}\n`;
    md += `> الأسبوع ${axis.week_range} — ${axis.article_count} مقالات\n\n`;

    const axisArticles = allArticles.filter(a => a.axis === axis.id);
    for (const article of axisArticles) {
        md += `### ${article.id}. ${article.title_ar}\n`;
        md += `**${article.title_en}**\n\n`;
        md += `- **Slug (AR):** \`${article.slug_ar}\`\n`;
        md += `- **Slug (EN):** \`${article.slug_en}\`\n`;
        md += `- **Reading Time:** ${article.meta.reading_time_minutes} min\n`;
        md += `- **Week:** ${article.week_range}\n\n`;

        md += `**ملخص سريع / Quick Summary:**\n`;
        article.quick_summary_ar.forEach((s: string, i: number) => { md += `${i + 1}. ${s}\n`; });
        md += `\n`;
        article.quick_summary_en.forEach((s: string, i: number) => { md += `${i + 1}. ${s}\n`; });
        md += `\n`;

        md += `**Tags (AR):** ${article.tags_ar.join(', ')}\n`;
        md += `**Tags (EN):** ${article.tags_en.join(', ')}\n\n`;

        md += `**SEO:**\n`;
        md += `- Meta Title (AR): ${article.meta.meta_title_ar}\n`;
        md += `- Meta Title (EN): ${article.meta.meta_title_en}\n`;
        md += `- Meta Desc (AR): ${article.meta.meta_description_ar}\n`;
        md += `- Meta Desc (EN): ${article.meta.meta_description_en}\n\n`;

        md += `**المصادر / Sources:**\n`;
        article.sources_ar.forEach((s: string) => { md += `- ${s}\n`; });
        md += `\n---\n\n`;
    }
}

fs.writeFileSync(
    path.join(docsDir, 'articles_preview.md'),
    md,
    'utf-8'
);
console.log(`✅ Markdown preview: docs/articles_preview.md`);
console.log(`\nDone! Both files saved to docs/`);
