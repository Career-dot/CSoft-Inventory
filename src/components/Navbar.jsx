import {
  Bell,
  Search,
  Menu
} from "lucide-react";

function Navbar({ onMenu }) {

  return (
    <header className="topbar">

      <button
        className="menu-button"
        onClick={onMenu}
      >
        <Menu size={22} />
      </button>

      <div className="topbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search anything..."
        />

        <kbd>Ctrl K</kbd>

      </div>

      <div className="topbar-actions">

        <button className="icon-button notification">

          <Bell size={20} />

          <i></i>

        </button>

        <div className="profile">

          <div className="avatar">
            CS
          </div>

          <div className="profile-info">

            <strong>
              CSOFT
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;