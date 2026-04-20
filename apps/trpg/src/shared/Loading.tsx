import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div className="bg-primary/20 absolute aspect-square w-full max-w-58 rounded-full blur-2xl md:max-w-md" />
      <span>로딩 중..</span>
    </div>
  );
};

export default Loading;
