import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import toastr from "toastr";
import { localStoreToStore } from "./js/storeHelper";

const reducer = (state, action) => {
  switch (action.type) {
    //CART ACTIONS
    case "ADD_TO_CART":
      {
        const ADD = Object.values(state.cart).find(
          (x) =>
            x.name === action.product.name &&
            x.price_cost === action.product.price_cost
        );
        if (!ADD) {
          toastr.options.closeButton = true;
          toastr.options.closeHtml =
            '<button><i class="fa fa-close"></i></button>';
          toastr.success(
            `${action.product.name} has been added successfully.`,
            "Added !",
            { timeOut: 500 }
          );
          return {
            ...state,
            cart: Object.values(state.cart).concat(
              Object.assign(action.product, { inStock: 1 })
            ),
          };
        } else {
          toastr.options.closeButton = true;
          toastr.options.closeHtml =
            '<button><i class="fa fa-close"></i></button>';
          toastr.warning(
            `${action.product.name} already exist, check your cart and type the quantity you wish.`,
            "Error !"
          );
        }
      }
      break;

    case "SET_PRODUCT_QUANTITY":
      // eslint-disable-next-line no-lone-blocks
      {
        if (Object.values(action.product).length)
          return {
            ...state,
            cart: Object.values(state.cart)
              .filter((x) => x.id !== action.product.id)
              .concat(action.product),
          };
      }
      break;
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cart: {
          ...Object.values(state.cart).filter((x) => x.id !== action.id),
        },
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }

    //globalState actions
    case "SET_LOAD": {
      return {
        ...state,
        load: action.load,
      };
    }
    case "UPDATE_STATE": {
      return {
        ...state,
        globalState: action.state,
      };
    }

    case "UPDATE_PROFILE": {
      return {
        ...state,
        globalState: {
          0: {
            ...state.globalState[0],
            ...action.profile,
          },
        },
      };
    }

    //productList actions
    case "SET_LIST_PRODUCTS": {
      return {
        ...state,
        productList: action.product,
      };
    }

    case "ADD_NEW_PRODUCT": {
      return {
        ...state,
        productList: Object.values(state.productList).concat(action.product),
      };
    }

    case "UPDATE_LIST": {
      const NEW_LIST = Object.values(state.productList).filter(
        (product) => product.id !== action.id
      );
      return {
        ...state,
        productList: NEW_LIST,
      };
    }

    //Accounts actions
    case "GET_ACCOUNTS": {
      return {
        ...state,
        accounts: action.accounts,
      };
    }

    case "DELETE_ACCOUNTS": {
      return {
        ...state,
        accounts: {
          ...Object.values(state.accounts).filter((x) => x.id !== action.id),
        },
      };
    }

    //movements
    case "GET_MOVEMENTS": {
      return {
        ...state,
        movements: { ...action.movements },
      };
    }

    //Categories actions
    case "GET_CATEGORIES": {
      return {
        ...state,
        categories: { ...action.categories },
      };
    }

    //Logout actions
    case "CLEAR": {
      return {
        ...state,
        cart: [],
        globalState: [],
        accounts: [],
        movements: [],
        productList: [],
        categories: [],
        load: false,
      };
    }
    // USERS
    case "GET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    //LocalStorage actions

    case "LOAD": {
      return {
        ...state,
        ...localStoreToStore(),
      };
    }

    default: {
      return state;
    }
  }
};
const logger = (store) => (next) => (action) => {
  console.log("dispatching ", action);
  let result = next(action);
  console.log("next state ", store.getState());
  return result;
};
export default createStore(
  reducer,
  {
    cart: [],
    globalState: { 0: { address: [], social_net: [] } },
    accounts: [],
    movements: [],
    productList: [],
    categories: [],
    users: [],
    load: false,
  },
  applyMiddleware(logger, thunk)
);
