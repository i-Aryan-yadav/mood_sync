interface GradientBlobProps {
  variant?: "amber" | "lavender" | "rose";
  size?: string;
  className?: string;
}

const GradientBlob = ({ variant = "amber", size = "300px", className = "" }: GradientBlobProps) => {
  const variantClass = variant === "amber" ? "blob-amber" : variant === "lavender" ? "blob-lavender" : "blob-rose";
  return (
    <div
      className={`blob ${variantClass} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default GradientBlob;
