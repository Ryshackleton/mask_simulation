import {
  DEFAULT_SIMULATION_PROPS,
  DEFAULT_VIRUS_SIMULATION_PROPS,
} from './hooks/useSimulation';

export const PERCENT_SOCIALLY_DISTANT = 75;

export const NO_MASKS_PROPS = {
  ...DEFAULT_SIMULATION_PROPS,
  virusSimulations: [
    {
      ...DEFAULT_VIRUS_SIMULATION_PROPS,
      title: '5% transmission, no masks',
      percentMasked: 0,
    },
  ],
};

export const NO_MASKS_VS_MASKS_PROPS = {
  ...DEFAULT_SIMULATION_PROPS,
  virusSimulations: [
    {
      ...DEFAULT_VIRUS_SIMULATION_PROPS,
      title: 'No mask use',
      percentMasked: 0,
    },
    {
      ...DEFAULT_VIRUS_SIMULATION_PROPS,
      title: '95% mask use',
      percentMasked: 95,
    }
  ],
};

export const NO_MASKS_VS_MASKS_WITH_SOCIAL_DISTANCING_PROPS = {
  ...DEFAULT_SIMULATION_PROPS,
  percentSociallyDistant: PERCENT_SOCIALLY_DISTANT,
  virusSimulations: [
    {
      ...DEFAULT_VIRUS_SIMULATION_PROPS,
      title: `No mask use, ${PERCENT_SOCIALLY_DISTANT}% social distancing`,
      percentMasked: 0,
    },
    {
      ...DEFAULT_VIRUS_SIMULATION_PROPS,
      title: `95% mask use, ${PERCENT_SOCIALLY_DISTANT}% social distancing`,
      percentMasked: 95,
    }
  ],
};
