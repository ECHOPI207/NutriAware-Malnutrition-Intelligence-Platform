import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load service account key
const serviceAccountPath = resolve('./admin-sdk.json');

if (!existsSync(serviceAccountPath)) {
    console.error("No admin-sdk.json found. Make sure you place your Firebase service account key in the project root as admin-sdk.json.");
    process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateRoles() {
    console.log('Starting migration to change "doctor" role to "nutritionist"...');

    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('role', '==', 'doctor').get();

        if (snapshot.empty) {
            console.log('No users found with the role "doctor".');
            return;
        }

        console.log(`Found ${snapshot.size} users with role "doctor". Migrating...`);

        let count = 0;
        const batch = db.batch();

        snapshot.forEach((doc) => {
            // Set the new role
            batch.update(doc.ref, {
                role: 'nutritionist',
                updatedAt: new Date()
            });
            // Optionally create an audit log for each change
            const auditLogRef = db.collection('audit_logs').doc();
            batch.set(auditLogRef, {
                action: 'MIGRATE_USER_ROLE',
                actorId: 'system_migration',
                targetId: doc.id,
                targetType: 'user',
                details: 'System automatically migrated role from doctor to nutritionist as per compliance update.',
                timestamp: new Date()
            });

            count++;
        });

        await batch.commit();
        console.log(`Migration completed successfully. Migrated ${count} users.`);
    } catch (error) {
        console.error('Error migrating roles:', error);
    }
}

migrateRoles().then(() => process.exit(0)).catch(() => process.exit(1));
