'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoleBackground from './RoleBackground';
import RoleHistory from './RoleHistory';
import RoleFrame from './RoleFrame';
import { ROLES_DATA } from '../../data/roles';
import { buildIdentityTimeline, attachIdentityParallax } from './identityTimeline';

export default function IdentityExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  const roleClassMap: Record<string, string> = {
    '01': 'role-frame-marketer',
    '02': 'role-frame-brand',
    '03': 'role-frame-creator',
    '04': 'role-frame-speaker',
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const stmtBackdrop = document.getElementById('hero-statement-backdrop');
      const stmtLine1 = document.getElementById('stmt-line-1');
      const stmtLine2 = document.getElementById('stmt-line-2');
      const stmtLine3 = document.getElementById('stmt-line-3');
      const envSymbolsWrap = document.getElementById('role-env-symbols');
      const envSymMarketer = document.getElementById('env-sym-marketer');
      const envSymBrand = document.getElementById('env-sym-brand');
      const envSymCreator = document.getElementById('env-sym-creator');
      const envSymSpeaker = document.getElementById('env-sym-speaker');
      const roleStage = document.getElementById('active-role-stage');
      const roleSpotlight = document.getElementById('active-role-spotlight');
      const frame1 = document.getElementById('role-frame-1');
      const frame2 = document.getElementById('role-frame-2');
      const frame3 = document.getElementById('role-frame-3');
      const frame4 = document.getElementById('role-frame-4');
      const historyRow = document.getElementById('identity-history-row');
      const historySlots = [
        document.getElementById('history-slot-1'),
        document.getElementById('history-slot-2'),
        document.getElementById('history-slot-3'),
        document.getElementById('history-slot-4'),
      ];
      const historyCollectiveLine = document.getElementById('history-collective-line');

      const mm = gsap.matchMedia();

      // Desktop pinned timeline: "I DON'T FIT INTO ONE BOX" + Four Role Progression
      mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=4000',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onEnter: () => {
              if (section) section.classList.add('is-active');
            },
            onLeaveBack: () => {
              if (section) section.classList.remove('is-active');
            },
          },
        });

        buildIdentityTimeline(tl, {
          stmtBackdrop,
          stmtLine1,
          stmtLine2,
          stmtLine3,
          envSymMarketer,
          envSymBrand,
          envSymCreator,
          envSymSpeaker,
          roleStage,
          roleSpotlight,
          frame1,
          frame2,
          frame3,
          frame4,
          historySlots,
          historyCollectiveLine,
          historyRow,
          envSymbolsWrap,
          wrapper: section,
          characterScene: null,
          getAnchorRightX: () => 0,
        });

        // Mouse Parallax for active role card
        if (window.matchMedia('(min-width: 1025px)').matches) {
          let mouseX = 0, mouseY = 0;
          let targetX = 0, targetY = 0;

          const onMouseMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetY = (e.clientY / window.innerHeight - 0.5) * 2;
          };

          window.addEventListener('mousemove', onMouseMove, { passive: true });

          const tick = () => {
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            attachIdentityParallax(
              mouseX,
              mouseY,
              [frame1, frame2, frame3, frame4],
              [envSymMarketer, envSymBrand, envSymCreator, envSymSpeaker],
              roleSpotlight
            );
          };

          gsap.ticker.add(tick);

          return () => {
            window.removeEventListener('mousemove', onMouseMove);
            gsap.ticker.remove(tick);
          };
        }
      });

      // Mobile reveals
      mm.add('(max-width: 960px)', () => {
        section.classList.add('is-active');

        const stmtLines = section.querySelectorAll('.stmt-line');
        stmtLines.forEach((line) => {
          gsap.fromTo(line,
            { opacity: 0.35, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                end: 'top 65%',
                scrub: 0.35,
              },
            }
          );
        });

        const roleFrames = section.querySelectorAll('.editorial-role-frame');
        roleFrames.forEach((frame) => {
          gsap.fromTo(frame,
            { opacity: 0.25, y: 25, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: frame,
                start: 'top 88%',
                end: 'top 58%',
                scrub: 0.35,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="identity-section" id="identity" ref={sectionRef}>
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
    </section>
  );
}
