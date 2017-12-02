import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import { redirectionService } from "../../service/redirectionService";



class ImageComponent extends React.Component {
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
                        <img src={this.props.imageUrl} />
                    </div>
                </div>
            </div>
        );
    }
}

ImageComponent.propTypes = {
    imageUrl: PropTypes.string,
};

export default ImageComponent;


// import React from "react";
// import Modal from "react-modal";
// import { dataService } from "../../service/dataService";
// import PropTypes from "prop-types";
// import { redirectionService } from "../../service/redirectionService";



// class ImageComponent extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             isOpen: true,
//             position: "relative",
//             top: "",
//             left: "",
//             width: "100%"
//         };

//         this.povecajDiv = this.povecajDiv.bind(this);
//     }



//     povecajDiv () {
//         this.setState({
//             position: "absolute",
//             top: "30%",
//             left: "10%",
//             width: "130%"
//         });
//     }


//     render() {
//         return (
//             <div className="col-12" style={{width: "100%"}}>
//                 <img src={this.props.imageUrl} onClick={this.povecajDiv}/>
//             </div>
//         );
//     }
// }

// ImageComponent.propTypes = {
//     imageUrl: PropTypes.string,
// };

// export default ImageComponent;

