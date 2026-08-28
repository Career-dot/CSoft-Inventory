import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  Package
} from "lucide-react";

import DataTable from "../components/DataTable";

import {
  stockIn,
  stockOut
} from "../data/dummyData";

function Stock() {

  const transactions = [

    ...stockIn.map((item) => ({
      ...item,
      type: "Stock In",
      movement: item.quantity
    })),

    ...stockOut.map((item) => ({
      ...item,
      type: "Stock Out",
      movement: -item.quantity
    }))

  ];


  const columns = [

    {
      key: "product",
      label: "Product",
      render: (row) => (
        <strong>
          {row.product}
        </strong>
      )
    },

    {
      key: "type",
      label: "Movement",
      render: (row) => (

        <span
          className={`status ${
            row.type === "Stock In"
              ? "success"
              : "warning"
          }`}
        >

          {row.type === "Stock In"
            ? "Stock In"
            : "Stock Out"}

        </span>

      )
    },

    {
      key: "movement",
      label: "Quantity",
      render: (row) => (

        <span
          className={
            row.movement > 0
              ? "quantity in"
              : "quantity out"
          }
        >

          {row.movement > 0
            ? `+${row.movement}`
            : row.movement}

        </span>

      )
    },

    {
      key: "warehouse",
      label: "Warehouse"
    },

    {
      key: "date",
      label: "Date"
    }

  ];


  return (

    <div>

      {/* HEADER */}

      <div className="page-heading">

        <div>

          <h1>
            Stock Management
          </h1>

          <p>
            Monitor stock levels and inventory movements.
          </p>

        </div>

      </div>


      {/* STOCK SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">

            <Boxes size={22} />

          </div>

          <div className="stat-content">

            <span>
              Total Stock
            </span>

            <strong>
              2,340
            </strong>

            <small className="positive">
              Units available
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon up">

            <ArrowDownToLine size={22} />

          </div>

          <div className="stat-content">

            <span>
              Stock In
            </span>

            <strong>
              780
            </strong>

            <small className="positive">
              This month
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon danger">

            <ArrowUpFromLine size={22} />

          </div>

          <div className="stat-content">

            <span>
              Stock Out
            </span>

            <strong>
              470
            </strong>

            <small className="negative">
              This month
            </small>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">

            <Package size={22} />

          </div>

          <div className="stat-content">

            <span>
              Stock Value
            </span>

            <strong>
              $184K
            </strong>

            <small className="positive">
              Current value
            </small>

          </div>

        </div>

      </div>


      {/* TRANSACTIONS */}

      <section className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Stock Transactions
            </h2>

            <p>
              Recent inventory movements
            </p>

          </div>

        </div>


        <DataTable
          columns={columns}
          data={transactions}
        />

      </section>

    </div>

  );
}

export default Stock;