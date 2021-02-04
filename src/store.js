import {createStore} from "redux";
import toastr from "toastr";
import {localStoreToStore} from "./js/storeHelper";


const reducer = (state, action) => {
    switch (action.type) {
        //CART ACTIONS
        case "ADD_TO_CART": {
            const ADD = Object.values(state.cart).find(x => x.name === action.product.name && x.price_vent === action.product.price_vent);
            if (!ADD) {

                toastr.options.closeButton = true;
                toastr.options.closeHtml = '<button><i class="fa fa-close"></i></button>';
                toastr.success(`${action.product.name} has been added successfully.`, "Added !", {timeOut: 500});
                return {
                    ...state, cart: {...Object.values(state.cart).concat(Object.assign(action.product,{inStock:1}))}
                }
            } else {
                toastr.options.closeButton = true;
                toastr.options.closeHtml = '<button><i class="fa fa-close"></i></button>';
                toastr.warning(`${action.product.name} already exist, check your cart and type the quantity you wish.`, "Error !");
            }
        }
            break;
        case "SET_PRODUCT_QUANTITY": {
            if (Object.values(action.product).length)
                return {
                    ...state,
                    cart: {
                        ...Object.values(state.cart).filter(x => x.id !== action.product.id).concat(action.product)
                    }
                }

        }
            break;
        case "DELETE_FROM_CART": {
            return {
                ...state, cart: {...Object.values(state.cart).filter(x => x.id !== action.id)}
            }
        }
            break;
        case "CLEAR_CART": {
            return {
                ...state, cart: {}
            }
        }
            break;



        //globalState actions
        case "UPDATE_STATE": {
            return {
                ...state, globalState: {...action.state}
            }
        }
            break;


        //productList actions
        case "SET_LIST_PRODUCTS": {
            return {
                ...state,
                productList: {...action.product}
            }
        }
            break;
        case "ADD_NEW_PRODUCT": {
            return {
                ...state,
                productList: {...Object.values(state.productList).concat(action.product)}
            }
        }
            break;
        case "UPDATE_LIST": {
            const NEW_LIST = Object.values(state.productList).filter(product => product.id !== action.id)
            return {
                ...state, productList: {...NEW_LIST}
            }
        }


        //Accounts actions
        case "GET_ACCOUNTS": {

            return {
                ...state, accounts: action.accounts
            }
        }
            break;
        case "DELETE_ACCOUNTS": {
            return {
                ...state, accounts: {...Object.values(state.accounts).filter(x => x.id !== action.id)}
            }
        }
            break;


        //Categories actions
        case "GET_CATEGORIES": {
            return {
                ...state, categories: {...action}
            }
        }
            break;

        //Logout actions
        case "CLEAR": {
            return {
                cart: [], globalState: [], accounts: [], productList: [], categories: []
            }
        }
        //LocalStorage actions
        case "LOAD": {
            return {
                ...localStoreToStore()
            }
        }
            break;


        default : {

        }

    }
    return state
}

export default createStore(reducer, {cart: [], globalState: [], accounts: {}, productList: [], categories: []})