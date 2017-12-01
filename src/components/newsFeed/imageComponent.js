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