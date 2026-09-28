import React from 'react';

interface TalentrixProps {
  onOpenDrawer?: (drawerId: string) => void;
  onOpenProof?: (proofKey: string) => void;
}

export default function Talentrix({ onOpenDrawer, onOpenProof }: TalentrixProps) {
  return (
    <div className="talentrix-submoment" id="talentrix">
      <div className="talentrix-submoment-content">
        <span className="submoment-badge">IN-HOUSE VENTURE // BORN AT DIGI MARKETRIX</span>
        <h4 className="talentrix-big-name">
          TALENT<br />
          RIX<span className="text-gold">.</span>
        </h4>
        <div className="talentrix-manifesto">STARTED. LED. BUILT.</div>
        <p className="talentrix-desc">
          Conceptualized and spearheaded by Aakash to bridge retail clients with high-affinity influencers. Orchestrated talent discovery, commercial negotiations, storyboard direction, and production delivery.
        </p>
        <div className="talentrix-actions">
          <button
            type="button"
            className="btn-editorial open-drawer-btn"
            data-drawer="drawer-digi"
            onClick={() => onOpenDrawer?.('drawer-digi')}
          >
            EXPLORE CASE STUDY →
          </button>
          <button
            type="button"
            className="btn-editorial-outline open-proof-trigger"
            data-proof="digi-gimbal"
            onClick={() => onOpenProof?.('digi-gimbal')}
          >
            VIEW FIELD PRODUCTION ↗
          </button>
        </div>
      </div>

      <div
        className="talentrix-visual-card open-proof-trigger"
        data-proof="digi-gimbal"
        data-cursor="INSPECT"
        title="Click to view 3-axis gimbal production"
        onClick={() => onOpenProof?.('digi-gimbal')}
      >
        <img
          src="/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg"
          alt="Aakash operating 3-axis motorized gimbal during commercial production"
          loading="lazy"
        />
        <div className="visual-card-caption">
          <span>TALENTRIX FIELD PRODUCTION // GIMBAL SHOOT</span>
          <span>↗</span>
        </div>
      </div>
    </div>
  );
}
