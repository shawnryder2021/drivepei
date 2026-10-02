'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GitCompareArrows } from 'lucide-react';
import { COMPARE_EVENT, readCompared } from '@/lib/compare';

export function CompareTray() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = () => setCount(readCompared().length);
    update();
    window.addEventListener(COMPARE_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(COMPARE_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  if (!count) return null;
  return (
    <Link href="/compare" className="compare-tray" aria-label={`Compare ${count} saved vehicle${count === 1 ? '' : 's'}`}>
      <GitCompareArrows size={18} aria-hidden="true" />
      Compare {count} vehicle{count === 1 ? '' : 's'} →
    </Link>
  );
}
