import {
  FileDown,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  stockChartData,
  categoryData,
} from "../data/dummyData";

function Reports() {

  return (

    <div>

      {/* HEADER */}

      <div className="page-heading">

        <div>

          <h1>
            Reports
          </h1>

          <p>
            Analyze inventory performance and stock movement.
          </p>

        </div>


        <button className="primary-button">

          <FileDown size={18} />

          Export Report

        </button>

      </div>


      {/* SUMMARY */}

      <div className="report-summary">


        <div className="report-card">

          <span>
            Total Products
          </span>

          <strong>
            250
          </strong>

          <small>
            Across all categories
          </small>

        </div>


        <div className="report-card">

          <span>
            Total Stock Value
          </span>

          <strong>
            $184,520
          </strong>

          <small>
            Current inventory value
          </small>

        </div>


        <div className="report-card">

          <span>
            Stock Turnover
          </span>

          <strong>
            4.8x
          </strong>

          <small className="positive">

            <TrendingUp size={13} />

            6.4% improvement

          </small>

        </div>


        <div className="report-card">

          <span>
            Low Stock Items
          </span>

          <strong>
            12
          </strong>

          <small>
            Requires attention
          </small>

        </div>


      </div>


      {/* CHARTS */}

      <div className="dashboard-grid report-grid">


        {/* STOCK MOVEMENT */}

        <section className="panel large">

          <div className="panel-header">

            <div>

              <h2>
                Monthly Stock Movement
              </h2>

              <p>
                Incoming and outgoing stock
              </p>

            </div>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={stockChartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="stockIn"
                  name="Stock In"
                  fill="#4f46e5"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="stockOut"
                  name="Stock Out"
                  fill="#f59e0b"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>


        {/* CATEGORY STOCK */}

        <section className="panel">

          <div className="panel-header">

            <div>

              <h2>
                Category Stock
              </h2>

              <p>
                Units by category
              </p>

            </div>

          </div>


          <div className="category-list">

            {categoryData.map((item) => (

              <div
                className="category-row"
                key={item.name}
              >

                <div>

                  <span>
                    {item.name}
                  </span>

                  <strong>
                    {item.value}
                  </strong>

                </div>


                <div className="progress">

                  <i
                    style={{
                      width: `${Math.min(
                        item.value / 5,
                        100
                      )}%`,
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

export default Reports;