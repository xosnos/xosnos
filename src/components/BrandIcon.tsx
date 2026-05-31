import type { SVGProps } from 'react';

export interface BrandIconData {
  title: string;
  path: string;
}

type BrandIconProps = {
  icon: BrandIconData;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, 'viewBox'>;

const BrandIcon = ({ icon, title = icon.title, width, height, ...rest }: BrandIconProps) => (
  <svg
    width={width ?? '1em'}
    height={height ?? '1em'}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    focusable="false"
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path d={icon.path} />
  </svg>
);

export default BrandIcon;

