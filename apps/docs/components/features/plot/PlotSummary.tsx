import React from 'react';
import { WrapperBase } from '@/components/shared';

const PlotSummary = ({ children }: { children: React.ReactNode }) => {
  return (
    <WrapperBase color="blue" title="진상 요약">
      {children}
    </WrapperBase>
  );
};

export default PlotSummary;
