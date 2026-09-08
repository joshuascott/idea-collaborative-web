// Geometric centreline reconstruction of the mark, derived by measuring the
// master artwork: two loop centres 261 units apart, a 168-unit centreline
// radius, a 77.5-unit stroke, and a crossing bar at 45.21 degrees.
//
// The traced outlines in /public/logo.svg are the canonical static mark. These
// stroke paths exist because the mark scene (PLAN.md 4b, moment 1) draws the
// loops with stroke-dashoffset, which a filled outline cannot do. They sit
// within a pixel of the traced artwork, so the scene resolves cleanly into it.
export const mark = {
  viewBox: '0 0 1024 1024',
  strokeWidth: 77.5,
  knockout: 93.5,
  navy: 'M 518.62 403.64 A 168 168 0 1 0 461.45 647.48 L 625.00 482.90',
  teal: 'M 504.38 596.36 A 168 168 0 1 0 561.55 352.52 L 398.00 517.10',
  navyBar: 'M 461.45 647.48 L 625.00 482.90',
  tealBar: 'M 561.55 352.52 L 398.00 517.10',
  tail: 'M 700 636 L 752 668 L 752 710 Q 752 733 729 733 L 668 704 Z',
  // Measured with getTotalLength in the browser; used to seed dash offsets.
  navyLength: 1120,
  tealLength: 1120,
} as const;
