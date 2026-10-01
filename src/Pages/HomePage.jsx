import { useState } from 'react'
import { Link } from 'react-router'
import ConfirmModal from '../Components/ConfirmModal'
import SummaryCards from '../Components/SummaryCards'
import TransactionList from '../Components/TransactionList'
import { deleteTransaction, getTransactions } from '../Services/transactionService'

function HomePage() {
  const [transactions, setTransactions] = useState(getTransactions)
  const [toDelete, setToDelete] = useState(null)

  function handleConfirmDelete() {
    deleteTransaction(toDelete.id)
    setTransactions(getTransactions())
    setToDelete(null)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Kayıtlar</h1>
        <Link className="btn btn-primary" to="/ekle">
          + Yeni Kayıt
        </Link>
      </div>

      <SummaryCards transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={setToDelete} />

      <ConfirmModal
        show={toDelete !== null}
        title="Kaydı sil"
        message={toDelete ? `"${toDelete.description}" kaydı silinsin mi? Bu işlem geri alınamaz.` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  )
}

export default HomePage
