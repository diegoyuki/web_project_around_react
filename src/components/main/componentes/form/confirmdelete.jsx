export default function ConfirmDelete({ onConfirm, onClose }) {
  return (
    <form className="popup__form" onSubmit={(e) => e.preventDefault()}>
      <button
        type="button"
        className="popup__save-button"
        onClick={onConfirm}
      >
        Sí
      </button>
    </form>
  );
}


