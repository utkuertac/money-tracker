const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

/** @param {number} amount */
export function formatMoney(amount) {
  return currency.format(amount)
}

/** "2026-10-01" → "01.10.2026" */
export function formatDate(date) {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}
