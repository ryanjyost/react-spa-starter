import responsiveHook, { _breakpoints } from './responsive';

export const useResponsive = responsiveHook;
export const breakpoints = _breakpoints;

// it's often helpful/necessary to use the sizes of layout elements
// when styling complementary components
const STYLES = {
   /*************
    Colors
    *************/
   black: (opacity = 1) => `rgba(0,0,0,${opacity})`,
   white: (opacity = 1) => `rgba(255,255,255,${opacity})`,

   /*************
    Dimensions
    *************/
   // these are just ant-d defaults, to help offset content
   collapsedSidebarWidth: 80,
   expandedSidebarWidth: 200,
   appHeaderHeight: 60
};

export default STYLES;
