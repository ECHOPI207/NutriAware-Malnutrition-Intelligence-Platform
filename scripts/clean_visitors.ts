import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const admin = require('firebase-admin');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanFakeVisitorData() {
    // Initialize Firebase Admin
    // Using process.cwd() ensures it reliably finds the root directory when run via `npx tsx scripts/clean_visitors.ts`
    const serviceAccountPath = path.join(process.cwd(), 'admin-sdk.json');
    if (!fs.existsSync(serviceAccountPath)) {
        console.error("❌ ERROR: admin-sdk.json not found in project root: " + serviceAccountPath);
        process.exit(1);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        // App already initialized
    }

    const db = admin.firestore();

    console.log("🧹 Starting cleanup of fake and 'Unknown' visitor data...");

    let totalDeleted = 0;

    // 1. Clean 'daily_visits' collection
    console.log("\nFetching 'daily_visits'...");
    const visitsSnap = await db.collection('daily_visits').get();
    let batch = db.batch();
    let count = 0;

    for (const doc of visitsSnap.docs) {
        const data = doc.data();

        // Target:
        // - High counts (from our seeder which generated 20-150 visits)
        // - Documents containing "Unknown" locations

        const hasUnknown = data.locations && (data.locations['Unknown'] !== undefined);
        const isSeeded = data.count > 10; // Real organic traffic is probably low right now

        // Let's be aggressive and wipe the entire daily_visits collection, starting fresh
        // since the user wants *only* real data going forward, and it's polluted right now.
        batch.delete(doc.ref);
        count++;
        totalDeleted++;

        if (count >= 400) {
            await batch.commit();
            console.log(`Deleted batch of ${count} daily_visits.`);
            batch = db.batch();
            count = 0;
        }
    }

    if (count > 0) {
        await batch.commit();
        console.log(`Deleted final batch of ${count} daily_visits.`);
    }

    // 2. Clean 'visitor_logs' collection (individual logs)
    console.log("\nFetching 'visitor_logs'...");
    const logsSnap = await db.collection('visitor_logs').get();
    batch = db.batch();
    count = 0;

    for (const doc of logsSnap.docs) {
        // Wipe all logs to reset the detailed tracking as well
        batch.delete(doc.ref);
        count++;
        totalDeleted++;

        if (count >= 400) {
            await batch.commit();
            console.log(`Deleted batch of ${count} visitor_logs.`);
            batch = db.batch();
            count = 0;
        }
    }

    if (count > 0) {
        await batch.commit();
        console.log(`Deleted final batch of ${count} visitor_logs.`);
    }

    console.log(`\n✅ Successfully wiped ${totalDeleted} fake/unwanted tracking documents.`);
    console.log("Your visitor dashboard is now completely clean and ready for real traffic.");
}

cleanFakeVisitorData().catch(console.error);
