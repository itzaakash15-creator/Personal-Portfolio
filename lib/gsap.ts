import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export function initGSAP() {
  if (typeof window === 'undefined') return;
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 100,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    });
    isRegistered = true;
  }
}

export { gsap, ScrollTrigger };
export default gsap;
