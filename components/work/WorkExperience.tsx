import React from 'react';
import DigiMarketrix from './DigiMarketrix';

interface WorkExperienceProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function WorkExperience({ onOpenDrawer, onOpenProof }: WorkExperienceProps) {
  return <DigiMarketrix onOpenDrawer={onOpenDrawer} onOpenProof={onOpenProof} />;
}
