import { josa } from 'es-hangul';

export const replaceJosa = (text: string, kpc: string, pc: string): string => {
  const applyReplacement = (content: string, targetTag: string, name: string): string => {
    const withJosaRegex = new RegExp(`{{${targetTag}}}([가-힣]+)`, 'gi');

    const processed = content.replace(withJosaRegex, (match, p1) => {
      const targetJosa = josaSelectorMap[p1];
      if (targetJosa) {
        return josa(name, targetJosa as any);
      }
      return name + p1;
    });

    const standaloneRegex = new RegExp(`{{${targetTag}}}`, 'g');
    return processed.replace(standaloneRegex, name);
  };

  const step1 = applyReplacement(text, 'kpc', kpc);
  const step2 = applyReplacement(step1, 'pc', pc);

  return step2;
};

export const replaceJson = (node: any, kpc: string, pc: string): any => {
  if (!node) return node;
  if (node.type === 'text' && node.text) {
    return {
      ...node,
      text: replaceJosa(node.text, kpc, pc),
    };
  }

  if (node.content && Array.isArray(node.content)) {
    return {
      ...node,
      content: node.content.map((child: any) => replaceJson(child, kpc, pc)),
    };
  }

  return node;
};

const josaSelectorMap: Record<string, string> = {
  이: '이/가',
  가: '이/가',
  을: '을/를',
  를: '을/를',
  은: '은/는',
  는: '은/는',
  으로: '으로/로',
  로: '으로/로',
  와: '와/과',
  과: '와/과',
  이나: '이나/나',
  나: '이나/나',
  이란: '이란/란',
  란: '이란/란',
  아: '아/야',
  야: '아/야',
  이랑: '이랑/랑',
  랑: '이랑/랑',
  이에요: '이에요/예요',
  이예요: '이에요/예요',
  예요: '이에요/예요',
  에요: '이에요/예요',
  으로서: '으로서/로서',
  로서: '으로서/로서',
  으로써: '으로써/로써',
  로써: '으로써/로써',
  으로부터: '으로부터/로부터',
  로부터: '으로부터/로부터',
  이라: '이라/라',
  라: '이라/라',
};
