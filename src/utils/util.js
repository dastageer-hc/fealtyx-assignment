export const formatPrice = (priceStr = "") => {
  const num = parseInt(priceStr.replace(/[^\d]/g, ""));
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M ";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k ";
  return num.toLocaleString();
};

export const formatRating = (ratingStr) => {
  const stars = ratingStr.length;
  return `${stars}.0 ⭐`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }); // "Mar"
  const year = date.getFullYear().toString().slice(-2); // "24"
  return `${day}-${month}-${year}`;
};
