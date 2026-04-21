import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import { type ScenarioFormValues } from './plot.schema';

export const createPlot = async (plot: ScenarioFormValues) => {
  const docRef = await addDoc(collection(db, 'plots'), {
    ...plot,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const updatePlot = async (id: string, plot: ScenarioFormValues) => {
  const docRef = doc(db, 'plots', id);
  await setDoc(docRef, {
    ...plot,
    updatedAt: new Date(),
  });
};

export type PlotListItem = Omit<ScenarioFormValues, 'content'> & { id: string; createdAt: string };
export const getPlots = async (
  userId: string,
  order: 'asc' | 'desc' = 'desc',
  searchTerm?: string,
): Promise<PlotListItem[]> => {
  console.log('1. 함수 시작 - userId:', userId);

  try {
    const plotsRef = collection(db, 'plots');
    const q = query(plotsRef, where('authorId', '==', userId), orderBy('createdAt', order));

    console.log('2. 쿼리 생성 완료, 데이터 요청 시도 중...');

    // 여기서 멈춘다면 100% 인덱스나 권한 문제임
    const querySnapshot = await getDocs(q);

    console.log('3. 데이터 수신 성공! 문서 개수:');

    const results = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as PlotListItem,
    );

    if (searchTerm && searchTerm.trim().length > 0) {
      const filtered = results.filter(plot => plot.title.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log('4. 필터링 완료:', filtered.length, '건');
      return filtered;
    }

    console.log('4. 필터링 없음, 전체 반환');
    return results;
  } catch (error: any) {
    // 여기가 핵심입니다. 숨겨진 에러를 강제로 출력합니다.
    console.error('🚨 Firestore 에러 발생 상세 내용:');
    console.error('에러 코드:', error.code);
    console.error('에러 메시지:', error.message);

    if (error.message.includes('index')) {
      console.warn('👉 인덱스가 없어서 발생하는 에러입니다. 위 메시지의 URL을 클릭하세요.');
    }

    throw error; // 에러를 다시 던져서 호출부에서도 알 수 있게 함
  }
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
