const ContentCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-brand-light rounded-2xl shadow-card ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentCard;

