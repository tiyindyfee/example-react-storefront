import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Storefront from './components/Storefront'
import Home from './components/Home'
import Category from './components/Category'
import Product from './components/Product'
import Checkout from './components/Checkout'
import ThankYou from './components/ThankYou'

ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={Storefront}>
        <IndexRoute component={Home} />
        <Route path="category/:categoryId" component={Category} />
        <Route path="product/:productId" component={Product} />
        <Route path="checkout" component={Checkout} />
        <Route path="thankyou" component={ThankYou} />
    </Route>
  </Router>,

  document.getElementById('root')
  
)
