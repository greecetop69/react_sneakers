import React from 'react'

export const Info = ( {onClose, title, image, description} ) => {
    return (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                <img src={image} alt="empty-cart" className="mb-20" width={120} />
                <h2>{title}</h2>
                <p className="pacity-6">{description}</p>
                <button onClick={() => onClose()} className="greenButton">
                    <img src="/img/arrow-left.svg" alt="Arrow" />
                    Вернуться назад
                </button>
            </div>
    )
}

export default Info
