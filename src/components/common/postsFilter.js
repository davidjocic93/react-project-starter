import React from "react";
import PropTypes from "prop-types";

class Filter extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            searchTerm: ""
        };

        this.bindEventHandlers();
    }

    bindEventHandlers () {

        this.handleSelection = this.handleSelection.bind(this);

    }


    handleSelection(event) {

        const searchString = event.target.value;

        this.setState({
            searchTerm: searchString
        });

        this.props.filterPosts(searchString);
    }



    render() {

        return (

            <div>

                <select onChange={this.handleSelection} className="selectpicker">
                    <option  value="">All Posts</option>
                    <option  value="text">Text Posts</option>
                    <option  value="image">Image Posts</option>
                    <option  value="video">Video Posts</option>
                </select>

            </div>
        );
    }
}

Filter.propTypes = {
    filterPosts: PropTypes.func
};

export default Filter;

