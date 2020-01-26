import ObjectHelper from './object-helper';

export default class Text {
  static interpolate(text, scope) {
    const startSymbol = '{{';
    const endSymbol = '}}';
    const startSymbolLength = startSymbol.length;
    const endSymbolLength = endSymbol.length;
    const inputText = text.trim();
    const textLength = inputText.length;
    const concat = [];
    const expressions = [];
    const expressionPositions = [];
    let startIndex = 0;
    let endIndex = 0;
    let index = 0;

    while (index < textLength) {
      startIndex = inputText.indexOf(startSymbol, index);
      endIndex = inputText.indexOf(endSymbol, startIndex + startSymbolLength);

      if (startIndex !== -1 && endIndex !== -1) {
        if (index !== startIndex) {
          concat.push(inputText.substring(index, startIndex));
        }
        const exp = inputText.substring(startIndex + startSymbolLength, endIndex);
        expressions.push(exp);
        index = endIndex + endSymbolLength;
        expressionPositions.push(concat.length);
        concat.push('');
      } else {
        if (index !== textLength) {
          concat.push(inputText.substring(index));
        }
        break;
      }
    }

    expressionPositions.forEach((pos, expIndex) => {
      concat[pos] = ObjectHelper.find(scope, expressions[expIndex]);
    });

    return concat.join('');
  }
}
