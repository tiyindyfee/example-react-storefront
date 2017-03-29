import React from 'react'

class Checkout extends React.Component {
    componentWillMount() {
        this.props.getCart()
    }
    
    render() {
        let cart = this.props.cart.map((product, key) => <div className="card" key={key}>
            <div className="card-content">
                <span className="tag is-success">{product.quantity}</span> <strong>{product.name}</strong>
            </div>
        </div>)

        if (cart.length === 0) {
            cart = <p>There are no items in your cart. <a href="/">Return to the home page.</a></p>
        }

        return <div>
            <h1>Your Cart</h1>
            {cart}
        </div>
    }
}

export default Checkout