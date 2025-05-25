export const getRandomCard = (() => {
  let cardId = 0;
  return function () {
    let value = String(Math.floor(Math.random() * 10));
    if (Math.random() > 0.7) {
      const r = Math.random();
      if (r <= 0.35) value = '+';
      else if (r <= 0.7) value = '-';
      else if (r <= 0.85) value = '*';
      else value = '/';
    }
    return {
      id: cardId++,
      value,
      fixed: false,
    };
  };
})();

export const getHandCards = () => Array.from({ length: 7 }, getRandomCard);

export const evaluateExpression = (expr) => {
  try {
    // Sanitize input: allow only digits, operators, parentheses, and whitespace
    if (!/^[\d+\-*/().\s]+$/.test(expr)) return null;

    // Replace double minus (e.g., 4--3) with + (4 + 3)
    expr = expr.replace(/--/g, '+');

    // Optionally clean up extra pluses created by -- replacement
    expr = expr.replace(/\+\+/g, '+');

    // Evaluate safely
    const result = Function('"use strict"; return (' + expr + ')')();

    return typeof result === 'number' && !Number.isNaN(result)
      ? result
      : null;
  } catch {
    return null;
  }
};