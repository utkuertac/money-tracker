import { Fragment, useState } from 'react'
import { CATEGORIES, TRANSACTION_TYPES } from '../Interfaces/Transaction'

const MAX_AMOUNT = 1_000_000_000_000

/**
 * Ekleme ve düzenleme sayfalarının ortak formu.
 * @param {{
 *   initialValues: Omit<import('../Interfaces/Transaction').Transaction, 'id'>,
 *   submitLabel: string,
 *   onSubmit: (data: Omit<import('../Interfaces/Transaction').Transaction, 'id'>) => void,
 *   onCancel: () => void
 * }} props
 */
function TransactionForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    // Düzeltilen alanın hata mesajı kalkar
    if (errors[name]) setErrors({ ...errors, [name]: undefined })
    // Tür değişince kategori de o türün ilk kategorisine geçer
    if (name === 'type') {
      setValues({ ...values, type: value, category: CATEGORIES[value][0] })
    } else {
      setValues({ ...values, [name]: value })
    }
  }

  function validate() {
    const newErrors = {}
    if (!values.description.trim()) newErrors.description = 'Açıklama boş bırakılamaz.'
    const amount = Number(values.amount)
    if (!(amount > 0)) newErrors.amount = "Tutar 0'dan büyük olmalı."
    // "1e309" gibi girdiler Infinity olur ve localStorage'a null olarak kaydedilir
    else if (!Number.isFinite(amount) || amount > MAX_AMOUNT) newErrors.amount = 'Tutar çok büyük.'
    if (!values.date) newErrors.date = 'Tarih seçin.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit({
      ...values,
      description: values.description.trim(),
      // Kuruş hassasiyetine yuvarla (ör. 10.005 → 10.01)
      amount: Math.round(Number(values.amount) * 100) / 100,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <span className="form-label d-block">Tür</span>
        <div className="btn-group w-100" role="group">
          {Object.entries(TRANSACTION_TYPES).map(([type, label]) => (
            <Fragment key={type}>
              <input
                type="radio"
                className="btn-check"
                id={`type-${type}`}
                name="type"
                value={type}
                checked={values.type === type}
                onChange={handleChange}
              />
              <label
                htmlFor={`type-${type}`}
                className={`btn ${type === 'income' ? 'btn-outline-success' : 'btn-outline-danger'}`}
              >
                {label}
              </label>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Açıklama
        </label>
        <input
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="ör. Market alışverişi"
          value={values.description}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errors.description}</div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="amount" className="form-label">
            Tutar (₺)
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            placeholder="0,00"
            value={values.amount}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.amount}</div>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="date" className="form-label">
            Tarih
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            value={values.date}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.date}</div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="form-label">
          Kategori
        </label>
        <select id="category" name="category" className="form-select" value={values.category} onChange={handleChange}>
          {CATEGORIES[values.type].map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Vazgeç
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
