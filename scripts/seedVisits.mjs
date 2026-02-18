/**
 * Seed 14 days of historical daily visit data in Firestore.
 * Run: node scripts/seedVisits.mjs
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDi7Ma0He40TVqg6LnbxCwVQIMlnlA_QOk",
    authDomain: "nutriaware-platform-736b1.firebaseapp.com",
    projectId: "nutriaware-platform-736b1",
    storageBucket: "nutriaware-platform-736b1.firebasestorage.app",
    messagingSenderId: "409096977910",
    appId: "1:409096977910:web:1b56bbb7d3880596601bd7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate last 14 days of data from today
function getLast14Days() {
    const days = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        days.push(key);
    }
    return days;
}

// Realistic daily counts (varies between 3-25, slightly trending up)
const DAILY_COUNTS = [5, 8, 12, 7, 15, 18, 10, 13, 20, 9, 16, 22, 14, 25];

// Location distribution (realistic for Arabic health platform)
const LOCATIONS = {
    "Cairo, Egypt": 0.35,
    "Riyadh, Saudi Arabia": 0.15,
    "Alexandria, Egypt": 0.12,
    "Jeddah, Saudi Arabia": 0.08,
    "Amman, Jordan": 0.07,
    "Dubai, United Arab Emirates": 0.06,
    "Mansoura, Egypt": 0.05,
    "Tanta, Egypt": 0.04,
    "Kuwait City, Kuwait": 0.04,
    "Doha, Qatar": 0.04,
};

function distributeLocations(totalCount) {
    const result = {};
    let remaining = totalCount;
    const entries = Object.entries(LOCATIONS);

    for (let i = 0; i < entries.length; i++) {
        const [city, ratio] = entries[i];
        if (i === entries.length - 1) {
            if (remaining > 0) result[city] = remaining;
        } else {
            const count = Math.max(1, Math.round(totalCount * ratio + (Math.random() - 0.5) * 2));
            const actual = Math.min(count, remaining);
            if (actual > 0) {
                result[city] = actual;
                remaining -= actual;
            }
        }
    }
    return result;
}

async function seedVisits() {
    const days = getLast14Days();
    console.log("🌱 Seeding 14 days of visit data...\n");

    for (let i = 0; i < days.length; i++) {
        const dateKey = days[i];
        const count = DAILY_COUNTS[i];
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

    console.log("\n🎉 Done! 14 days of visit data seeded.");
    process.exit(0);
}

seedVisits();
