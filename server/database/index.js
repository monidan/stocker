const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const KEY = require('../../.config/firestore-cloud-key.json');

initializeApp({
    credential: cert(KEY)
})

const db = getFirestore();

module.exports = {
    db,
}