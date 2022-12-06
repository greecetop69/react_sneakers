import React, { useEffect, useState } from 'react'
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"

function Card({ id, onFavorite, imageUrl, title, price, onPlus, favorited = false, added = false, loading = false, isItemAdded }) {
  const [isAdded, setIsAdded] = useState(added)
  const [isFavorite, setIsFavorite] = useState(favorited)
  


  const onClickPlus = () => {
    onPlus({ id, parentId : id, imageUrl, title, price })
    setIsAdded(!isAdded)
  }
  const onClickFavorite = () => {
    onFavorite({ id, parentId : id, imageUrl, title, price })
    setIsFavorite(!isFavorite)
  }

  useEffect(() => {
    setIsAdded(added)
  }, [added])

  return (
    <div className={styles.card}>
      {
        loading ?
          (<ContentLoader
            speed={2}
            width={155}
            height={187}
            viewBox="0 0 155 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="90" />
            <rect x="0" y="120" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="157" rx="5" ry="5" width="80" height="24" />
            <rect x="117" y="152" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>) :
          (<>
            <div className={styles.favorite} >
              {onFavorite && <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-licked.svg" : "/img/heart-unlicked.svg"} alt="unliked" />}
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers1" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="plus" />}
            </div>
          </>)

      }

    </div>
  )
}
export default Card;