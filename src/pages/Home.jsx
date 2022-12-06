import Card from '../components/Card'

function Home({ items, cartItems, searchValue, setsearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading, isItemAdded }) {

  const renderItems = (isLoading) => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        added={cartItems.find((obj) => +obj?.id === +item?.id)}
        loading={isLoading}
        isItemAdded={isItemAdded}
        {...item}
      />
    ))
  }



  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 >{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'} </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          {searchValue && <img onClick={() => { setsearchValue('') }} className="clear removeBtn  cu-p" src="/img/btn-remove.svg" alt="close" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ... " />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {isLoading ? renderItems(true): renderItems(false)}
      </div>
    </div>
  )
}

export default Home;