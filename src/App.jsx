import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Warehouses from "./pages/Warehouses";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import LowStock from "./pages/LowStock";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">

        <Navbar
          onMenu={() => setSidebarOpen(true)}
        />

        <main className="page-content">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/stock"
              element={<Stock />}
            />

            <Route
              path="/warehouses"
              element={<Warehouses />}
            />

            <Route
              path="/stock-in"
              element={<StockIn />}
            />

            <Route
              path="/stock-out"
              element={<StockOut />}
            />

            <Route
              path="/low-stock"
              element={<LowStock />}
            />

            <Route
              path="/suppliers"
              element={<Suppliers />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

          </Routes>

        </main>

      </div>

    </div>
  );
}

export default App;