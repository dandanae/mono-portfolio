import { ComponentType } from 'react';

export interface PlotMetadata {
  href: string;
  title: string;
  writer: string;
  summary: string;
  line: string;
  image: PlotImageData;
}

export interface PlotData {
  Content: ComponentType | null;
  metadata: PlotMetadata;
  infos: { key: string; value: React.ReactNode }[];
}

export interface PlotPost extends PlotMetadata {
  slug: string;
}

export interface PlotInfo {
  key: string;
  icon: string;
  value: React.ReactNode;
}

export interface PlotImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}
