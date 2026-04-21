'use client';

import React, { useEffect } from 'react';
import { useJoyride } from 'react-joyride';

const steps = [
  { content: 'This is my awesome feature!', target: '.my-first-step' },
  { content: 'This is another awesome feature!', target: '.my-other-step' },
];

const BlobPage = () => {
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    steps,
  });

  useEffect(() => {
    return on('tour:end', () => {
      console.log('Tour finished!');
    });
  }, [on]);

  return (
    <div className="flex w-full gap-3">
      <div className="w-1/2 bg-black" />
      <div className="w-1/2 bg-blue-300" />
    </div>
  );
};

export default BlobPage;
