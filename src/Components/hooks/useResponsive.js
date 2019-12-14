import React from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * These are ant-d's default breakpoints (basically bootstrap) They should be set here as a single source of truth, so updates trickle throughout app.
 * @const {Object}
 */
export const _breakpoints = {
   xs: '480px',
   sm: '576px',
   md: '768px',
   lg: '992px',
   xl: '1200px',
   xxl: '1600px'
};

/**
 * Custom hook for easily returning a bool for given breakpoint
 * e.g.) const isSmallDevice = useResponsive('sm')
 * @param {string} breakpoint
 * @returns {Boolean} - whether the app is at or below the breakpoint
 */
export default function useResponsive(breakpoint) {
   return useMediaQuery({ maxWidth: _breakpoints[breakpoint] });
}
