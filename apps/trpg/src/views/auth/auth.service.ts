import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/lib/firebase';
import { SignUpFormValues } from './auth.schema';

const transformIdToEmail = (id: string) => {
  return `${id.trim()}@dandanae.com`;
};

export const signUpWithId = async (data: SignUpFormValues) => {
  const email = transformIdToEmail(data.id);

  const userCredential = await createUserWithEmailAndPassword(auth, email, data.password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    nickname: data.id,
    isAuthorized: false,
    createdAt: serverTimestamp(),
    termsOfService: data.termsOfService,
    privacyPolicy: data.privacyPolicy,
  });

  return user;
};

export const signInWithId = async (id: string, password: string) => {
  const email = transformIdToEmail(id);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  await signOut(auth);
};
