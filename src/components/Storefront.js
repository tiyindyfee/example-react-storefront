import React from 'react'
import { browserHistory } from 'react-router'

class Storefront extends React.Component {
    constructor(props) {
        super(props)

        // Custom methods
        this.getCategories = this.getCategories.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.filterProducts = this.filterProducts.bind(this)
        this.getCart = this.getCart.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.checkout = this.checkout.bind(this)

        // Master state
        this.state = {
            categories: [],
            originalProducts: [],
            products: [],
            product: {},
            cart: [],
            message: ''
        }
    }

    getCategories() {
        fetch('/api/categories')
        .then(res => res.json())
        .then(res => this.setState({categories: res}))
    }

    getProducts() {
        fetch('/api/products')
        .then(res => res.json())
        .then(res => this.setState({products: res, originalProducts: res}))
    }

    getProduct(id) {
        fetch('/api/products/' + id)
        .then(res => res.json())
        .then(res => this.setState({product: res}))
    }

    filterProducts(filter) {
        let products = this.state.originalProducts.filter(product => product.name.toLowerCase().includes(filter))
        this.setState({products: products})
    }

    getCart() {
        fetch('/api/cart')
        .then(res => res.json())
        .then(res => this.setState({cart: res}))
    }

    addToCart(productId, name, qty) {
        fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: productId,
                name: name,
                quantity: qty
            })
        })
        .then(res => res.json())
        .then(res => {
            let cart = this.state.cart
            cart.push(res)

            this.setState({cart: cart, message: 'Product added to cart successfully.'})

            browserHistory.push('/')
        })
    }

    checkout() {
        this.state.cart.forEach(product => fetch('/api/cart/' + product.id, {
            method: 'DELETE'
        }))

        browserHistory.push('/thankyou')
    }

    render() {
        /*
            Since the Storefront component is the master component wrapping around every component in the router, we need to use the React.cloneElement() method to add props to the current route.

            - We send all the state properties as individual props with ...this.state
            - We share all of the custom methods one by one.
        */ 
        const routeComponent = React.cloneElement(this.props.children, {
            ...this.state,
            getCategories: this.getCategories,
            getProducts: this.getProducts,
            getProduct: this.getProduct,
            filterProducts: this.filterProducts,
            getCart: this.getCart,
            addToCart: this.addToCart,
            checkout: this.checkout,
        })

        // If we have a message state value, show it on the screen
        let message = this.state.message ? <p className="notification is-success">{this.state.message}</p> : ''

        // Clear the message after 2 seconds
        if (message) {
            setTimeout(() => this.setState({message: ''}), 2000)
        }

        // Show a My Cart button if we're not on the checkout page, otherwise show a Checkout button
        let checkoutButton = location.pathname === '/checkout' ? <a className="button is-success is-outlined is-pulled-right" onClick={this.checkout}>Checkout</a> : <a className="button is-success is-outlined is-pulled-right" onClick={() => browserHistory.push('/checkout')}>My Cart</a>

        // If we're on the Thank You page, do not show a button
        if (location.pathname === '/thankyou') {
            checkoutButton = ''
        }

        return <div>
            <section className="hero is-warning is-bold has-pointer" onClick={() => browserHistory.push('/')}>
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">ACME Media Store</h1>
                        <h2 className="subtitle">Better Prices Than Stores That Sort Of Rhyme With "Game Is On"</h2>
                    </div>
                </div>
            </section>
            <main className="section">
                <div className="content">
                    {checkoutButton}
                    {message}
                    {routeComponent}
                </div>
            </main>
        </div>
    }
}

export default Storefront