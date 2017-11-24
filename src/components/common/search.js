import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        const searchString = event.target.value;
        this.setState({
            searchTerm: searchString
        });

        this.props.searchPeople(searchString);
    }



    render() {
        return (
            <div>
                Search <input type="text" onChange={this.handleChange} value={this.state.searchTerm} />
            </div>
        );
    }
}

Search.propTypes = {
    searchPeople: PropTypes.function
};

export default Search;