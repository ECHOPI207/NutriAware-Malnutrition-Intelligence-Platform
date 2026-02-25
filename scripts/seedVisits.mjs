/**
 * Seed 30 days of historical daily visit data in Firestore.
 * Matches the volume of the realistic survey seeder.
 * Run: node scripts/seedVisits.mjs
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read exactly what's used by the app
const serviceAccountPath = path.resolve(__dirname, '../admin-sdk.json');
let firebaseConfig;

if (fs.existsSync(serviceAccountPath)) {
    // If Admin SDK exists, we technically should use admin, but for client SDK test:
    console.log('Found admin-sdk.json but this script uses client SDK. Continuing with defaults...');
}

// Fallback to exactly the known client config from the project
firebaseConfig = {
    apiKey: "AIzaSyDi7Ma0He40TVqg6LnbxCwVQIMlnlA_QOk",
    authDomain: "nutriaware-platform-736b1.firebaseapp.com",
    projectId: "nutriaware-platform-736b1",
    storageBucket: "nutriaware-platform-736b1.firebasestorage.app",
    messagingSenderId: "409096977910",
    appId: "1:409096977910:web:1b56bbb7d3880596601bd7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate last 30 days
function getLast30Days() {
    const days = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        days.push(key);
    }
    return days;
}

// Location distribution (realistic for Arabic health platform)
const LOCATIONS = [
    { name: "Cairo, Egypt", weight: 0.40 },
    { name: "Alexandria, Egypt", weight: 0.15 },
    { name: "Giza, Egypt", weight: 0.10 },
    { name: "Riyadh, Saudi Arabia", weight: 0.10 },
    { name: "Mansoura, Egypt", weight: 0.08 },
    { name: "Jeddah, Saudi Arabia", weight: 0.07 },
    { name: "Amman, Jordan", weight: 0.05 },
    { name: "Dubai, United Arab Emirates", weight: 0.05 },
];

function distributeLocations(totalCount) {
    const result = {};
    for (let i = 0; i < totalCount; i++) {
        // Weighted random choice
        let sum = LOCATIONS.reduce((a, b) => a + b.weight, 0);
        let rand = Math.random() * sum;
        let selectedLoc = LOCATIONS[0].name;
        for (let loc of LOCATIONS) {
            rand -= loc.weight;
            if (rand <= 0) {
                selectedLoc = loc.name;
                break;
            }
        }
        result[selectedLoc] = (result[selectedLoc] || 0) + 1;
    }
    return result;
}

async function seedVisits() {
    const days = getLast30Days();
    console.log("🌱 Seeding 30 days of high-volume visit data with rich geography...\n");

    for (let i = 0; i < days.length; i++) {
        const dateKey = days[i];

        // Generate a random daily visit count between 20 and 120 (with a spike today)
        let count = Math.floor(Math.random() * 100) + 20;
        if (i === days.length - 1) count = 150; // Spike today

        const locations = distributeLocations(count);

        try {
            await setDoc(doc(db, 'daily_visits', dateKey), {
                count,
                date: dateKey,
                lastUpdated: Timestamp.now(),
                locations,
            });
            const locStr = Object.entries(locations).map(([k, v]) => `${k}:${v}`).join(', ');
            console.log(`✅ ${dateKey} → ${count} visits (${locStr})`);
        } catch (err) {
            console.error(`❌ ${dateKey}: ${err.message}`);
        }
    }

    console.log("\n🎉 Done! 30 days of high-volume geo-distributed traffic seeded.");
    process.exit(0);
}

seedVisits();
