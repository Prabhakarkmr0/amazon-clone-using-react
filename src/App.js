import './App.css';
import React,{useEffect} from "react";
import Header from "./Header";
import Home from "./Home"
import {BrowserRouter as Router , Switch ,Route} from "react-router-dom"
import Checkout from "./Checkout"
import Login from "./Login"
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from "./Payment"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe("pk_test_51ICe2rAKtdfBTvv76FwOvXdruP5zHAw1OYSFqfqe7MRHqZA9V8fEBMlu8jCAkjw530SIEbSkB8DjAh2tRPOVnXxE00cxn7KBGe")


function App() {

  const[{},dispatch]=useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log('the user is',authUser)
      if(authUser){
        //the user is logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        //the user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
    <div className="app">
      
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
      <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
      
    </div>

    </Router>
  );
}

export default App;
