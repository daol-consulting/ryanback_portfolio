const PrimaryButton = ({ href, children, ...props }) => {
  const className =
    "inline-flex items-center justify-center bg-accent text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-brand-light/70 hover:opacity-90 transition";

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;

