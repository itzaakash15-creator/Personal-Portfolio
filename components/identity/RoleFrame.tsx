import React from 'react';

interface RoleFrameProps {
  id: string;
  roleClass: string;
  num: string;
  category: string;
  title: string;
  sub: string;
}

export default function RoleFrame({ id, roleClass, num, category, title, sub }: RoleFrameProps) {
  return (
    <div className={`editorial-role-frame ${roleClass}`} id={id}>
      <div className="role-frame-inner">
        <div className="role-frame-header">
          <span className="role-frame-num">{num}</span>
          <span className="role-frame-category">{category}</span>
        </div>
        <div className="role-frame-title-wrap">
          <h3 className="role-frame-title">{title}</h3>
        </div>
        <div className="role-frame-sub-wrap">
          <p className="role-frame-sub">{sub}</p>
        </div>
      </div>
    </div>
  );
}
