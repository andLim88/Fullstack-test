import * as Yup from 'yup';

export const cardValidationSchema = Yup.object().shape({
  recipientName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Recipient name is required'),
  
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
    .required('Message is required'),
  
  senderName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Sender name is required'),
});

export const validateImage = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, or GIF image' 
    };
  }

  const maxSize = 5 * 1024 * 1024; 
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File size too large. Please upload an image less than 5MB' 
    };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width < 300 || img.height < 300) {
        resolve({
          isValid: false,
          error: 'Image dimensions too small. Minimum size is 300x300 pixels'
        });
      } else if (img.width > 4000 || img.height > 4000) {
        resolve({
          isValid: false,
          error: 'Image dimensions too large. Maximum size is 4000x4000 pixels'
        });
      } else {
        resolve({ isValid: true });
      }
    };
    img.onerror = () => {
      resolve({ isValid: false, error: 'Invalid image file' });
    };
    img.src = URL.createObjectURL(file);
  });
};

export const validateTextLength = (text, maxLength) => {
  return {
    isValid: text.length <= maxLength,
    remainingChars: maxLength - text.length
  };
};

export const validateTextPosition = (position, boundaries) => {
  return {
    x: Math.max(boundaries.left, Math.min(position.x, boundaries.right)),
    y: Math.max(boundaries.top, Math.min(position.y, boundaries.bottom))
  };
};