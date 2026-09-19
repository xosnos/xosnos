export const RESUME_GATE_EVENT = 'xosnos:open-resume-gate';

export function openResumeGate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(RESUME_GATE_EVENT));
}
