import { Link } from 'react-router'
import { TRANSACTION_TYPES } from '../Interfaces/Transaction'
import { formatDate, formatMoney } from '../Utils/format'

/**
 * @param {{
 *   transactions: import('../Interfaces/Transaction').Transaction[],
 *   onDelete: (transaction: import('../Interfaces/Transaction').Transaction) => void
 * }} props
 */
function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-secondary border rounded p-5">
        <p className="mb-3">Henüz kayıt yok.</p>
        <Link className="btn btn-primary" to="/ekle">
          İlk kaydı ekle
        </Link>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Tarih</th>
            <th>Açıklama</th>
            <th>Kategori</th>
            <th>Tür</th>
            <th className="text-end">Tutar</th>
            <th className="text-end">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const isIncome = t.type === 'income'
            return (
              <tr key={t.id}>
                <td className="text-nowrap">{formatDate(t.date)}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>
                  <span className={`badge ${isIncome ? 'text-bg-success' : 'text-bg-danger'}`}>
                    {TRANSACTION_TYPES[t.type]}
                  </span>
                </td>
                <td className={`text-end text-nowrap fw-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
                  {isIncome ? '+' : '−'}
                  {formatMoney(t.amount)}
                </td>
                <td className="text-end text-nowrap">
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/duzenle/${t.id}`}>
                    Düzenle
                  </Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t)}>
                    Sil
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
