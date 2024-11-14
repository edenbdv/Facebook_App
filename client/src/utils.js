// src/utils.js

//add prefix, allowing to see pictures:
export const addPrefixIfNeeded = (url) => {
    if (!url) {
        return '';
    }
    const prefix = 'data:image/jpeg;base64,';
    return url.startsWith(prefix) ? url : prefix + url;
};

//convert iso foramt to regular format of date:
export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

