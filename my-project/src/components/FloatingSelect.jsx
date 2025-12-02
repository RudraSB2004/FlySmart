const FloatingSelect = ({ label, icon, children, name, onChange, value }) => (
  <div className="bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white">
    <label className="text-xs text-white/80 flex items-center gap-1 mb-1">
      {icon} {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full bg-[#101b33] text-white p-2 rounded-lg outline-none"
    >
      {children}
    </select>
  </div>
);

export default FloatingSelect;
