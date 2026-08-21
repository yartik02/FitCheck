const light = (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </>
);
const dark = (
  <>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </>
);

const dashboard = (
  <>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </>
);

const profile = (
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </>
);

const rezer = (
  <>
    <path d="M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M16 14a2 2 0 0 0-2 2" />
    <path d="M16 22a2 2 0 0 1-2-2" />
    <path d="M20 14a2 2 0 0 1 2 2" />
    <path d="M20 22a2 2 0 0 0 2-2" />
  </>
);

const tarob = (
  <>
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </>
);

const settings = (
  <>
    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <circle cx="12" cy="12" r="3" />
  </>
);

const logout = (
  <>
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </>
);

const history = (
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </>
);

const eyeIcon = (
  <>
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </>
);

const eyeOffIcon = (
  <>
    <path d="m15 18-.722-3.25" />
    <path d="M2 8a10.645 10.645 0 0 0 20 0" />
    <path d="m20 15-1.726-2.05" />
    <path d="m4 15 1.726-2.05" />
    <path d="m9 18 .722-3.25" />
  </>
);

const backArrow = (
  <>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </>
);

const scrollArrow = (
  <>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </>
);

const hamburger = (
  <>
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M4 18h16" />
  </>
);

const closeIcon = (
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);

const successToast = <path d="M20 6 9 17l-5-5" />;

const errorToast = (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </>
);

const warningToast = (
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </>
);

const infoToast = (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </>
);

const userIcon = (
  <>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
);

const paletteIcon = <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />;

const shieldIcon = <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;

const monitorIcon = (
  <>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </>
);

const moonIcon = <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />;

const sunIcon = (
  <>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </>
);

const checkCircleIcon = (
  <>
    <path d="m10.586 5.414-5.172 5.172" />
    <path d="m18.586 13.414-5.172 5.172" />
    <path d="M6 12h12" />
    <circle cx="12" cy="20" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="4" cy="12" r="2" />
  </>
);

const checkIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    d="M5 13l4 4L19 7"
  />
);

const layersIcon = (
  <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
);

const targetIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  />
);

const warningOutlineIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  />
);

const githubIcon = (
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
);

const linkedinIcon = (
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
);

const fileReadyIcon = (
  <>
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </>
);

const uploadIcon = (
  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
);

const replaceIcon = (
  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
);

const saveIcon = (
  <>
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </>
);

const pasteIcon = (
  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
);

const arrowRightIcon = <path d="M14 5l7 7m0 0l-7 7m7-7H3" />;

const resetIcon = <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />;

const crossIcon = <path d="M6 18L18 6M6 6l12 12" />;

const calendarIcon = (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
);

const documentIcon = (
  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
);

const bullseyeIcon = (
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </>
);

const clockIcon = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>
);

const lightningIcon = <path d="M13 10V3L4 14h7v7l9-11h-7z" />;

const chevronDownIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 9l-7 7-7-7"
  />
);

const lockIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  />
);

export {
  light,
  dark,
  dashboard,
  profile,
  rezer,
  tarob,
  settings,
  logout,
  history,
  eyeIcon,
  eyeOffIcon,
  backArrow,
  scrollArrow,
  hamburger,
  closeIcon,
  successToast,
  errorToast,
  warningToast,
  infoToast,
  userIcon,
  paletteIcon,
  shieldIcon,
  monitorIcon,
  moonIcon,
  sunIcon,
  checkCircleIcon,
  checkIcon,
  layersIcon,
  targetIcon,
  warningOutlineIcon,
  githubIcon,
  linkedinIcon,
  fileReadyIcon,
  uploadIcon,
  replaceIcon,
  saveIcon,
  pasteIcon,
  arrowRightIcon,
  resetIcon,
  crossIcon,
  calendarIcon,
  documentIcon,
  bullseyeIcon,
  clockIcon,
  lightningIcon,
  chevronDownIcon,
  lockIcon,
};
