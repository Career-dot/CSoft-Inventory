import {
  Warehouse,
  MapPin,
  Package,
  MoreVertical,
} from "lucide-react";

import { warehouses } from "../data/dummyData";

function Warehouses() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Warehouses</h1>
          <p>Manage your storage locations and warehouse capacity.</p>
        </div>

        <button className="primary-button">
          + Add Warehouse
        </button>
      </div>

      <div className="warehouse-cards">
        {warehouses.map((warehouse) => (
          <div className="warehouse-card panel" key={warehouse.id}>

            <div className="warehouse-top">
              <div className="warehouse-icon">
                <Warehouse size={22} />
              </div>

              <button className="icon-button">
                <MoreVertical size={18} />
              </button>
            </div>

            <h2>{warehouse.name}</h2>

            <p>
              <MapPin size={14} />
              {warehouse.location}
            </p>

            <div className="warehouse-stats">

              <div>
                <span>Products</span>
                <strong>{warehouse.products}</strong>
              </div>

              <div>
                <span>Total Units</span>
                <strong>{warehouse.stock}</strong>
              </div>

            </div>

            <div className="capacity-label">
              <span>Storage Capacity</span>
              <b>{warehouse.capacity}</b>
            </div>

            <div className="progress">
              <i
                style={{
                  width: warehouse.capacity,
                }}
              ></i>
            </div>

          </div>
        ))}
      </div>

      <div className="panel warehouse-overview">

        <div className="panel-header">
          <div>
            <h2>Warehouse Overview</h2>
            <p>Summary of all warehouse inventory</p>
          </div>
        </div>

        <div className="warehouse-overview-content">

          {warehouses.map((warehouse) => (
            <div
              className="overview-row"
              key={warehouse.id}
            >
              <div className="product-mini">
                <Package size={17} />
              </div>

              <div className="low-info">
                <strong>{warehouse.name}</strong>
                <span>{warehouse.location}</span>
              </div>

              <strong>{warehouse.stock} units</strong>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Warehouses;