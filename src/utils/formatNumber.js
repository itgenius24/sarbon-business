export function formatNumber(num) {
  let parts = num.toString().split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] ? '.' + parts[1] : '';

  let formatted = integerPart
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .join(' ')
    .split('')
    .reverse()
    .join('');

  return formatted + decimalPart;
}
