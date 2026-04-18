import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 16, props: SVGProps<SVGSVGElement> = {}) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  className: `pixel ${props.className ?? ""}`,
  fill: "currentColor",
  ...props,
});

export const PxHome = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="7" y="2" width="2" height="2" />
    <rect x="5" y="4" width="2" height="2" />
    <rect x="9" y="4" width="2" height="2" />
    <rect x="3" y="6" width="2" height="2" />
    <rect x="11" y="6" width="2" height="2" />
    <rect x="4" y="8" width="8" height="6" />
    <rect x="6" y="10" width="2" height="4" fill="var(--background)" />
  </svg>
);

export const PxSearch = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="4" y="2" width="6" height="2" />
    <rect x="2" y="4" width="2" height="6" />
    <rect x="10" y="4" width="2" height="6" />
    <rect x="4" y="10" width="6" height="2" />
    <rect x="10" y="10" width="2" height="2" />
    <rect x="12" y="12" width="2" height="2" />
  </svg>
);

export const PxCopy = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="8" height="2" />
    <rect x="2" y="4" width="2" height="6" />
    <rect x="8" y="4" width="2" height="2" />
    <rect x="2" y="10" width="6" height="2" />
    <rect x="6" y="6" width="8" height="2" />
    <rect x="6" y="8" width="2" height="6" />
    <rect x="12" y="8" width="2" height="6" />
    <rect x="6" y="14" width="8" height="2" />
  </svg>
);

export const PxCheck = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="12" y="4" width="2" height="2" />
    <rect x="10" y="6" width="2" height="2" />
    <rect x="8" y="8" width="2" height="2" />
    <rect x="6" y="10" width="2" height="2" />
    <rect x="4" y="8" width="2" height="2" />
    <rect x="2" y="6" width="2" height="2" />
  </svg>
);

export const PxArrow = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="7" width="8" height="2" />
    <rect x="8" y="5" width="2" height="2" />
    <rect x="8" y="9" width="2" height="2" />
    <rect x="10" y="3" width="2" height="2" />
    <rect x="10" y="11" width="2" height="2" />
    <rect x="12" y="5" width="2" height="6" />
  </svg>
);

export const PxStar = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="7" y="1" width="2" height="2" />
    <rect x="6" y="3" width="4" height="2" />
    <rect x="1" y="5" width="14" height="2" />
    <rect x="3" y="7" width="10" height="2" />
    <rect x="4" y="9" width="8" height="2" />
    <rect x="3" y="11" width="2" height="2" />
    <rect x="11" y="11" width="2" height="2" />
    <rect x="1" y="13" width="2" height="2" />
    <rect x="13" y="13" width="2" height="2" />
  </svg>
);

export const PxGrid = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="5" height="5" />
    <rect x="9" y="2" width="5" height="5" />
    <rect x="2" y="9" width="5" height="5" />
    <rect x="9" y="9" width="5" height="5" />
  </svg>
);

export const PxList = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="3" width="2" height="2" />
    <rect x="6" y="3" width="8" height="2" />
    <rect x="2" y="7" width="2" height="2" />
    <rect x="6" y="7" width="8" height="2" />
    <rect x="2" y="11" width="2" height="2" />
    <rect x="6" y="11" width="8" height="2" />
  </svg>
);

export const PxMenu = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="3" width="12" height="2" />
    <rect x="2" y="7" width="12" height="2" />
    <rect x="2" y="11" width="12" height="2" />
  </svg>
);

export const PxClose = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="2" height="2" />
    <rect x="12" y="2" width="2" height="2" />
    <rect x="4" y="4" width="2" height="2" />
    <rect x="10" y="4" width="2" height="2" />
    <rect x="6" y="6" width="2" height="2" />
    <rect x="8" y="6" width="2" height="2" />
    <rect x="6" y="8" width="2" height="2" />
    <rect x="8" y="8" width="2" height="2" />
    <rect x="4" y="10" width="2" height="2" />
    <rect x="10" y="10" width="2" height="2" />
    <rect x="2" y="12" width="2" height="2" />
    <rect x="12" y="12" width="2" height="2" />
  </svg>
);

export const PxSun = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="7" y="1" width="2" height="2" />
    <rect x="7" y="13" width="2" height="2" />
    <rect x="1" y="7" width="2" height="2" />
    <rect x="13" y="7" width="2" height="2" />
    <rect x="3" y="3" width="2" height="2" />
    <rect x="11" y="3" width="2" height="2" />
    <rect x="3" y="11" width="2" height="2" />
    <rect x="11" y="11" width="2" height="2" />
    <rect x="6" y="5" width="4" height="6" />
    <rect x="5" y="6" width="6" height="4" />
  </svg>
);

export const PxMoon = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="5" y="2" width="6" height="2" />
    <rect x="3" y="4" width="2" height="2" />
    <rect x="9" y="4" width="2" height="2" />
    <rect x="2" y="6" width="2" height="6" />
    <rect x="8" y="6" width="2" height="2" />
    <rect x="3" y="12" width="2" height="2" />
    <rect x="9" y="10" width="4" height="2" />
    <rect x="5" y="14" width="6" height="2" />
  </svg>
);

export const PxGithub = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="5" y="1" width="6" height="2" />
    <rect x="3" y="3" width="2" height="2" />
    <rect x="11" y="3" width="2" height="2" />
    <rect x="2" y="5" width="2" height="6" />
    <rect x="12" y="5" width="2" height="6" />
    <rect x="4" y="11" width="2" height="2" />
    <rect x="10" y="11" width="2" height="2" />
    <rect x="5" y="13" width="2" height="2" />
    <rect x="9" y="13" width="2" height="2" />
    <rect x="6" y="11" width="4" height="2" />
  </svg>
);

export const PxComponent = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="5" height="5" />
    <rect x="9" y="2" width="5" height="5" />
    <rect x="2" y="9" width="12" height="5" />
  </svg>
);

export const PxCode = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="4" y="4" width="2" height="2" />
    <rect x="2" y="6" width="2" height="4" />
    <rect x="4" y="10" width="2" height="2" />
    <rect x="10" y="4" width="2" height="2" />
    <rect x="12" y="6" width="2" height="4" />
    <rect x="10" y="10" width="2" height="2" />
    <rect x="9" y="3" width="2" height="2" />
    <rect x="7" y="6" width="2" height="2" />
    <rect x="6" y="10" width="2" height="2" />
  </svg>
);

export const PxFilter = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="3" width="12" height="2" />
    <rect x="4" y="6" width="8" height="2" />
    <rect x="6" y="9" width="4" height="2" />
    <rect x="7" y="12" width="2" height="2" />
  </svg>
);

export const PxChip = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="3" width="10" height="2" />
    <rect x="2" y="5" width="2" height="6" />
    <rect x="12" y="5" width="2" height="6" />
    <rect x="3" y="11" width="10" height="2" />
    <rect x="6" y="7" width="4" height="2" />
  </svg>
);

export const PxCard = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="3" width="12" height="2" />
    <rect x="2" y="5" width="2" height="8" />
    <rect x="12" y="5" width="2" height="8" />
    <rect x="2" y="13" width="12" height="2" />
    <rect x="4" y="7" width="6" height="2" />
    <rect x="4" y="10" width="8" height="1" />
  </svg>
);

export const PxInput = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="5" width="12" height="2" />
    <rect x="2" y="7" width="2" height="4" />
    <rect x="12" y="7" width="2" height="4" />
    <rect x="2" y="11" width="12" height="2" />
    <rect x="4" y="8" width="2" height="2" />
  </svg>
);

export const PxDialog = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="3" width="10" height="2" />
    <rect x="4" y="7" width="8" height="1" />
    <rect x="4" y="9" width="6" height="1" />
    <rect x="8" y="11" width="4" height="2" />
  </svg>
);

export const PxNav = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="3" width="14" height="3" />
    <rect x="1" y="11" width="14" height="3" />
    <rect x="3" y="12" width="2" height="1" fill="var(--background)" />
    <rect x="7" y="12" width="2" height="1" fill="var(--background)" />
    <rect x="11" y="12" width="2" height="1" fill="var(--background)" />
  </svg>
);

export const PxButton = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="6" width="12" height="4" />
    <rect x="5" y="7" width="6" height="2" fill="var(--background)" />
  </svg>
);

export const PxProgress = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="7" width="14" height="2" stroke="currentColor" fill="none" />
    <rect x="2" y="7" width="6" height="2" />
  </svg>
);

export const PxFeedback = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="4" width="12" height="6" />
    <rect x="4" y="10" width="2" height="2" />
    <rect x="5" y="6" width="2" height="2" fill="var(--background)" />
    <rect x="9" y="6" width="2" height="2" fill="var(--background)" />
  </svg>
);

export const PxList2 = PxList;
export const PxType = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="12" height="2" />
    <rect x="7" y="2" width="2" height="12" />
  </svg>
);
export const PxLayout = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="1" width="14" height="3" />
    <rect x="1" y="5" width="6" height="10" />
    <rect x="8" y="5" width="7" height="10" />
  </svg>
);
export const PxAppBar = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="1" y="2" width="14" height="3" />
    <rect x="2" y="3" width="3" height="1" fill="var(--background)" />
    <rect x="11" y="3" width="3" height="1" fill="var(--background)" />
  </svg>
);
export const PxIcons = ({ size, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="2" y="2" width="4" height="4" />
    <rect x="10" y="2" width="4" height="4" />
    <rect x="2" y="10" width="4" height="4" />
    <rect x="10" y="10" width="4" height="4" />
  </svg>
);

export const CategoryIcon = ({ category, size = 16, ...p }: { category: string } & IconProps) => {
  const map: Record<string, React.ComponentType<IconProps>> = {
    buttons: PxButton,
    navigation: PxNav,
    cards: PxCard,
    inputs: PxInput,
    dialogs: PxDialog,
    feedback: PxFeedback,
    chips: PxChip,
    appbars: PxAppBar,
    lists: PxList,
    typography: PxType,
    layout: PxLayout,
    icons: PxIcons,
  };
  const Icon = map[category] ?? PxComponent;
  return <Icon size={size} {...p} />;
};

// Pixel framework logos — colored blocks
export const ComposeLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className="pixel">
    <rect x="6" y="2" width="4" height="2" fill="var(--glow-compose)" />
    <rect x="3" y="4" width="3" height="3" fill="var(--glow-compose)" />
    <rect x="10" y="4" width="3" height="3" fill="var(--glow-compose)" />
    <rect x="3" y="9" width="3" height="3" fill="var(--glow-compose)" />
    <rect x="10" y="9" width="3" height="3" fill="var(--glow-compose)" />
    <rect x="6" y="12" width="4" height="2" fill="var(--glow-compose)" />
    <rect x="6" y="6" width="4" height="4" fill="var(--glow-compose)" opacity="0.6" />
  </svg>
);
export const FlutterLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className="pixel">
    <rect x="9" y="2" width="4" height="2" fill="var(--glow-flutter)" />
    <rect x="7" y="4" width="4" height="2" fill="var(--glow-flutter)" />
    <rect x="5" y="6" width="4" height="2" fill="var(--glow-flutter)" />
    <rect x="3" y="8" width="4" height="2" fill="var(--glow-flutter)" />
    <rect x="5" y="10" width="4" height="2" fill="var(--glow-flutter)" />
    <rect x="7" y="12" width="6" height="2" fill="var(--glow-flutter)" />
    <rect x="7" y="8" width="2" height="2" fill="var(--glow-flutter)" opacity="0.7" />
  </svg>
);
export const RNLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className="pixel">
    <rect x="7" y="7" width="2" height="2" fill="var(--glow-rn)" />
    <rect x="2" y="2" width="2" height="2" fill="var(--glow-rn)" />
    <rect x="12" y="2" width="2" height="2" fill="var(--glow-rn)" />
    <rect x="2" y="12" width="2" height="2" fill="var(--glow-rn)" />
    <rect x="12" y="12" width="2" height="2" fill="var(--glow-rn)" />
    <rect x="4" y="4" width="2" height="2" fill="var(--glow-rn)" opacity="0.7" />
    <rect x="10" y="4" width="2" height="2" fill="var(--glow-rn)" opacity="0.7" />
    <rect x="4" y="10" width="2" height="2" fill="var(--glow-rn)" opacity="0.7" />
    <rect x="10" y="10" width="2" height="2" fill="var(--glow-rn)" opacity="0.7" />
  </svg>
);

export const YooLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className="pixel">
    <rect x="2" y="2" width="4" height="4" fill="var(--glow-compose)" />
    <rect x="6" y="2" width="4" height="4" fill="var(--glow-flutter)" />
    <rect x="10" y="2" width="4" height="4" fill="var(--glow-rn)" />
    <rect x="6" y="6" width="4" height="4" fill="var(--glow-primary)" />
    <rect x="6" y="10" width="4" height="4" fill="var(--glow-primary)" opacity="0.7" />
  </svg>
);
