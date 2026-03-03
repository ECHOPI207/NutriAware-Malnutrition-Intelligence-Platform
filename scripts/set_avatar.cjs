const admin = require('firebase-admin');

const serviceAccount = require('../admin-sdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function main() {
    try {
        const db = admin.firestore();
        const userId = 'KgWSjLeohIgXxBoQbZ68YvX3q3F2'; // Found previously for Shahd
        const publicUrl = `https://nutriaware.info/avatars/shahd_avatar.jpg`;

        console.log("Updating User Auth...");
        await admin.auth().updateUser(userId, {
            photoURL: publicUrl
        });

        console.log("Updating User Firestore...");
        await db.collection('users').doc(userId).update({
            photoURL: publicUrl
        });

        console.log("Success! Avatar URL updated to", publicUrl);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main();
