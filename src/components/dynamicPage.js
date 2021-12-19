import Header from "./header";
import Navbar from "./navbar";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import Mosaic from "./mosaic";
import WebsiteStyleEditor from "./styleEditor";
import equal from 'fast-deep-equal'


export default class DynamicPage extends React.Component {
    constructor(props) {
        super(props);
 
        // alert(JSON.stringify(props.webStyle))

        this.adminProps = {
            webStyle: props.webStyle,
            userIsAdmin: true,//props.userIsAdmin,
            viewAsNormalUser: props.viewAsNormalUser,
        }

        this.componentMapping = {
            Header:Header,
            // Subheader,
            // Footer,
            Mosaic:Mosaic,
            Navbar:Navbar,
            // Gallery,
            // NewsletterSignup,
            // BlogFeedAppointments,
            // IGGallery,
            // BlogWYSIWYG,
            // CommentLikesHandler,
            // PriceHierarchyTable,
            // BasicShop,
            // Services,
            // Appointments,
            // Mall,
            // PaymentManager,
            // ContactForm,
            // AdminActionsDashboard ,
            // IGAnalytics,
            // EmailSender
          };
 
        
        this.componentOptions = props.componentOptions;
        this.pageType = props.pageType;
        this.inAdminMode = props.inAdminMode;
 
        this.state = {
            pageName: this.pageType,
            componentNames: props.defaultComponentList,
            isStyleEditorMinimized: false,
            showStyleEditor: false
        };

        this.addComponentAtIndex=this.addComponentAtIndex.bind(this);
        this.minimizeStyleEditor = this.minimizeStyleEditor.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.webStyle !== this.props.webStyle) {
    //         if(!equal(this.props, prevProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    //         {
    //         //   alert("hi")
    //         }
    //     }
    //   }
 
    minimizeStyleEditor(){
        this.setState({showStyleEditor:false})
    }

    expandStyleEditor(){
        this.setState({showStyleEditor:true})
    }

    addComponentAtIndex(index,componentName){ // Need to be replaced with list of objects or they will get rerendered
        // alert(`Add component ${componentName} at index ${index}`)
        // alert(this.state.componentNames)
        let newState = [...this.state.componentNames.slice(0,index),componentName,...this.state.componentNames.slice(index)]
        alert(`Inserting to index ${index} we get our newState ${newState}`)
        this.setState({componentNames:newState});
    }
 
    deleteComponent(index){
        alert(`Delete component at index ${JSON.stringify(index)}`)
        this.setState({componentNames: [...this.state.componentNames.slice(0,index),...this.state.componentNames.slice(index+1)]});
    }
 
    moveComponentUp(index){
        if (index != 0){
            this.swapComponents(index,index-1)
        }
        else{
            alert("Cant move the first element up")
        }
    }
 
    moveComponentDown(index){
        if (index != this.state.componentNames.length-1){
            this.swapComponents(index,index+1)
        }
        else{
            alert("Cant move the first element up")
        }
    }
 
    swapComponents(indexA,indexB){
        let newComponentNames = this.state.componentNames.slice();
        let temp = this.state.componentNames[indexB];
        newComponentNames[indexB] = newComponentNames[indexA];
        newComponentNames[indexA] = temp;
 
        this.setState({componentNames: newComponentNames});
    }
  
    // reindexComponents(){
    //     for
    // }

    render() {

        let pageComponents = []

        // alert(this.state.componentNames)

        this.state.componentNames.forEach((componentName, index) => {
            // if (this.adminEditMode){
 
                let callbacks = {
                    deleteComponent: ()=>{this.deleteComponent(index)}, 
                    moveComponentUp: ()=>{this.moveComponentUp(index)},
                    moveComponentDown: ()=>{this.moveComponentDown(index)},
                    addComponentAtIndex: this.addComponentAtIndex
                }
                const Component = this.componentMapping[componentName];
                let newComponent = <AdminComponentWrapper key ={`${componentName}+${index}`} componentOptions = {this.componentOptions} index = {index}
                                     componentCount = {this.state.componentNames.length} adminProps = {this.adminProps} callbacks = {callbacks} ><Component webStyle = {this.props.webStyle}/></AdminComponentWrapper>
                // let newComponent = <MakeAdminComponent key ={`${componentName}`} newComponent = {Component} index = {index} adminProps = {this.adminProps} componentOptions = {this.componentOptions}
                //                     componentCount = {this.state.componentNames.length} callbacks = {callbacks}/>
                pageComponents.push(newComponent)
                // pageComponents.push(newComponent(<Component key ={`${componentName}`}/>,this.inAdminMode,index,this.state.componentNames.length,this.componentOptions,callbacks))
            // }
            // else{
            //     const Component = this.componentMapping[componentName];
            //     pageComponents.push(<Component key ={`${componentName}`}/>)
            // }
        });

        // alert(JSON.stringify(pageComponents))
 
        return (
            <div style={{backgroundColor:this.props.webStyle.lightShade}}>    
                <WebsiteStyleEditor webStyle = {this.props.webStyle} updateWebStyle = {this.props.updateWebStyle} closeStyleEditor = {this.props.closeStyleEditor} showStyleEditor = {this.state.showStyleEditor}
                                    isStyleEditorMinimized = {this.state.isStyleEditorMinimized} minimizeStyleEditor = {this.minimizeStyleEditor} expandStyleEditor = {this.expandStyleEditor}/>
            
                <div id = "outerSection" style={{backgroundColor:this.props.webStyle.lightAccent,width:`${this.props.webStyle.centerWidth}%`,margin:"auto"}}>
                                {/* <div  > */}

                    <div id = "mainSection" style={{width:`${this.props.webStyle.secondCenterWidth}%`,margin:"auto"}}> {/* Includes everything inside the margin */}
                        {pageComponents}
                        {/* {this.componentMapping.Navbar} */}
                    </div>
                </div>
        </div>
        );
    }
  }
 
class AdminComponentWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.children = props.children;

        this.setButtonsVisibility = this.setButtonsVisibility.bind(this);
        this.openAddComponentAbove = this.openAddComponentAbove.bind(this)
        this.openAddComponentBelow = this.openAddComponentBelow.bind(this)

        this.state = {
            areButtonsVisible: false,
            areAboveOptionsVisible: false,
            areBelowOptionsVisible: false,
            index:props.index,
            newComponentIndex:-1,
            callbacks: props.callbacks,
            componentOptions: props.componentOptions,
            componentCount:props.componentCount
        };

        this.adminProps = props.adminProps

      }

    setButtonsVisibility(showButtons){
        if (this.adminProps.userIsAdmin)
            this.setState({areButtonsVisible: showButtons})
    }
    openAddComponentAbove(){
        alert("Open above")
        this.setState({areAboveOptionsVisible:true,newComponentIndex:this.state.index-1})
    }
    
    openAddComponentBelow(){
        this.setState({areAboveOptionsVisible:true,newComponentIndex:this.state.index+1})
    }
    
    addNewComponent(componentName){
        // alert(`Add at index ${this.state.index}`)
        this.state.callbacks.addComponentAtIndex(this.state.index,componentName)
        // Not sure if this does anything to do a rerender
        this.setState({
            areButtonsVisible: false,
            areAboveOptionsVisible: false,
            areBelowOptionsVisible: false,
            newComponentIndex:-1})
    }  

    render() {

        let buttonClass = this.state.areButtonsVisible ? "adminbuttons" :"hidden"
 
        let options = this.state.componentOptions.map((option) => (
            <li key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</li>
            ))

    return ( 
        
        <div className = {"flex-col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => this.setButtonsVisibility(false)}>
            {/* Above component */}
            {this.state.areAboveOptionsVisible && <div><ul>{options}</ul></div> }
                {/* To the right of component */}
                <div className = {"flex-row"} style={{position:"relative"}}>
                    {this.props.index}{this.children}
                    <div className = {"flex-col floatOnTop"}>
                        <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline"}}>
                            {/* {this.props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} */}

                            {this.state.index != 0 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentUp}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
                            <button  className = {buttonClass} onClick = {this.state.callbacks.deleteComponent}>Delete</button >
                            {this.props.index != this.state.componentCount - 1 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentDown}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
                        </div>
                    </div>
            </div>
            {/* Below component */}
            {this.state.areBelowOptionsVisible && <div><ul>{options}</ul></div>}
        
          </div>
    )

    };
}

  
  // Make this a compentent and pass these as props
// class MakeAdminComponent extends React.Component(){
//     // WrappedComponent,inAdminMode,index,componentCount,callbacks,componentOptions
//     constructor(props) {
//         super(props);
//         this.WrappedComponent = props.WrappedComponent
//       }
//     //   this.setButtonsVisibility = this.setButtonsVisibility.bind(this);
//     //   this.state = {
//     //     areButtonsVisible: false,
//     //     areAboveOptionsVisible: false,
//     //     areBelowOptionsVisible: false,
//     //     index:props.index,
//     //     newComponentIndex:-1,
//     //     callbacks: props.callbacks,
//     //     componentOptions: props.componentOptions,
//     //     componentCount:props.componentCount
//     //   };

//     //   this.adminProps = {
//     //     webStyle: props.webStyle,
//     //     userIsAdmin: props.userIsAdmin,
//     //     viewAsNormalUser: props.viewAsNormalUser,
//     //      }

//     }
 
//     // setButtonsVisibility(showButtons){
//     //     if (this.adminProps.inAdminMode)
//     //         this.setState({areButtonsVisible: showButtons})
//     // }
 
//     // openAddComponentAbove(index){
//     //     this.setState({areAboveOptionsVisible:true,newComponentIndex:index-1})
//     // }
 
//     // openAddComponentBelow(index){
//     //     this.setState({areAboveOptionsVisible:true,newComponentIndex:index+1})
//     // }
 
//     // addNewComponent(componentName){
//     //     this.state.callbacks.addComponentAtIndex(this.state.index,componentName)
//     //     // Not sure if this does anything to do a rerender
//     //     this.setState({
//     //         areButtonsVisible: false,
//     //         areAboveOptionsVisible: false,
//     //         areBelowOptionsVisible: false,
//     //         newComponentIndex:-1})
//     // }   
 
//     render() {
//       // ... and renders the wrapped component with the fresh data!
//       // Notice that we pass through any additional props
 
//         // let buttonClass = this.state.areButtonsVisible ? "adminbuttons" :"hidden"
 
//         // let options = this.state.componentOptions.map((option) => (
//         //     <li key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</li>
//         //   ))

//         // const NewComponent

//         let nonAdminCompenent = this.WrappedComponent
 
//         return (
//             <div>
//                 <h1>Hi</h1>
//                 {nonAdminCompenent}
//             </div>
//         )

//         // return (
//         //   <div className = {"flex-col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => this.setButtonsVisibility(false)}>
//         //     {/* Above component */}
//         //     {this.state.areAboveOptionsVisible ? <div><ul>{options}</ul></div> :
//         //         <button className = {buttonClass} onClick = {this.state.callbacks.openAddComponentAbove}>Add Component Above</button>
//         //     }
//         //     {/* To the right of component */}
//         //     <div className = {"flex-row"}>
//         //         {nonAdminCompenent}
//         //         <div className = {"flex-col"}>
//         //             {this.state.index != 0 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentUp}>Move FaSortUp</button>}
//         //             <button  className = {buttonClass} onClick = {this.state.callbacks.deleteComponent}>Delete</button >
//         //             {this.state.index != this.state.componentCount - 1 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentDown}>Move FaSortDown</button>}
//         //         </div>
//         //     </div>
//         //     {/* Below component */}
//         //     {this.state.areBelowOptionsVisible ? <div><ul>{options}</ul></div> :
//         //         <button className = {buttonClass} onClick = {this.state.callbacks.openAddComponentBelow}>Add Component Below</button>
//         //     }
            
//         //   </div>
//         // )
//     }
//   };

 
// componentDidUpdate(prevProps, prevState) {
//     Object.entries(this.props).forEach(([key, val]) =>
//       prevProps[key] !== val && console.log(`Prop '${key}' changed`)
//     );
//     if (this.state) {
//       Object.entries(this.state).forEach(([key, val]) =>
//         prevState[key] !== val && console.log(`State '${key}' changed`)
//       );
//     }
//   }
