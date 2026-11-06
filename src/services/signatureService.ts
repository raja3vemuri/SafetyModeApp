import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, User } from '../firebase';
import { SignatureState } from '../types';

export interface SavedSignatureRecord {
  id: string;
  userId: string;
  title: string;
  template: string;
  personal: SignatureState['personal'];
  company: SignatureState['company'];
  style: SignatureState['style'];
  socials: SignatureState['socials'];
  spacingPreset: SignatureState['spacingPreset'];
  socialIconSize: number;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function saveUserProfile(user: User): Promise<void> {
  const userPath = `users/${user.uid}`;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous User',
        photoURL: user.photoURL || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

export async function saveSignatureToCloud(
  userId: string,
  title: string,
  state: SignatureState,
  existingId?: string
): Promise<SavedSignatureRecord> {
  const signatureId = existingId || `sig_${Date.now()}`;
  const docPath = `users/${userId}/signatures/${signatureId}`;

  const record: SavedSignatureRecord = {
    id: signatureId,
    userId,
    title: title.trim() || `${state.personal.firstName || 'My'} Signature`,
    template: state.template,
    personal: state.personal,
    company: state.company,
    style: state.style,
    socials: state.socials,
    spacingPreset: state.spacingPreset,
    socialIconSize: state.socialIconSize,
    isDefault: true,
    updatedAt: new Date().toISOString(),
  };

  try {
    const sigRef = doc(db, 'users', userId, 'signatures', signatureId);
    await setDoc(sigRef, record, { merge: true });
    return record;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function fetchUserSignatures(userId: string): Promise<SavedSignatureRecord[]> {
  const collectionPath = `users/${userId}/signatures`;
  try {
    const sigsRef = collection(db, 'users', userId, 'signatures');
    const snapshot = await getDocs(sigsRef);
    const records: SavedSignatureRecord[] = [];
    snapshot.forEach(docSnap => {
      records.push(docSnap.data() as SavedSignatureRecord);
    });
    return records;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

export async function deleteSignatureFromCloud(
  userId: string,
  signatureId: string
): Promise<void> {
  const docPath = `users/${userId}/signatures/${signatureId}`;
  try {
    const sigRef = doc(db, 'users', userId, 'signatures', signatureId);
    await deleteDoc(sigRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
