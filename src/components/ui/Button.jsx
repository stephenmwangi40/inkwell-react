import { Link } from "react-router-dom";

const variants = {
  primary: "bg-blue text-white hover:bg-blue-dark shadow-sm hover:shadow-md border-transparent",
  gold: "bg-gold text-[#3a2f00] hover:brightness-95 border-transparent",
  outline: "bg-transparent text-ink border-line hover:border-blue hover:text-blue",
  ghost: "bg-transparent text-slate border-transparent hover:text-blue",
  danger: "bg-red-50 text-danger hover:bg-danger hover:text-white border-transparent",
};
const sizes = { sm: "px-3.5 py-1.5 text-sm", md: "px-5 py-2.5 text-[0.95rem]", lg: "px-6 py-3 text-base" };

export default function Button({ children, variant = "primary", size = "md", className = "", to, href, type = "button", ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-150 cursor-pointer border font-body disabled:opacity-50 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button type={type} className={cls} {...props}>{children}</button>;
}
