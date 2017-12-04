import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import { redirectionService } from "../../service/redirectionService";



class FullScreenImageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    render() {
        return (
            <div style={{ position: "fixed", top: 0, bottom: 0, right: 0, left: 0, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div style={{ display: "table", width: "100%", height: "100%" }}>
                    <div style={{ display: "table-cell", verticalAlign: "middle", textAlign: "center" }}>
                        <img src={this.props.imageUrl} style={{width: "70%"}} />
                    </div>
                </div>
            </div>
        );
    }
}

FullScreenImageComponent.propTypes = {
    imageUrl: PropTypes.string,
};

export default FullScreenImageComponent;


