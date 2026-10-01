import { formatMoney } from '../Utils/format'

/** @param {{ transactions: import('../Interfaces/Transaction').Transaction[] }} props */
function SummaryCards({ transactions }) {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expense

  const cards = [
    { title: 'Toplam Gelir', value: income, className: 'text-success' },
    { title: 'Toplam Gider', value: expense, className: 'text-danger' },
    { title: 'Bakiye', value: balance, className: balance < 0 ? 'text-danger' : 'text-primary' },
  ]

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-12 col-md-4" key={card.title}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 text-secondary mb-2">{card.title}</h2>
              <p className={`fs-3 fw-bold mb-0 ${card.className}`}>{formatMoney(card.value)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
