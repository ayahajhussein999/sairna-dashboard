import { NavLink } from "react-router-dom";

function Sidebar() {
  const getLinkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition",
      isActive
        ? "bg-brand-100 text-brand-900"
        : "text-white/70 hover:bg-white/5 hover:text-white",
    ].join(" ");

  const links = [
    { to: "/overview", label: "Overview", icon: "O" },
    { to: "/cities", label: "Cities", icon: "C" },
    { to: "/companies", label: "Companies", icon: "Co" },
    { to: "/trips", label: "Trips", icon: "T" },
    { to: "/bookings", label: "Bookings", icon: "B" },
    { to: "/users", label: "Users", icon: "U" },
  ];

  return (
    <aside className="flex h-screen w-[250px] min-w-[250px] flex-col overflow-hidden bg-brand-950 px-5 py-7 text-white">
      <div>
        <div className="text-[22px] font-black tracking-tight">
          SAIRNA
          <span className="text-primary">
            {" "}ADMIN
          </span>
        </div>

        <p className="mt-2 text-xs text-white/50">
          Transport Management System
        </p>
      </div>

      <nav className="mt-10 grid gap-2.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={getLinkClass}
          >
            <span className="grid size-7 place-items-center rounded-lg bg-white/10 text-[11px] font-black">
              {link.icon}
            </span>

            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5 text-[11px] leading-5 text-white/45">
        SAIRNA Dashboard
      </div>
    </aside>
  );
}

export default Sidebar;