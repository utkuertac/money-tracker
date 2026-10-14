import { useNavigate } from 'react-router'
import TransactionForm from '../Components/TransactionForm'
import { createEmptyTransaction } from '../Interfaces/Transaction'
import { addTransaction } from '../Services/transactionService'

function AddTransactionPage() {
  const navigate = useNavigate()

  function handleSubmit(data) {
    addTransaction(data)
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h1 className="h3 mb-4">Yeni Kayıt</h1>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <TransactionForm
              initialValues={createEmptyTransaction()}
              submitLabel="Kaydet"
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionPage
