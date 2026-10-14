import { Link, useNavigate, useParams } from 'react-router'
import TransactionForm from '../Components/TransactionForm'
import { getTransaction, updateTransaction } from '../Services/transactionService'

function EditTransactionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const transaction = getTransaction(id)

  if (!transaction) {
    return (
      <div className="text-center py-5">
        <h1 className="h4">Kayıt bulunamadı</h1>
        <p className="text-secondary">Bu kayıt silinmiş olabilir.</p>
        <Link className="btn btn-primary" to="/">
          Kayıtlara dön
        </Link>
      </div>
    )
  }

  function handleSubmit(data) {
    updateTransaction(id, data)
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h1 className="h3 mb-4">Kaydı Düzenle</h1>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <TransactionForm
              initialValues={transaction}
              submitLabel="Güncelle"
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTransactionPage
