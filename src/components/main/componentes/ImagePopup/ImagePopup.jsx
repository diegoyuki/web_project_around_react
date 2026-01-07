export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>

        {card && (
          <>
            <img
              className="popup__image"
              src={card.link}
              alt={card.name}
            />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}