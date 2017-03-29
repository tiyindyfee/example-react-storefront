import React from 'react'
import { browserHistory } from 'react-router'

class Category extends React.Component {
    // Get products
    componentWillMount() {
        this.props.getProducts()
    }
    
    render() {
        // Filter products down to just those within the currently selected category
        let products = this.props.products.filter(product => product.category_id === Number(this.props.params.categoryId))

        // Make that filtered list of products into UI components
        products = products.map((product, key) => <div className="card has-pointer" key={key} onClick={() => browserHistory.push('/product/' + product.id)}>
            <div className="card-content">
                {product.name}
            </div>
        </div>)

        return <div>
            <h1>Category</h1>
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Search..." onKeyUp={(e) => this.props.filterProducts(e.target.value)} />
                </div>
            </div>
            {products}
        </div>
    }
}

export default Category