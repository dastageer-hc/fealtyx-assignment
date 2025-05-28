import React, { useState } from 'react';
import './App.css';
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ImageWithSkeleton from './components/ImageWithSkeletonLoader'
import { formatDate, formatPrice, formatRating } from './utils/util'

const App = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  const columns = [
    { key: 'product', label: 'Product', priority: 1, className: '' },
    { key: 'brief', label: 'Overview', priority: 2, className: 'brief' },
    { key: 'description', label: 'Details', priority: 4, className: 'desc' },


    { key: 'price', label: 'Price', priority: 1, className: 'price' },
    { key: 'rating', label: 'Rating', priority: 1, className: 'rating' },
    { key: 'launchDate', label: 'Launch Date', priority: 3, className: 'launch' },
    { key: 'orders', label: 'Orders', priority: 4, className: 'orders' },

    { key: 'category', label: 'Category', priority: 3, className: 'category' },
    { key: 'inventory', label: 'Stock', priority: 4, className: 'inventory' },
    { key: 'supplier', label: 'Supplier', priority: 4, className: 'supplier' },
    { key: 'status', label: 'Status', priority: 2, className: '' },           // A

  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };



  const handleTooltip = (e, text) => {
    const isTouch = e.type === 'touchstart';
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;
    setTooltip({ show: true, text, x, y });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text) return '';
    const needsEllipsis = text.length > maxLength;
    const displayText = needsEllipsis ? text.slice(0, maxLength) + '...' : text;

    return (
      <span
        className={needsEllipsis ? 'truncated' : ''}
        onMouseEnter={(e) => needsEllipsis && handleTooltip(e, text)}
        onMouseLeave={hideTooltip}
        onTouchStart={(e) => needsEllipsis && handleTooltip(e, text)}
        onTouchEnd={hideTooltip}
      >
        {displayText}
      </span>
    );
  };




  const products = [
    {
      "id": 101,
      "image": "https://picsum.photos/200/300",
      "name": "iPhone 15",
      "brief": "Latest Apple flagship phone with top features and powerful processor.",
      "description": "The iPhone 15 comes with the latest A16 Bionic chip, Dynamic Island, and a high-resolution Super Retina XDR display.",
      "price": "₹900",
      "launchDate": "2024-03-15",
      "orders": 5000,
      "inventory": 150,
      "category": "Mobile",
      "supplier": "Apple Inc.",
      "rating": "⭐⭐⭐⭐⭐",
      "status": "Active"
    },
    {
      "id": 102,
      "image": "https://picsum.photos/200/301",
      "name": "Samsung Galaxy S24",
      "brief": "Premium Android phone with AI features and a stunning display.",
      "description": "The Galaxy S24 features a 6.8\" AMOLED screen, Snapdragon 8 Gen 3, and enhanced AI photo editing.",
      "price": "₹75000",
      "launchDate": "2024-02-01",
      "orders": 4200,
      "inventory": 200,
      "category": "Mobile",
      "supplier": "Samsung Electronics",
      "rating": "⭐⭐⭐⭐",
      "status": "Inactive"
    },
    {
      "id": 103,
      "image": "https://picsum.photos/200/302",
      "name": "Dell XPS 15",
      "brief": "Powerful laptop with stunning 4K display and premium design.",
      "description": "The XPS 15 is equipped with Intel i9, 32GB RAM, and 1TB SSD, designed for creators and professionals.",
      "price": "₹180000",
      "launchDate": "2024-01-20",
      "orders": 950,
      "inventory": 50,
      "category": "Laptop",
      "supplier": "Dell Inc.",
      "rating": "⭐⭐⭐⭐⭐",
      "status": "Active"
    },
    {
      "id": 104,
      "image": "https://picsum.photos/200/303",
      "name": "Sony WH-1000XM5",
      "brief": "Industry-leading noise canceling headphones with exceptional sound quality.",
      "description": "Experience premium audio and adaptive sound control with Sony’s latest flagship wireless headphones.",
      "price": "₹29990",
      "launchDate": "2023-11-10",
      "orders": 3200,
      "inventory": 80,
      "category": "Accessories",
      "supplier": "Sony Corporation",
      "rating": "⭐⭐⭐⭐⭐",
      "status": "Inactive"
    },
    {
      "id": 105,
      "image": "https://picsum.photos/200/304",
      "name": "Canon EOS R10",
      "brief": "Compact mirrorless camera for content creators and photography enthusiasts.",
      "description": "Canon’s EOS R10 offers 24MP resolution, 4K video recording, and fast autofocus in a lightweight body.",
      "price": "₹85000",
      "launchDate": "2023-10-05",
      "orders": 1100,
      "inventory": 60,
      "category": "Camera",
      "supplier": "Canon Inc.",
      "rating": "⭐⭐⭐⭐",
      "status": "Active"
    }
  ]


  return (
    <div className="table-container">
      {tooltip.show && (
        <div
          className="tooltip"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
        >
          {tooltip.text}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th className="icon-col"></th>
            {columns.map((col) => (
              <th key={col.key} className={`priority-${col.priority} ${col.className}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr>
                <td className="icon-col">
                  <button className="expand-icon" onClick={() => toggleRow(product.id)}>
                    {expandedRows[product.id] ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                </td>
                {columns.map((col) => {
                  let content;
                  if (col.key === 'product') {
                    content = (
                      <div className="product-info">
                        <ImageWithSkeleton src={product.image} alt={product.name} />
                        <div>
                          <strong>{truncateText(product.name)}</strong>
                          <div className="product-id">#Id:{product.id}</div>
                        </div>
                      </div>
                    );
                  } else if (col.key === 'price') {
                    content = formatPrice(product[col.key]) + '₹';
                  } else if (col.key === 'orders') {
                    content = formatPrice(String(product[col.key]) ?? '');
                  } else if (col.key === 'rating') {
                    content = formatRating(product[col.key]);
                  } else if (col.key === 'launchDate') {
                    content = formatDate(product[col.key])
                  }
                  else {
                    content = truncateText(String(product[col.key]));
                  }

                  return (
                    <td
                      key={col.key}
                      className={`priority-${col.priority} ${col.className} ${col.key === 'status'
                        ? product[col.key]?.toLowerCase() === 'active'
                          ? 'active-status'
                          : product[col.key]?.toLowerCase() === 'inactive'
                            ? 'inactive-status'
                            : ''
                        : ''
                        }`}
                    >
                      {content}
                    </td>

                  );
                })}
              </tr>
              {expandedRows[product.id] && (
                <tr className="expanded-row">
                  <td colSpan={columns.length + 1}>
                    {columns.map((col) => (
                      <div key={col.key} style={{ margin: '5px 0' }}>
                        <strong>{col.label}:</strong>{' '}
                        {(col.key === 'price' || col.key === 'orders')
                          ? formatPrice(product[col.key])
                          : col.key === 'rating'
                            ? formatRating(product[col.key])
                            : product[col.key]}
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
