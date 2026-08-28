import { useState } from "react";
import {
  Plus,
  Mail,
  Phone,
  Pencil,
  Trash2,
  Search,
  X,
  Building2,
  Package,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import DataTable from "../components/DataTable";
import { suppliers as initialSuppliers } from "../data/dummyData";

function Suppliers() {
  const savedSuppliers = localStorage.getItem("csoft_suppliers");

  const [supplierData, setSupplierData] = useState(() => {
    return savedSuppliers
      ? JSON.parse(savedSuppliers)
      : initialSuppliers;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const initialFormState = {
    name: "",
    company: "",
    contact: "",
    email: "",
    products: "",
    address: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormState);

  const saveSuppliers = (updatedSuppliers) => {
    setSupplierData(updatedSuppliers);

    localStorage.setItem(
      "csoft_suppliers",
      JSON.stringify(updatedSuppliers)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingSupplier(null);
    setFormData(initialFormState);
    setShowForm(true);
  };

  const openEditForm = (supplier) => {
    setEditingSupplier(supplier);

    setFormData({
      name: supplier.name || "",
      company: supplier.company || "",
      contact: supplier.contact || "",
      email: supplier.email || "",
      products: supplier.products || "",
      address: supplier.address || "",
      status: supplier.status || "Active",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSupplier(null);
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.contact.trim() ||
      !formData.email.trim()
    ) {
      alert(
        "Please enter Supplier Name, Contact Number and Email Address."
      );
      return;
    }

    if (editingSupplier) {
      const updatedSuppliers = supplierData.map(
        (supplier) =>
          supplier.id === editingSupplier.id
            ? {
                ...supplier,
                ...formData,
              }
            : supplier
      );

      saveSuppliers(updatedSuppliers);

      alert("Supplier updated successfully!");
    } else {
      const newSupplier = {
        id: Date.now(),
        ...formData,
      };

      const updatedSuppliers = [
        newSupplier,
        ...supplierData,
      ];

      saveSuppliers(updatedSuppliers);

      alert("Supplier added successfully!");
    }

    closeForm();
  };

  const deleteSupplier = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    const updatedSuppliers = supplierData.filter(
      (supplier) => supplier.id !== id
    );

    saveSuppliers(updatedSuppliers);

    alert("Supplier deleted successfully!");
  };

  const filteredSuppliers = supplierData.filter(
    (supplier) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        supplier.name
          ?.toLowerCase()
          .includes(searchValue) ||
        supplier.company
          ?.toLowerCase()
          .includes(searchValue) ||
        supplier.email
          ?.toLowerCase()
          .includes(searchValue) ||
        supplier.contact
          ?.toLowerCase()
          .includes(searchValue) ||
        supplier.products
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const totalSuppliers = supplierData.length;

  const activeSuppliers = supplierData.filter(
    (supplier) => supplier.status === "Active"
  ).length;

  const inactiveSuppliers = supplierData.filter(
    (supplier) => supplier.status === "Inactive"
  ).length;

  const columns = [
    {
      key: "name",
      label: "Supplier",

      render: (row) => (
        <div className="supplier-info">
          <strong>{row.name}</strong>

          {row.company && (
            <span>{row.company}</span>
          )}
        </div>
      ),
    },

    {
      key: "contact",
      label: "Contact",

      render: (row) => (
        <span className="contact-cell">
          <Phone size={15} />
          {row.contact}
        </span>
      ),
    },

    {
      key: "email",
      label: "Email",

      render: (row) => (
        <span className="contact-cell">
          <Mail size={15} />
          {row.email}
        </span>
      ),
    },

    {
      key: "products",
      label: "Products Supplied",

      render: (row) => (
        <span className="products-cell">
          <Package size={15} />
          {row.products || "Not specified"}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (
        <span
          className={
            row.status === "Active"
              ? "status success"
              : "status danger"
          }
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Actions",

      render: (row) => (
        <div className="table-actions">
          <button
            className="table-icon-button edit-button"
            onClick={() => openEditForm(row)}
            title="Edit Supplier"
          >
            <Pencil size={15} />
          </button>

          <button
            className="table-icon-button delete-button"
            onClick={() => deleteSupplier(row.id)}
            title="Delete Supplier"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="suppliers-page">

      {/* Page Heading */}

      <div className="page-heading">
        <div>
          <h1>Suppliers</h1>

          <p>
            Manage supplier information, contacts and supplied products.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Supplier
        </button>
      </div>


      {/* Statistics */}

      <div className="supplier-stats">

        <div className="card">
          <div className="stat-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Suppliers</span>
            <h2>{totalSuppliers}</h2>
          </div>
        </div>


        <div className="supplier-stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Active Suppliers</span>
            <h2>{activeSuppliers}</h2>
          </div>
        </div>


        <div className="supplier-stat-card">
          <div className="stat-icon">
            <XCircle size={22} />
          </div>

          <div>
            <span>Inactive Suppliers</span>
            <h2>{inactiveSuppliers}</h2>
          </div>
        </div>

      </div>


      {/* Add / Edit Form */}

      {showForm && (
        <div className="panel form-panel supplier-form">

          <div className="form-title">

            <div>
              <h2>
                {editingSupplier
                  ? "Edit Supplier"
                  : "Add New Supplier"}
              </h2>

              <p>
                Fill in the supplier details below.
              </p>
            </div>

            <button
              className="table-icon-button"
              onClick={closeForm}
            >
              <X size={18} />
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <label>
                Supplier Name *

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter supplier name"
                />
              </label>


              <label>
                Company Name

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </label>


              <label>
                Contact Number *

                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                />
              </label>


              <label>
                Email Address *

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="supplier@email.com"
                />
              </label>


              <label>
                Products Supplied

                <input
                  type="text"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  placeholder="Laptops, Monitors, Accessories"
                />
              </label>


              <label>
                Status

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </label>


              <label className="full-width">
                Address

                <div className="input-with-icon">
                  <MapPin size={17} />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter supplier address"
                  />
                </div>

              </label>

            </div>


            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={closeForm}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >
                {editingSupplier
                  ? "Update Supplier"
                  : "Save Supplier"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Suppliers Table */}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>All Suppliers</h2>

            <p>
              Showing {filteredSuppliers.length} of{" "}
              {supplierData.length} suppliers
            </p>
          </div>


          <div className="supplier-table-controls">

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>


            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>


        <DataTable
          columns={columns}
          data={filteredSuppliers}
        />

      </div>

    </div>
  );
}

export default Suppliers;