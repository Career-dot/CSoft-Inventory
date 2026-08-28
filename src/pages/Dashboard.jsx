
import {
  Package,
  Boxes,
  Warehouse,
  TriangleAlert,
  ArrowDownToLine,
  ArrowUpFromLine,
  Plus,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import StatCard from "../components/StatCard";

import {
  products,
  warehouses,
  stockChartData,
} from "../data/dummyData";

function Dashboard() {
  const lowStockProducts = products.filter(
    (product) => product.stock <= 10
  );

  return (
    <div className="dashboard-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>
          <div className="dashboard-eyebrow">
            <Activity size={14} />
            INVENTORY OVERVIEW
          </div>

          <h1>Inventory Dashboard</h1>

          <p>
            Monitor your inventory, stock movement and warehouse
            performance from one place.
          </p>
        </div>

        <button className="dashboard-add-button">
          <Plus size={18} />
          Add Product
        </button>

      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-stats">

        <StatCard
          icon={Package}
          title="Total Products"
          value="250"
          change="+12% from last month"
        />

        <StatCard
          icon={Boxes}
          title="Total Stock"
          value="2,340"
          change="+8.5% from last month"
          type="up"
        />

        <StatCard
          icon={Warehouse}
          title="Warehouses"
          value="3"
          change="All warehouses active"
        />

        <StatCard
          icon={TriangleAlert}
          title="Low Stock"
          value="12"
          change="Needs attention"
          type="danger"
        />

      </div>


      {/* =========================
          CHART + LOW STOCK
      ========================= */}

      <div className="dashboard-main-grid">

        {/* STOCK MOVEMENT */}

        <section className="dashboard-card chart-card">

          <div className="dashboard-card-header">

            <div className="card-heading">

              <div className="card-icon purple">
                <TrendingUp size={18} />
              </div>

              <div>
                <h2>Stock Movement</h2>
                <p>
                  Monthly stock in and stock out activity
                </p>
              </div>

            </div>

            <select className="dashboard-select">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>

          </div>


          <div className="dashboard-chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={stockChartData}
                barGap={8}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#eef0f6"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b93a7",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b93a7",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(99, 102, 241, 0.04)",
                  }}
                  contentStyle={{
                    border: "1px solid #e8eaf1",
                    borderRadius: "10px",
                    boxShadow:
                      "0 8px 25px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Bar
                  dataKey="stockIn"
                  name="Stock In"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="stockOut"
                  name="Stock Out"
                  fill="#06b6d4"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>


          <div className="dashboard-legend">

            <span>
              <i className="legend-purple"></i>
              Stock In
            </span>

            <span>
              <i className="legend-cyan"></i>
              Stock Out
            </span>

          </div>

        </section>


        {/* LOW STOCK */}

        <section className="dashboard-card">

          <div className="dashboard-card-header">

            <div className="card-heading">

              <div className="card-icon warning">
                <TriangleAlert size={18} />
              </div>

              <div>
                <h2>Low Stock Alerts</h2>
                <p>
                  Products requiring attention
                </p>
              </div>

            </div>

            <a
              href="/low-stock"
              className="dashboard-view-link"
            >
              View All
            </a>

          </div>


          <div className="dashboard-low-list">

            {lowStockProducts.length === 0 ? (

              <div className="dashboard-empty">
                <Package size={30} />
                <span>No low stock products</span>
              </div>

            ) : (

              lowStockProducts.map((product) => (

                <div
                  className="dashboard-low-item"
                  key={product.id}
                >

                  <div className="dashboard-product-avatar">
                    {product.name.charAt(0)}
                  </div>

                  <div className="dashboard-product-info">

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.sku}
                    </span>

                  </div>

                  <div className="dashboard-stock-danger">
                    <TriangleAlert size={13} />
                    {product.stock} left
                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </div>


      {/* =========================
          BOTTOM SECTION
      ========================= */}

      <div className="dashboard-main-grid bottom">


        {/* RECENT ACTIVITY */}

        <section className="dashboard-card">

          <div className="dashboard-card-header">

            <div className="card-heading">

              <div className="card-icon blue">
                <Activity size={18} />
              </div>

              <div>
                <h2>Recent Stock Activity</h2>
                <p>
                  Latest inventory transactions
                </p>
              </div>

            </div>

            <a
              href="/stock"
              className="dashboard-view-link"
            >
              View All
            </a>

          </div>


          <div className="dashboard-activity-list">

            <div className="dashboard-activity-row">

              <div className="activity-circle in">
                <ArrowDownToLine size={17} />
              </div>

              <div className="activity-details">
                <strong>Stock Received</strong>
                <span>
                  MacBook Pro 14 × 20
                </span>
              </div>

              <time>Today</time>

            </div>


            <div className="dashboard-activity-row">

              <div className="activity-circle out">
                <ArrowUpFromLine size={17} />
              </div>

              <div className="activity-details">
                <strong>Stock Issued</strong>
                <span>
                  Wireless Mouse × 15
                </span>
              </div>

              <time>Yesterday</time>

            </div>


            <div className="dashboard-activity-row">

              <div className="activity-circle in">
                <ArrowDownToLine size={17} />
              </div>

              <div className="activity-details">
                <strong>Stock Received</strong>
                <span>
                  USB-C Hub × 30
                </span>
              </div>

              <time>2 days ago</time>

            </div>

          </div>

        </section>


        {/* WAREHOUSE CAPACITY */}

        <section className="dashboard-card">

          <div className="dashboard-card-header">

            <div className="card-heading">

              <div className="card-icon cyan">
                <Warehouse size={18} />
              </div>

              <div>
                <h2>Warehouse Capacity</h2>
                <p>
                  Current storage utilization
                </p>
              </div>

            </div>

            <a
              href="/warehouses"
              className="dashboard-view-link"
            >
              Manage
            </a>

          </div>


          <div className="dashboard-capacity-list">

            {warehouses.map((warehouse) => (

              <div
                className="dashboard-capacity-row"
                key={warehouse.id}
              >

                <div className="capacity-info">

                  <div>
                    <strong>
                      {warehouse.name}
                    </strong>

                    <span>
                      {warehouse.stock} units
                    </span>
                  </div>

                  <b>
                    {warehouse.capacity}
                  </b>

                </div>


                <div className="dashboard-progress">

                  <i
                    style={{
                      width: warehouse.capacity,
                    }}
                  ></i>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

export default Dashboard;