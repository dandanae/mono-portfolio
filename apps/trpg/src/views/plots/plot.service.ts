import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import { type ScenarioFormValues } from './plot.schema';

export const createPlot = async (plot: ScenarioFormValues) => {
  const docRef = await addDoc(collection(db, 'plots'), plot);
  return docRef.id;
};

export const updatePlot = async (id: string, plot: ScenarioFormValues) => {
  const docRef = doc(db, 'plots', id);
  await setDoc(docRef, plot);
};

export const getPlots = async (userId: string): Promise<(Omit<ScenarioFormValues, 'content'> & { id: string })[]> => {
  const plotsRef = collection(db, 'plots');
  const q = query(plotsRef, where('authorId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as ScenarioFormValues & { id: string });
};

export const getPlot = async (id: string): Promise<ScenarioFormValues & { id: string }> => {
  const docRef = doc(db, 'plots', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ScenarioFormValues & { id: string };
  }

  throw new Error('시나리오를 찾을 수 없습니다.');
};

export const deletePlot = async (id: string): Promise<void> => {
  const docRef = doc(db, 'plots', id);
  await deleteDoc(docRef);
};
