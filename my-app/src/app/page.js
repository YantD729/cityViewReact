"use client"

// index.js
import dynamic from 'next/dynamic';

const DynamicHome = dynamic(() => import('./components/Home'), { ssr: false });

function HomePage() {
  return (
    <div>
      <DynamicHome />
    </div>
  );
}

export default HomePage;

