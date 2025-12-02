const FloatingInput = ({ label, icon, children }) => (
  <div className="bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white">
    <label className="text-xs text-white/80 flex items-center gap-1 mb-1">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default FloatingInput;
