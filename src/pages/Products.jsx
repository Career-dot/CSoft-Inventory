import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { products as initialProducts } from "../data/dummyData";

function Products() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("csoft_products");

    return saved
      ? JSON.parse(saved)
      : initialProducts;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    warehouse: "",
  });


  /* =========================
     SAVE TO LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "csoft_products",
      JSON.stringify(products)
    );
  }, [products]);


  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  /* =========================
     OPEN ADD MODAL
  ========================= */

  const openAddModal = () => {
    setEditingProduct(null);

    setForm({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      warehouse: "",
    });

    setShowModal(true);
  };


  /* =========================
     OPEN EDIT MODAL
  ========================= */

  const openEditModal = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      warehouse: product.warehouse,
    });

    setShowModal(true);
  };


  /* =========================
     SAVE PRODUCT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.sku) {
      alert("Please enter product name and SKU.");
      return;
    }


    if (editingProduct) {

      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : product
        )
      );

    } else {

      const newProduct = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      setProducts([
        ...products,
        newProduct,
      ]);
    }

    setShowModal(false);
  };


  /* =========================
     DELETE
  ========================= */

  const deleteProduct = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts(
      products.filter(
        (product) => product.id !== id
      )
    );
  };


  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "In Stock") {
        matchesFilter = product.stock > 10;
      }

      if (filter === "Low Stock") {
        matchesFilter =
          product.stock > 0 &&
          product.stock <= 10;
      }

      if (filter === "Out of Stock") {
        matchesFilter =
          product.stock === 0;
      }

      return matchesSearch && matchesFilter;
    }
  );


  return (
    <div>

      {/* HEADER */}

      <div className="page-heading">

        <div>
          <h1>Products</h1>

          <p>
            Manage your inventory products.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>


      {/* TOOLBAR */}

      <div className="panel">

        <div className="table-toolbar">

          <div className="input-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search product or SKU..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            className="filter-select"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >

            <option value="All">
              All Products
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>

          </select>

        </div>


        {/* TABLE */}

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Product</th>

                <th>SKU</th>

                <th>Category</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Warehouse</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    No products found.
                  </td>

                </tr>

              ) : (

                filteredProducts.map(
                  (product) => {

                    const status =
                      product.stock === 0
                        ? "Out of Stock"
                        : product.stock <= 10
                        ? "Low Stock"
                        : "In Stock";


                    return (

                      <tr key={product.id}>

                        <td>

                          <div className="product-cell">

                            <div className="product-mini">
                              {product.name.charAt(0)}
                            </div>

                            <div>

                              <strong>
                                {product.name}
                              </strong>

                            </div>

                          </div>

                        </td>


                        <td>
                          {product.sku}
                        </td>


                        <td>
                          {product.category}
                        </td>


                        <td>
                          ${Number(product.price).toLocaleString()}
                        </td>


                        <td>
                          {product.stock}
                        </td>


                        <td>
                          {product.warehouse}
                        </td>


                        <td>

                          <span
                            className={`status ${
                              status === "In Stock"
                                ? "success"
                                : status === "Low Stock"
                                ? "warning"
                                : "neutral"
                            }`}
                          >
                            {status}
                          </span>

                        </td>


                        <td>

                          <div className="row-actions">

                            <button
                              onClick={() =>
                                openEditModal(product)
                              }
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>


                            <button
                              onClick={() =>
                                deleteProduct(product.id)
                              }
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="product-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  Enter product information below.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="product-form"
            >

              <label>
                Product Name

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. MacBook Pro"
                />

              </label>


              <label>
                SKU

                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="e.g. MBP-001"
                />

              </label>


              <label>
                Category

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics"
                />

              </label>


              <label>
                Price

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                />

              </label>


              <label>
                Stock

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                />

              </label>


              <label>
                Warehouse

                <select
                  name="warehouse"
                  value={form.warehouse}
                  onChange={handleChange}
                >

                  <option value="">
                    Select warehouse
                  </option>

                  <option>
                    Main Warehouse
                  </option>

                  <option>
                    Lahore Warehouse
                  </option>

                  <option>
                    Faisalabad Warehouse
                  </option>

                </select>

              </label>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Save Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;