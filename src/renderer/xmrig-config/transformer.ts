/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */

const CUSTOM_MAPPING_TO_JSON: Record<string, string> = {
  'one-gb-pages': '1gb-pages',
};

const CUSTOM_MAPPING_FROM_JSON: Record<string, string> = Object.entries(CUSTOM_MAPPING_TO_JSON)
  .reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});

const VALUE_MAPPING_TO_JSON: Record<string, unknown> = {
  'true': true,
  'false': false,
  'null': null,
};

export const transformKeys = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  const tmp: Record<string, unknown> = {};
  Object.keys(obj).forEach((k) => {
    let newValue = obj[k];
    if (typeof newValue === 'number' && Number.isNaN(newValue) === true) {
      newValue = null;
    }
    if (typeof newValue === 'string' &&  Object.keys(VALUE_MAPPING_TO_JSON).includes(newValue)) {
      newValue = VALUE_MAPPING_TO_JSON[newValue as string];
    }

    let newKey = k.replaceAll(/([A-Z])/g, '-$&').toLowerCase();
    if (CUSTOM_MAPPING_TO_JSON[newKey]) {
      newKey = CUSTOM_MAPPING_TO_JSON[newKey];
    }
    if (newKey[0] === "_" && newValue !== null) {
      const orgKey = newKey.slice(1);
      if (tmp[orgKey])  {
        tmp[orgKey] = newValue;
      }
    } else {
      tmp[newKey] = newValue;
    }
  });
  return tmp;
};
