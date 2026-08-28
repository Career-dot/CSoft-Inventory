
import { useState } from "react";
import {
  ArrowUpFromLine,
  Trash2,
  Package,
  User,
  ClipboardList,
  CalendarDays,
} from "lucide-react";
import { products as initialProducts } from "../data/dummyData";

function StockOut() {
  const savedProducts = localStorage.getItem("csoft_products");
  const savedEntries = localStorage.getItem("csoft_stock_out");

  const [products, setProducts] = useState(
    savedProducts ? JSON.parse(savedProducts) : initialProducts
  );

  const [entries, setEntries] = useState(
    savedEntries ? JSON.parse(savedEntries) : []
  );

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("Sale");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productId === "" || quantity === "") {
      alert("Please select a product and enter quantity");
      return;
    }

    const selectedProduct = products.find(
      (product) => String(product.id) === String(productId)
    );

    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    const qty = Number(quantity);
    const currentStock = Number(selectedProduct.stock);

    if (qty <= 0) {
      alert("Quantity must be greater than zero");
      return;
    }

    if (qty > currentStock) {
      alert(`Only ${currentStock} units are available`);
      return;
    }

    const updatedProducts = products.map((product) => {
      if (String(product.id) === String(productId)) {
        return {
          ...product,
          stock: Number(product.stock) - qty,
        };
      }

      return product;
    });

    setProducts(updatedProducts);

    localStorage.setItem(
      "csoft_products",
      JSON.stringify(updatedProducts)
    );

    const newEntry = {
      id: Date.now(),
      product: selectedProduct.name,
      sku: selectedProduct.sku,
      quantity: qty,
      reason,
      recipient: recipient || "N/A",
      date: new Date().toLocaleDateString(),
    };

    const updatedEntries = [newEntry, ...entries];

    setEntries(updatedEntries);

    localStorage.setItem(
      "csoft_stock_out",
      JSON.stringify(updatedEntries)
    );

    alert("Stock removed successfully");

    setProductId("");
    setQuantity("");
    setReason("Sale");
    setRecipient("");
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(
      (entry) => entry.id !== id
    );

    setEntries(updatedEntries);

    localStorage.setItem(
      "csoft_stock_out",
      JSON.stringify(updatedEntries)
    );
  };

  return (
    <div className="stock-out-page">

      {/* Page Header */}
      <div className="page-heading">
        <div>
          <h1>Stock Out</h1>
          <p>Remove products from your inventory</p>
        </div>

        <div className="heading-badge">
          <ArrowUpFromLine size={18} />
          Outgoing Stock
        </div>
      </div>

      {/* Form Card */}
      <div className="panel stock-out-form">

        <div className="form-title">
          <div className="form-icon out">
            <ArrowUpFromLine size={21} />
          </div>

          <div>
            <h2>Remove Stock</h2>
            <p>Record an outgoing inventory transaction</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Product */}
            <label className="input-group">
              <span>
                <Package size={16} />
                Product
              </span>

              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name} — Stock: {product.stock}
                  </option>
                ))}
              </select>
            </label>

            {/* Quantity */}
            <label className="input-group">
              <span>
                <ClipboardList size={16} />
                Quantity
              </span>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </label>

            {/* Reason */}
            <label className="input-group">
              <span>
                <ArrowUpFromLine size={16} />
                Reason
              </span>

              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Sale">Sale</option>
                <option value="Damaged">Damaged</option>
                <option value="Return">Return</option>
                <option value="Transfer">Transfer</option>
              </select>
            </label>

            {/* Recipient */}
            <label className="input-group">
              <span>
                <User size={16} />
                Customer / Recipient
              </span>

              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter customer name"
              />
            </label>

          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button stock-out-button"
            >
              <ArrowUpFromLine size={18} />
              Remove Stock
            </button>
          </div>

        </form>
      </div>

      {/* History */}
      <div className="panel stock-history">

        <div className="panel-header">
          <div>
            <h2>Stock Out History</h2>
            <p>Track all outgoing inventory transactions</p>
          </div>

          <div className="history-count">
            {entries.length} Transactions
          </div>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Recipient</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {entries.length === 0 ? (

                <tr>
                  <td colSpan="7" className="empty-state">
                    <div>
                      <Package size={35} />
                      <strong>No stock-out transactions</strong>
                      <span>
                        Transactions will appear here after removing stock.
                      </span>
                    </div>
                  </td>
                </tr>

              ) : (

                entries.map((entry) => (

                  <tr key={entry.id}>

                    <td>
                      <div className="product-cell">
                        <div className="product-icon">
                          <Package size={17} />
                        </div>

                        <strong>{entry.product}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="sku-badge">
                        {entry.sku}
                      </span>
                    </td>

                    <td>
                      <span className="quantity-out">
                        -{entry.quantity}
                      </span>
                    </td>

                    <td>
                      <span className={`reason-badge ${entry.reason.toLowerCase()}`}>
                        {entry.reason}
                      </span>
                    </td>

                    <td>
                      <div className="recipient-cell">
                        <User size={15} />
                        {entry.recipient}
                      </div>
                    </td>

                    <td>
                      <div className="date-cell">
                        <CalendarDays size={15} />
                        {entry.date}
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteEntry(entry.id)}
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default StockOut;
