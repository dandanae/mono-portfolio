import React from 'react';

export const projectTagDetails = {
  C: { color: 'bg-purple-100 text-purple-800' },
  'C++': { color: 'bg-purple-100 text-purple-800' },
  'C#': { color: 'bg-purple-100 text-purple-800' },
  PHP: { color: 'bg-teal-100 text-teal-800' },
  React: { color: 'bg-cyan-100 text-cyan-800' },
  Flutter: { color: 'bg-sky-100 text-sky-800' },
  AWS: { color: 'bg-orange-100 text-orange-800' },
  etc: { color: 'bg-gray-100 text-gray-800' },
} as const;
export type ProjTag = keyof typeof projectTagDetails;

export interface ProjLink {
  title: string;
  href: string;
  icon?: string;
}

export interface ProjTask {
  title: string;
  lists: React.ReactNode[];
}

export interface ProjHardTask {
  title: string;
  problems: React.ReactNode[];
  solutions: React.ReactNode[];
  learningPoints: React.ReactNode[];
}

export interface Project {
  id: string;
  tags: ProjTag[];
  title: string;
  subtitle: string;
  challenge: string;
  date: string;
  role: string;
  tasks: ProjTask[];
  hardTasks: ProjHardTask[];
  results: ProjTask[];
  uiPoint?: ProjTask[];
  content?: React.ReactNode;
  image?: string;
  links?: ProjLink[];
  libraries?: ProjLink[];
}
