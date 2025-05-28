import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const columns = [
    { key: 'product', label: 'Product', priority: 1, className: '' },
    { key: 'brief', label: 'Brief Description', priority: 2, className: 'brief' },
    { key: 'description', label: 'Detailed Description', priority: 3, className: 'desc' },
    { key: 'price', label: 'Price', priority: 2, className: 'price' },
    { key: 'launchDate', label: 'Launch Date', priority: 3, className: 'launch' },
    { key: 'orders', label: 'Orders', priority: 3, className: 'orders' },
    { key: 'inventory', label: 'Inventory', priority: 3, className: 'inventory' },
    { key: 'category', label: 'Category', priority: 2, className: 'category' },
    { key: 'supplier', label: 'Supplier', priority: 3, className: 'supplier' },
    { key: 'rating', label: 'Rating', priority: 2, className: 'rating' },
    { key: 'status', label: 'Status', priority: 1, className: '' },
    { key: 'expand', label: 'Expand', priority: 1, className: '' }
  ];

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const products = [
    {
      id: 101,
      image: "https://picsum.photos/200/300",
      name: "iPhone 15",
      brief: "Latest Apple flagship phone",
      description: "The iPhone 15 comes with the latest A16 Bionic chip, a new Dynamic Island, and a high-resolution Super Retina XDR display.",
      price: "₹80,000",
      launchDate: "2024-03-15",
      orders: 5000,
      inventory: 150,
      category: "Mobile",
      supplier: "Apple Inc.",
      rating: "⭐⭐⭐⭐⭐",
      status: "Active"
    },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.className}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr>
                {columns.map(col => (
                  <td key={col.key} className={col.className}>
                    {col.key === 'product' ? (
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px", borderRadius: "5px", border: '1px solid grey', padding: '1px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'flex-start' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bolder', textWrap: 'nowrap' }}> <strong>
                            {product?.name}
                          </strong>
                          </span>
                          <span style={{ color: 'gray' }}>#Id:{product.id}</span>
                        </div>
                      </div>
                    ) : col.key === 'expand' ? (
                      <span
                        className="expand-btn"
                        onClick={() => toggleRow(product.id)}
                      >
                        {expandedRows[product.id] ? '-' : '+'}
                      </span>
                    ) : (
                      product[col.key]
                    )}
                  </td>
                ))}
              </tr>
              {expandedRows[product.id] && (
                <tr className="hidden-row">
                  <td colSpan={columns.length}>
                    {columns
                      .filter(col => col.key !== 'product' && col.key !== 'expand')
                      .map(col => (
                        <div key={col.key}>
                          <strong>{col.label}:</strong> {product[col.key]}
                        </div>
                      ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;