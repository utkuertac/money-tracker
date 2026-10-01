/**
 * Bir gelir veya gider kaydı.
 *
 * @typedef {Object} Transaction
 * @property {string} id           Benzersiz kimlik
 * @property {'income'|'expense'} type  Kayıt türü: gelir veya gider
 * @property {string} description  Açıklama (ör. "Market alışverişi")
 * @property {number} amount       Tutar, her zaman pozitif (TL)
 * @property {string} category     Kategori (türe göre listeden seçilir)
 * @property {string} date         İşlem tarihi, YYYY-AA-GG biçiminde
 */

export const TRANSACTION_TYPES = {
  income: 'Gelir',
  expense: 'Gider',
}

export const CATEGORIES = {
  income: ['Maaş', 'Ek Gelir', 'Yatırım', 'Hediye', 'Diğer'],
  expense: ['Market', 'Fatura', 'Kira', 'Ulaşım', 'Yeme-İçme', 'Sağlık', 'Eğlence', 'Alışveriş', 'Diğer'],
}

/**
 * Formun boş hali.
 * @returns {Omit<Transaction, 'id'>}
 */
export function createEmptyTransaction() {
  return {
    type: 'expense',
    description: '',
    amount: '',
    category: CATEGORIES.expense[0],
    date: todayLocal(),
  }
}

/**
 * Bugünün tarihi, kullanıcının saat dilimine göre YYYY-AA-GG.
 * (toISOString() UTC döndürdüğü için Türkiye'de 00:00-03:00 arası bir önceki günü verir.)
 */
function todayLocal() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}
