const Info = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-white/90">
    {icon}
    <span>{text}</span>
  </div>
);

export default Info;
