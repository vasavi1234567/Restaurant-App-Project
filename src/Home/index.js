import {useState, useEffect} from 'react'

import Header from '../Header'
import FoodItem from '../FoodItem'

import './index.css'

const Home = () => {
  const [isLoading, setLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeId, setActiveId] = useState('')
  const [cartItems, setItems] = useState([])

  const addItem = dish => {
    const isExists = cartItems.find(eachItem => eachItem.dishId === dish.dishId)
    if (!isExists) {
      const newDish = {...dish, quantity: 1}
      setItems(prevItem => [...prevItem, newDish])
    } else {
      setItems(prevItem =>
        prevItem.map(eachItem =>
          eachItem.dishId === dish.dishId
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      )
    }
  }

  const removeItem = dish => {
    const isExists = cartItems.find(eachItem => eachItem.dishId === dish.dishId)
    if (isExists) {
      setItems(prevItem =>
        prevItem
          .map(eachItem =>
            eachItem.dishId === dish.dishId
              ? {...eachItem, quantity: eachItem.quantity - 1}
              : eachItem,
          )
          .filter(eachItem => eachItem.quantity > 0),
      )
    }
  }

  const updatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const api =
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
        const responseApi = await fetch(api)
        const data = await responseApi.json()

        if (data.length > 0 && data[0].table_menu_list) {
          const updateData = updatedData(data[0].table_menu_list)
          setResponse(updateData)
          if (updateData.length > 0) {
            setActiveId(updateData[0].menuCategoryId)
          }
        } else {
          console.error('Unexpected API response:', data)
        }
      } catch (error) {
        console.error('Failed to fetch data from API:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApi()
  }, [])

  const onUpdateId = menuCategoryId => setActiveId(menuCategoryId)

  const renderMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () => onUpdateId(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-item ${
            eachCategory.menuCategoryId === activeId
              ? 'active-item'
              : 'menu-category'
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button className="menu-category" type="button">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderItems = () => {
    const activeItem = response.find(
      eachCategory => eachCategory.menuCategoryId === activeId,
    )

    if (!activeItem || activeItem.categoryDishes.length === 0) {
      return <p>No items found for this category.</p>
    }

    return (
      <ul className="items-list-container">
        {activeItem.categoryDishes.map(eachDish => (
          <FoodItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status">
        {' '}
      </div>
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home">
      <Header cartItems={cartItems} />
      <ul className="list-container">{renderMenuList()}</ul>
      {renderItems()}
    </div>
  )
}

export default Home
