import {
createContext,  useContext,
  useEffect,useReducer,
} from "react";

const CartContext = createContext();


function cartReducer(state, action) {
   switch (action.type) {
         case "ADD_TO_CART": {
           const existingProduct = state.find(
      (item) => item.id === action.product.id
      );

     if (existingProduct) {
    return state.map((item) =>
         item.id === action.product.id
            ? {
                ...item,
             quantity: item.quantity + 1,              }
            : item 
        );
      }

      return [
        ...state,        {
          ...action.product,
          quantity: 1,
        },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: action.quantity,
            }
          : item
      );

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      product,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id,
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      id,
      quantity,
    });
  };

  const itemCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const subtotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

  return (
    <CartContext.Provider
    
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}