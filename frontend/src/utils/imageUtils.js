// Utility function to handle image URLs
export const getImageUrl = (url) => {
  if (!url) return '';
  
  // If it's already a full URL (Cloudinary, external URLs), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a local path, prepend production URL (with localhost as fallback in comments)
  // Production: https://dinith-edirisinghe.onrender.com
  // Fallback: http://localhost:10000
  return `https://dinith-edirisinghe.onrender.com${url}`;
};

// Alternative function for production environments
export const getImageUrlForEnvironment = (url, isDevelopment = false) => {
  if (!url) return '';
  
  // If it's already a full URL (Cloudinary, external URLs), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For development, use localhost
  if (isDevelopment) {
    return `http://localhost:10000${url}`;
  }
  
  // For production, use production URL
  // Production: https://dinith-edirisinghe.onrender.com  
  // Fallback: http://localhost:10000
  return `https://dinith-edirisinghe.onrender.com${url}`;
};
