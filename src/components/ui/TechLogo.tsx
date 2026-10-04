import Image from "next/image";

export const BRAND_MAP: Record<string, { src: string; glow: string; label: string }> = {
  python: { src: "/logos/python.svg", glow: "rgba(55, 118, 171, 0.25)", label: "Python" },
  numpy: { src: "/logos/numpy.svg", glow: "rgba(77, 171, 207, 0.25)", label: "NumPy" },
  pandas: { src: "/logos/pandas.svg", glow: "rgba(19, 7, 88, 0.25)", label: "Pandas" },
  html5: { src: "/logos/html5.svg", glow: "rgba(227, 79, 38, 0.25)", label: "HTML5" },
  css3: { src: "/logos/css3.svg", glow: "rgba(21, 114, 182, 0.25)", label: "CSS3" },
  javascript: { src: "/logos/javascript.svg", glow: "rgba(247, 223, 30, 0.3)", label: "JavaScript" },
  jquery: { src: "/logos/jquery.svg", glow: "rgba(7, 105, 173, 0.25)", label: "jQuery" },
  typescript: { src: "/logos/typescript.svg", glow: "rgba(49, 120, 198, 0.25)", label: "TypeScript" },
  react: { src: "/logos/react.svg", glow: "rgba(97, 218, 251, 0.3)", label: "React" },
  vitejs: { src: "/logos/vitejs.svg", glow: "rgba(100, 108, 255, 0.25)", label: "Vite" },
  fastapi: { src: "/logos/fastapi.svg", glow: "rgba(5, 153, 139, 0.25)", label: "FastAPI" },
  express: { src: "/logos/express.svg", glow: "rgba(0, 0, 0, 0.2)", label: "Express" },
  nodejs: { src: "/logos/nodejs.svg", glow: "rgba(51, 153, 51, 0.25)", label: "Node.js" },
  mysql: { src: "/logos/mysql.svg", glow: "rgba(68, 121, 161, 0.25)", label: "MySQL" },
  mongodb: { src: "/logos/mongodb.svg", glow: "rgba(71, 162, 72, 0.25)", label: "MongoDB" },
};

export function isBrand(logo: string): boolean {
  return logo in BRAND_MAP;
}

export function ConceptIcon({ name, size = 24 }: { name: string; size?: number }) {
  const s = size;
  const stroke = "currentColor";
  const strokeWidth = 1.5;

  switch (name) {
    case "ai":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "deployment":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
          <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
        </svg>
      );
    case "collaboration":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "leadership":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "learning":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export default function TechLogo({
  logo,
  size = 32,
  withGlow = false,
  className = "",
}: {
  logo: string;
  size?: number;
  withGlow?: boolean;
  className?: string;
}) {
  const brand = BRAND_MAP[logo];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {withGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.glow }}
          />
        )}
        <Image
          src={brand.src}
          alt={brand.label}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center text-ink ${className}`}
      style={{ width: size, height: size }}
    >
      <ConceptIcon name={logo} size={size} />
    </div>
  );
}
