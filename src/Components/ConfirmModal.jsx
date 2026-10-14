/**
 * Basit onay penceresi. `show` false iken hiçbir şey çizmez.
 * @param {{ show: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void }} props
 */
function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" onClick={onCancel}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5">{title}</h2>
              <button type="button" className="btn-close" aria-label="Kapat" onClick={onCancel} />
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Vazgeç
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirm}>
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}

export default ConfirmModal
