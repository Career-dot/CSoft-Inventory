import { useState } from "react";

import {
  ArrowDownToLine,
  Package,
  Warehouse,
  Hash,
  Calendar,
  FileText,
  Plus,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { products as initialProducts } from "../data/dummyData";

function StockIn() {
  const savedProducts = localStorage.getItem("csoft_products");

  const [products, setProducts] = useState(() => {
    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
  });

  const [formData, setFormData] = useState({
    productId: "",
    warehouse: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  });

  const selectedProduct = products.find(
    (product) =>
      String(product.id) === String(formData.productId)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productId") {
      const product = products.find(
        (item) =>
          String(item.id) === String(value)
      );

      setFormData((prev) => ({
        ...prev,
        productId: value,
        warehouse: product?.warehouse || "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productId) {
      alert("Please select a product");
      return;
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    const quantity = Number(formData.quantity);

    const updatedProducts = products.map((product) => {
      if (
        String(product.id) ===
        String(formData.productId)
      ) {
        return {
          ...product,
          stock:
            Number(product.stock || 0) +
            quantity,
          warehouse:
            formData.warehouse ||
            product.warehouse,
        };
      }

      return product;
    });

    setProducts(updatedProducts);

    localStorage.setItem(
      "csoft_products",
      JSON.stringify(updatedProducts)
    );

    const savedStockIn = localStorage.getItem(
      "csoft_stock_in"
    );

    const stockInHistory = savedStockIn
      ? JSON.parse(savedStockIn)
      : [];

    const newTransaction = {
      id: Date.now(),
      type: "Stock In",
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      warehouse: formData.warehouse,
      quantity,
      date: formData.date,
      reference:
        formData.reference ||
        `STK-IN-${Date.now()}`,
      notes: formData.notes,
    };

    localStorage.setItem(
      "csoft_stock_in",
      JSON.stringify([
        newTransaction,
        ...stockInHistory,
      ])
    );

    alert(
      `${quantity} units successfully added to stock!`
    );

    setFormData({
      productId: "",
      warehouse: "",
      quantity: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
      reference: "",
      notes: "",
    });
  };

  return (
    <div className="stock-in-page">

      {/* PAGE HEADER */}

      <div className="page-heading">

        <div>
          <div className="stock-page-title">

            <div className="stock-page-icon">
              <ArrowDownToLine size={24} />
            </div>

            <div>
              <h1>Stock In</h1>

              <p>
                Add new inventory and update
                product stock levels.
              </p>
            </div>

          </div>
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="stock-in-layout">


        {/* FORM */}

        <div className="stock-in-form-card">

          <div className="stock-form-header">

            <div>
              <h2>Add Inventory</h2>

              <p>
                Enter the product details and
                quantity received.
              </p>
            </div>

            <div className="stock-in-header-icon">
              <Package size={22} />
            </div>

          </div>


          <form onSubmit={handleSubmit}>


            {/* PRODUCT */}

            <div className="stock-form-section">

              <div className="stock-section-title">
                <Package size={18} />

                <span>
                  Product Information
                </span>
              </div>


              <label className="stock-field">

                Select Product

                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                >
                  <option value="">
                    Choose a product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name} ({product.sku})
                    </option>
                  ))}

                </select>

              </label>


              {selectedProduct && (

                <div className="selected-product-card">

                  <div className="selected-product-icon">
                    {selectedProduct.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>


                  <div className="selected-product-info">

                    <strong>
                      {selectedProduct.name}
                    </strong>

                    <span>
                      SKU: {selectedProduct.sku}
                    </span>

                  </div>


                  <div className="current-stock">

                    <span>
                      Current Stock
                    </span>

                    <strong>
                      {selectedProduct.stock || 0}
                    </strong>

                  </div>

                </div>

              )}

            </div>


            {/* STOCK DETAILS */}

            <div className="stock-form-section">

              <div className="stock-section-title">
                <TrendingUp size={18} />

                <span>
                  Stock Details
                </span>
              </div>


              <div className="stock-form-grid">


                <label className="stock-field">

                  <span>
                    Quantity
                  </span>

                  <div className="stock-input-icon">

                    <Hash size={17} />

                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                    />

                  </div>

                </label>


                <label className="stock-field">

                  <span>
                    Warehouse
                  </span>

                  <div className="stock-input-icon">

                    <Warehouse size={17} />

                    <input
                      type="text"
                      name="warehouse"
                      value={formData.warehouse}
                      onChange={handleChange}
                      placeholder="Select warehouse"
                    />

                  </div>

                </label>


                <label className="stock-field">

                  <span>
                    Date Received
                  </span>

                  <div className="stock-input-icon">

                    <Calendar size={17} />

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />

                  </div>

                </label>


                <label className="stock-field">

                  <span>
                    Reference Number
                  </span>

                  <div className="stock-input-icon">

                    <FileText size={17} />

                    <input
                      type="text"
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      placeholder="Invoice / Reference"
                    />

                  </div>

                </label>

              </div>

            </div>


            {/* NOTES */}

            <div className="stock-form-section">

              <div className="stock-section-title">
                <FileText size={18} />

                <span>
                  Additional Notes
                </span>
              </div>


              <label className="stock-field">

                Notes

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional information..."
                  rows="4"
                />

              </label>

            </div>


            {/* SUBMIT */}

            <div className="stock-form-actions">

              <button
                type="submit"
                className="stock-in-submit"
              >

                <Plus size={18} />

                Add Stock

              </button>

            </div>


          </form>

        </div>


        {/* RIGHT SIDE SUMMARY */}

        <div className="stock-in-sidebar">


          <div className="stock-summary-card">

            <div className="summary-card-icon">
              <CheckCircle2 size={22} />
            </div>


            <h3>
              Stock Summary
            </h3>


            <p>
              Review your stock information
              before adding inventory.
            </p>


            <div className="summary-row">

              <span>
                Selected Product
              </span>

              <strong>
                {selectedProduct
                  ? selectedProduct.name
                  : "Not selected"}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Current Stock
              </span>

              <strong>
                {selectedProduct
                  ? selectedProduct.stock || 0
                  : 0}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Stock Adding
              </span>

              <strong className="stock-added-value">
                +{formData.quantity || 0}
              </strong>

            </div>


            <div className="summary-row total-stock-row">

              <span>
                New Total
              </span>

              <strong>
                {(Number(
                  selectedProduct?.stock || 0
                ) +
                  Number(
                    formData.quantity || 0
                  ))}
              </strong>

            </div>

          </div>


          <div className="stock-help-card">

            <h3>
              Quick Tip
            </h3>

            <p>
              Stock In increases the available
              quantity of the selected product.
              Make sure the quantity and
              warehouse are correct.
            </p>

          </div>

        </div>


      </div>

    </div>
  );
}

export default StockIn;