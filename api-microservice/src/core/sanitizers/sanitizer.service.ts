export const sanitizeObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((sanitized, key) => {
      if (!key.startsWith('$') && !key.includes('.')) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }, {} as Record<string, any>);
  }

  return obj;
}
