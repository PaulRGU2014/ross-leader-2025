import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

interface LinkWrapperProps {
  href?: string;
  target?: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  style?: CSSProperties;
}

export default function LinkWrapper({
  href,
  target = "_self",
  children,
  className = "",
  onClick,
  style
}: LinkWrapperProps) {
  if (!href) {
    return <a className={className} onClick={onClick} style={style}>{children}</a>;
  }
  return (
    <Link className={className} target={target} onClick={onClick} style={style} href={href} passHref>
      {children}
    </Link>
  );
}