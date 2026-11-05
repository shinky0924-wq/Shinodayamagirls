/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Locked exclusively to shinodayamashinchi as required by project specification
export const FIRESTORE_DATABASE_ID = 'shinodayamashinchi';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore strictly targeting the shinodayamashinchi database
export const db: Firestore = getFirestore(app, FIRESTORE_DATABASE_ID);
export const auth: Auth = getAuth(app);

/**
 * Validates connection to the shinodayamashinchi Firestore database on app boot
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'system', 'connectivity'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firestore] Client is offline or initializing.');
      return false;
    }
    // Success even if doc does not exist
    return true;
  }
}

/**
 * Submits an applicant inquiry to the consultations collection in Firestore
 */
export async function submitConsultation(data: {
  name: string;
  contact: string;
  age?: string;
  message?: string;
  source?: string;
}) {
  try {
    const consultationsRef = collection(db, 'consultations');
    const docRef = await addDoc(consultationsRef, {
      name: data.name || '匿名希望',
      contact: data.contact,
      age: data.age || '未回答',
      message: data.message || '',
      source: data.source || 'web_form',
      status: 'unread',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error('[Firestore] Failed to save consultation:', err);
    return { success: false, error: err };
  }
}

export default { db, auth, FIRESTORE_DATABASE_ID };
