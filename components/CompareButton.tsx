'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check, GitCompareArrows } from 'lucide-react';
import { COMPARE_EVENT, MAX_COMPARE, readCompared, writeCompared } from '@/lib/compare';

export function CompareButton({ vin }: { vin: string }) {
  const [selected, setSelected] = useState(false);
  const [full, setFull] = useState(false);
  useEffect(() => {
    const update = () => setSelected(readCompared().includes(vin));
    update();
    window.addEventListener(COMPARE_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(COMPARE_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, [vin]);
  function toggle() {
    const vins = readCompared();
    if (!vins.includes(vin) && vins.length >= MAX_COMPARE) {
      setFull(true);
      return;
    }
    writeCompared(vins.includes(vin) ? vins.filter((item) => item !== vin) : [...vins, vin]);
    setFull(false);
  }
  return (
    <div className="compare-action">
      <button type="button" className="compare-button" onClick={toggle} aria-pressed={selected}>
        {selected ? <Check size={16} aria-hidden="true" /> : <GitCompareArrows size={16} aria-hidden="true" />}
        {selected ? 'Added to compare' : 'Add to compare'}
      </button>
      {full && <span role="status">Compare up to three vehicles. <Link href="/compare">Review your picks</Link></span>}
    </div>
  );
}
