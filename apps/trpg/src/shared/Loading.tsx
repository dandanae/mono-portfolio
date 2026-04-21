'use client';

import React from 'react';

const Loading = () => {
  return (
    <div className="bg-background/50 fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
