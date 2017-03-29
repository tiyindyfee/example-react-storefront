import React from 'react'
import { browserHistory } from 'react-router'

class Home extends React.Component {
    componentWillMount() {
        this.props.getCategories()
    }
    
    render() {
        const categories = this.props.categories.map((category, key) => <div className="card has-pointer" key={key} onClick={() => browserHistory.push('/category/' + category.id)}>
            <div className="card-content">
                {category.name}
            </div>
        </div>)

        return <div>
            <h1>Welcome!</h1>
            {categories}
        </div>
    }
}

export default Home