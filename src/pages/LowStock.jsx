import {
  TriangleAlert,
  ShoppingCart,
} from "lucide-react";

import { products } from "../data/dummyData";

function LowStock() {

  const lowStockProducts = products.filter(
    (product) => product.stock <= 10
  );

  return (
    <div>

      <div className="page-heading">

        <div>
          <h1>Low Stock</h1>

          <p>
            Products that need replenishment.
          </p>
        </div>

        <div className="alert-summary">

          <TriangleAlert size={17} />

          {lowStockProducts.length} items need attention

        </div>

      </div>


      {/* ALERT */}

      <div className="alert-banner">

        <TriangleAlert size={22} />

        <div>

          <strong>
            Low stock alert
          </strong>

          <span>
            These products are below their recommended stock level.
          </span>

        </div>

      </div>


      {/* PRODUCTS */}

      <div className="low-stock-grid">

        {lowStockProducts.map((product) => (

          <div
            className="low-stock-card panel"
            key={product.id}
          >

            <div className="low-card-top">

              <div className="product-mini large">
                {product.name.charAt(0)}
              </div>

              <span className="status warning">
                Low Stock
              </span>

            </div>


            <h2>
              {product.name}
            </h2>


            <p>
              {product.sku} · {product.category}
            </p>


            <div className="stock-number">

              <strong>
                {product.stock}
              </strong>

              <span>
                units remaining
              </span>

            </div>


            <div className="progress danger">

              <i
                style={{
                  width: `${Math.min(
                    product.stock * 8,
                    100
                  )}%`,
                }}
              ></i>

            </div>


            <div className="low-card-footer">

              <span>
                {product.warehouse}
              </span>

              <button className="secondary-button">

                <ShoppingCart size={15} />

                Reorder

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LowStock;