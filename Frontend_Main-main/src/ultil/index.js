export const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export const generateDisplayId = (id) => {
    return `HD${id.slice(-6).toUpperCase()}`;
};
export const decodeDisplayId = (displayId, originalIdList) => {
    const suffix = displayId.slice(2).toLowerCase(); // Bỏ "HD" và chuyển về chữ thường
    return originalIdList.find((id) => id.endsWith(suffix)) || null;
};
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};
