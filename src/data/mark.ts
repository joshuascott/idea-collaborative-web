// Centreline of the vector mark in public/logo.svg, so the draw animation can
// stroke the same loops the static files fill. Two centres 269 units apart on
// y = 501, a 165.5 centreline radius, and a 77-unit stroke. The speech-bubble
// tail is filled, not stroked, and pops in after the loops.
export const mark = {
  viewBox: '0 0 1024 1024',
  strokeWidth: 77,
  knockout: 93,
  navy: 'M 481.65 372.38 A 165.5 165.5 0 1 0 494.53 618.03 L 620.75 491.80',
  teal: 'M 542.35 629.62 A 165.5 165.5 0 1 0 529.47 383.97 L 403.26 510.20',
  navyBar: 'M 494.53 618.03 L 620.75 491.80',
  tealBar: 'M 529.47 383.97 L 403.26 510.20',
  tail: 'M 667.69 703.90 L 729.48 731.46 A 16 16 0 0 0 752 716.84 L 752 675.60 A 204 204 0 0 1 667.69 703.90 Z',
  // Arc plus bar, in user units. The scenes set pathLength="1", so these are unused by the animation.
  navyLength: 941,
  tealLength: 941,
} as const;
