export const DISEASE = {
  INFECTED: 0,
  SUSCEPTIBLE: 1,
  RECOVERED: 2,
};

export const MASK = {
  NO_MASK: 0,
  NON_MEDICAL: 1,
  MEDICAL: 2
};

export const MASK_ATTACK_REDUCTION = {
  [MASK.NO_MASK]: 1, // 1 = no change in transmissivity
  [MASK.NON_MEDICAL]: 0.67,
  [MASK.MEDICAL]: 0.55
};

export const COLOR_BY_DISEASE = {
  [DISEASE.INFECTED]: "#BB641D",
  [DISEASE.SUSCEPTIBLE]: "#AAC6CA",
  [DISEASE.RECOVERED]: "#CB8AC0",
};

export const STROKE_WIDTH_BY_MASK = {
  [MASK.NO_MASK]: 0,
  [MASK.NON_MEDICAL]: 3,
  [MASK.MEDICAL]: 4
};

export const STROKE_COLOR_BY_MASK = {
  [MASK.NO_MASK]: '#fff',
  [MASK.NON_MEDICAL]: '#000',
  [MASK.MEDICAL]: '#000'
};
