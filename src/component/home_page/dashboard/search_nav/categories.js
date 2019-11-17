import React, { Component } from 'react';
import {connect} from 'react-redux'
import { storeSelectedCategory} from "../../../../store/action/categoryAction";
import {getCategories} from "../../../../api_calls";
import './index.css';
import { Form } from 'react-bootstrap';

class CategoriesList extends Component {

    componentWillMount() {
        this.props.getCategories();
    }

    render() {
        const {categoriesError, categoriesLoading, categories} = this.props;

        if (categoriesLoading || categories.length === 0) {

            return (
                    <Form.Control as="select" className="SearchItems">
                        <option hidden key='categories'>Loading...</option>
                    </Form.Control>
            )
        }
        if (categoriesError || categories === undefined) {
            return (
                    <Form.Control as="select" className="SearchItems">
                        <option hidden key='categories'>network error</option>
                        {setTimeout(() => {
                            alert('Oops there is a problem connecting with server  try after a minute')
                        }, 1000)}
                    </Form.Control>

            )
        }
        else {
            return (
                    <Form.Control as="select" className="SearchItems" name='category'  onChange={this.props.handleChange}>
                        <option hidden key='categories' value={null} id={null}>categories</option>
                        <option value={null}> </option>
                        {categories.map(item => <option key={item.categories_id} id={item.categories_id} >{item.categories_name}</option>)}
                    </Form.Control>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.items,
        categoriesLoading: state.category.loading,
        categoryError: state.category.error,
        selectedCategory: state.category.selectedCategory
    }
};
const mapDispatchToProps ={
            getCategories: ()=> getCategories(),
            storeSelectedCategory: name => storeSelectedCategory(name)
};


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)