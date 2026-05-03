const TagChip = ({ label }) => {
  return (
    <span className="inline-flex items-center bg-brand-chip border border-brand-light rounded-full px-3 py-0.5">
      <span className="text-[12px] font-semibold text-accent tracking-tight leading-none">
        #{label}
      </span>
    </span>
  );
};

export default TagChip;

