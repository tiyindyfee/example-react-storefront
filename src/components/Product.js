import React from 'react'

class Product extends React.Component {
    componentWillMount() {
        this.props.getProduct(this.props.params.productId)
    }
    
    render() {
        return <div>
            <h1>{this.props.product.name}</h1>
            <button type="button" className="button" onClick={() => this.props.addToCart(this.props.product.id, this.props.product.name, 1)}>Add To Cart</button>
        </div>
    }
}

export default Product