/** @typedef {import('../Interfaces/Transaction').Transaction} Transaction */

const STORAGE_KEY = 'money-tracker:transactions'

/** @returns {Transaction[]} */
function readAll() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Elle değiştirilmiş veya bozulmuş veri (dizi olmayan değer) uygulamayı çökertmesin
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

/** @param {Transaction[]} transactions */
function writeAll(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

/** Kayıtları tarihe göre yeniden eskiye sıralı döndürür. */
export function getTransactions() {
  return readAll().sort((a, b) => b.date.localeCompare(a.date))
}

/** @param {string} id */
export function getTransaction(id) {
  return readAll().find((t) => t.id === id)
}

/** @param {Omit<Transaction, 'id'>} data */
export function addTransaction(data) {
  const transaction = { ...data, id: crypto.randomUUID() }
  writeAll([...readAll(), transaction])
  return transaction
}

/**
 * @param {string} id
 * @param {Omit<Transaction, 'id'>} data
 */
export function updateTransaction(id, data) {
  writeAll(readAll().map((t) => (t.id === id ? { ...data, id } : t)))
}

/** @param {string} id */
export function deleteTransaction(id) {
  writeAll(readAll().filter((t) => t.id !== id))
}
