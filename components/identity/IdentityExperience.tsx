import React from 'react';
import RoleBackground from './RoleBackground';
import RoleHistory from './RoleHistory';
import RoleFrame from './RoleFrame';
import { ROLES_DATA } from '../../data/roles';

export default function IdentityExperience() {
  const roleClassMap: Record<string, string> = {
    '01': 'role-frame-marketer',
    '02': 'role-frame-brand',
    '03': 'role-frame-creator',
    '04': 'role-frame-speaker',
  };

  return (
    <>
      {/* Statement Backdrop ("I DON'T FIT INTO ONE BOX") & Environmental Glowing SVG Symbols */}
      <RoleBackground />

      {/* Top Completed Identity History Row (Slots 1-4 + Collective Line) */}
      <RoleHistory />

      {/* Active Center Stage with Warm Identity Spotlight & 4 Active Role Frames */}
      <div className="active-role-stage" id="active-role-stage" aria-live="polite">
        <div className="active-role-spotlight" id="active-role-spotlight" aria-hidden="true"></div>

        {ROLES_DATA.map((role) => (
          <RoleFrame
            key={role.id}
            id={role.id}
            roleClass={roleClassMap[role.num] || ''}
            num={role.num}
            category={role.category}
            title={role.title}
            sub={role.sub}
          />
        ))}
      </div>
    </>
  );
}
