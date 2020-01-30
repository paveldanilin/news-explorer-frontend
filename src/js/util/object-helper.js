export default class ObjectHelper {
  static find(scope, path, delimiter) {
    const querySearch = (chunks, chunkPos, node) => {
      if (chunkPos === chunks.length) {
        return undefined;
      }

      const propertyName = chunks[chunkPos];

      if (typeof node !== 'object') {
        return undefined;
      }

      if (!(propertyName in node)) {
        return undefined;
      }

      if (node[propertyName] === null && chunkPos < chunks.length) {
        return undefined;
      }

      if (chunkPos + 1 === chunks.length) {
        return node[propertyName];
      }

      return querySearch(chunks, chunkPos + 1, node[propertyName]);
    };
    return querySearch(path.split(delimiter || '.'), 0, scope);
  }

  static setVal(scope, value, path) {
    let i;
    let valScope = scope;
    const valPath = path.split('.');

    for (i = 0; i < valPath.length - 1; i += 1) {
      valScope = valScope[valPath[i]];
      if (valScope === undefined) {
        return false;
      }
    }

    if (valScope[valPath[i]] === undefined) {
      return false;
    }

    valScope[valPath[i]] = value;

    return true;
  }

  static isPlain(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
}
