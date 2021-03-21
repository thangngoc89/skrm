import { h } from "preact";
import { useMediaQuery } from "react-responsive";

export const mobileLarge = 480;
export const tablet = 640;
export const desktop = 1024;
// // @ts-ignore
// const Desktop: React.FC<{}> = ({ children }) => {
//   const isDesktop = useMediaQuery({ minWidth: 1024 });
//   return isDesktop ? children : null;
// };
// // @ts-ignore
// const Tablet: React.FC<{}> = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 640 });
//   return isTablet ? children : null;
// };
// // @ts-ignore
// const MobileLarge: React.FC<{}> = ({ children }) => {
//   const isMobile = useMediaQuery({ minWidth: 480 });
//   return isMobile ? children : null;
// };
// // @ts-ignore
// const Default: React.FC<{}> = ({ children }) => {
//   const isMobile = useMediaQuery({ maxWidth: 479 });
//   return isMobile ? null : children;
// };

// export { Desktop, Tablet, MobileLarge, Default };
