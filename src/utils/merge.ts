import * as lodash from 'lodash';

const customizer = (objValue, srcValue) => {
  if (lodash.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const mergeObject = (object, sources) => {
  return lodash.mergeWith(object, sources, customizer);
};
