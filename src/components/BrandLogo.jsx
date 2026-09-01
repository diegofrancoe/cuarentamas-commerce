import { Link } from "react-router-dom";
import brandLogo from "../assets/brand/logo-40plus.jpg";
import brandLogoGreen from "../assets/brand/logo-40plus-green.jpg";

const BrandLogo = ({ className = "", to, variant = "cream" }) => {
  const classes = `brand-mark brand-mark--${variant} ${className}`.trim();
  const logoSource = variant === "green" ? brandLogoGreen : brandLogo;
  const image = <img src={logoSource} alt="" width="1322" height="864" />;

  if (to) {
    return (
      <Link to={to} className={classes} aria-label="Cuarenta Más, ir al inicio">
        {image}
      </Link>
    );
  }

  return <div className={classes} role="img" aria-label="Cuarenta Más">{image}</div>;
};

export default BrandLogo;
