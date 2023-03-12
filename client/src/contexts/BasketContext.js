import React, { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext();

const storage = localStorage.getItem("ecommerce-basket");
const defaultBasket = storage ? JSON.parse(storage) : [];

const BasketProvider = ({ children }) => {

    const [items, setItems] = useState(defaultBasket);

    useEffect(()=>{
        localStorage.setItem("ecommerce-basket", JSON.stringify(items));
    },[items])
   

    const addToBasket = (data) => {

     
       
        const itemInBasket = items.find((item) => item._id === data._id);

        
        if (itemInBasket) {
            setItems((items) => items.filter((f) => f._id !== data._id));

        }
        else {
            setItems((prev) => [...prev, data]);

        } 
        
        

    };

    const removeFromBasket = (item_id) => {
        const filteredItems = items.filter((item) => item._id !== item_id)
        setItems(filteredItems);
    }

    const emptyBasket = ()=> {

        setItems([]);

    }


    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    };

    return <BasketContext.Provider value={values} >{children}</BasketContext.Provider>

}

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };