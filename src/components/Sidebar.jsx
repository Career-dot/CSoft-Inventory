import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Boxes,
  Warehouse,
  ArrowDownToLine,
  ArrowUpFromLine,
  TriangleAlert,
  Users,
  BarChart3,
  X,
  ClipboardList
} from "lucide-react";

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    to: "/products",
    label: "Products",
    icon: Package
  },
  {
    to: "/stock",
    label: "Stock",
    icon: Boxes
  },
  {
    to: "/warehouses",
    label: "Warehouses",
    icon: Warehouse
  },
  {
    to: "/stock-in",
    label: "Stock In",
    icon: ArrowDownToLine
  },
  {
    to: "/stock-out",
    label: "Stock Out",
    icon: ArrowUpFromLine
  },
  {
    to: "/low-stock",
    label: "Low Stock",
    icon: TriangleAlert
  },
  {
    to: "/suppliers",
    label: "Suppliers",
    icon: Users
  },
  {
    to: "/reports",
    label: "Reports",
    icon: BarChart3
  }
];

function Sidebar({ open, onClose }) {

  return (
    <aside
      className={`sidebar ${
        open ? "sidebar-open" : ""
      }`}
    >

      <div className="sidebar-brand">

        <div className="brand-mark">
          <ClipboardList size={22} />
        </div>

        <div>
          <strong>CSOFT</strong>
          <span>Inventory</span>
        </div>

        <button
          className="mobile-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

      </div>

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-nav">

        {links.map(
          ({ to, label, icon: Icon }) => (

            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={19} />

              <span>{label}</span>

              {label === "Low Stock" && (
                <b className="nav-badge">
                  12
                </b>
              )}

            </NavLink>

          )
        )}

      </nav>

      <div className="sidebar-bottom">

        <div className="help-card">

          <div className="help-icon">
            ?
          </div>

          <div>
            <strong>Need help?</strong>
            <span>Contact support</span>
          </div>

        </div>

        <p>© 2026 CSOFT</p>

      </div>

    </aside>
  );
}

export default Sidebar;