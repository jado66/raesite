export default function Header(props){
    
    var inputProps = {}

    if (props.userIsAdmin && ! props.viewAsNormalUser){
        inputProps.contentEditable = "true"
    }
    
    return(
    <div {...inputProps}  className="title" style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:props.webStyle.lightAccent}}>
        <h1 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>Life By LaRae</h1>
    </div>)
}
// import React from 'react'

// import ContentEditable from 'react-contenteditable'

// export default class Header extends React.Component {
//   constructor(props) {
//     super(props)
//     this.contentEditable = React.createRef();
//     this.state = {html: "<h1>Life By LaRae</h1>"};
    
//   };

//   handleChange = evt => {
//     this.setState({html: evt.target.value});
//   };

//   render = () => {

//     return(
//             <div className="title" style = {{width:`${this.props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:this.props.webStyle.lightAccent}}>
//             <ContentEditable
//                     innerRef={this.contentEditable}
//                     html={this.state.html} // innerHTML of the editable div
//                     disabled={false}       // use true to disable editing
//                     onChange={this.handleChange} // handle innerHTML change
//                     tagName='header' // Use a custom HTML tag (uses a div by default)
//                     />
//             </div>)
//   };
// };