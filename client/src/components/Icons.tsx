import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => <Icon {...props}><path d="M5 12h14m-7-7 7 7-7 7" /></Icon>;
export const BookOpen = (props: IconProps) => <Icon {...props}><path d="M12 7v14m0-14C9 4 5 4 2 6v13c3-2 7-2 10 1m0-13c3-3 7-3 10-1v13c-3-2-7-2-10 1" /></Icon>;
export const Briefcase = (props: IconProps) => <Icon {...props}><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11 0v2h4v-2" /></Icon>;
export const FileText = (props: IconProps) => <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8m-8 4h8" /></Icon>;
export const Home = (props: IconProps) => <Icon {...props}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></Icon>;
export const Menu = (props: IconProps) => <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
export const Mic = (props: IconProps) => <Icon {...props}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" /></Icon>;
export const ShoppingBag = (props: IconProps) => <Icon {...props}><path d="M5 8h14l1 13H4z" /><path d="M9 8a3 3 0 0 1 6 0" /></Icon>;
export const X = (props: IconProps) => <Icon {...props}><path d="m18 6-12 12M6 6l12 12" /></Icon>;
