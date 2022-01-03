import Header from "./header";
import Navbar from "./navbar";
import BlogPreview from "./blogPreview";
import React from "react";
import DynamicForm from "./dynamicForm";
import CardPaymentBlock from "./cardPaymentBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faThList } from '@fortawesome/free-solid-svg-icons'
import Mosaic from "./mosaic";
import WebsiteStyleEditor from "./styleEditor";


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
            CardPaymentBlock:CardPaymentBlock,
            DynamicForm:DynamicForm,
            BlogPreview:BlogPreview,
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

        // this.generateKey = this.generateKey.bind(this)

        
 
        this.state = {
            pageName: this.pageType,
            componentNames: [],
            componentIDs: [],
            isStyleEditorMinimized: false,
            showStyleEditor: false,
            pageID: "testPage"
        };

        this.addComponentAtIndex = this.addComponentAtIndex.bind(this);
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
    componentDidMount(){
        const componentNamesString = localStorage.getItem(this.state.pageID+'-componentNames')
        const componentIDsString = localStorage.getItem(this.state.pageID+'-componentIDs')
        
        

        if (componentNamesString && componentIDsString){
            let componentNames = componentNamesString.split(',');
            let componentIDs = componentIDsString.split(',');
            // alert("Names: "+componentNames)
            // alert("IDs: "+componentIDs)
            this.setState({componentNames: componentNames,componentIDs:componentIDs})
            this.forceUpdate()
        }
        else{
            let componentNames = this.props.defaultComponentList
            let componentIDs = [];

            for (var i = 0; i < this.props.defaultComponentList.length; i++){
                componentIDs.push(this.generateKey(this.props.defaultComponentList[i],i))
            }
            this.setState({componentNames: componentNames,componentIDs:componentIDs})

        }
      }
 
    minimizeStyleEditor(){
        this.setState({showStyleEditor:false})
    }

    expandStyleEditor(){
        this.setState({showStyleEditor:true})
    }

    addComponentAtIndex(index,componentName){ // Need to be replaced with list of objects or they will get rerendered
        // alert(`Add component ${componentName} at index ${index}`)
        // alert(this.state.componentNames)
        let newID = this.generateKey(componentName,index)
        let newComponentNames = [...this.state.componentNames.slice(0,index),componentName,...this.state.componentNames.slice(index)]
        let newComponentIDs = [...this.state.componentIDs.slice(0,index),newID,...this.state.componentIDs.slice(index)]
        // alert(`Inserting to index ${index} we get our newState ${newState}`)
        this.setState({componentNames:newComponentNames,componentIDs:newComponentIDs});

        localStorage.setItem(this.state.pageID+'-componentNames',newComponentNames);
        localStorage.setItem(this.state.pageID+'-componentIDs',newComponentIDs)
    }
 
    deleteComponent(index){
        alert(`Delete component at index ${JSON.stringify(index)}`)

        let newComponentNames = [...this.state.componentNames.slice(0,index),...this.state.componentNames.slice(index+1)]
        let newComponentIDs = [...this.state.componentIDs.slice(0,index),...this.state.componentIDs.slice(index+1)]

        this.setState({componentNames: newComponentNames,
                       componentIDs: newComponentIDs});

        localStorage.setItem(this.state.pageID+'-componentNames',newComponentNames);
        localStorage.setItem(this.state.pageID+'-componentIDs',newComponentIDs)
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
        let tempComponent = this.state.componentNames[indexB];

        let newComponentIDs = this.state.componentIDs.slice();
        let tempID = this.state.componentIDs[indexB];

        newComponentNames[indexB] = newComponentNames[indexA];
        newComponentNames[indexA] = tempComponent;

        newComponentIDs[indexB] = newComponentIDs[indexA];
        newComponentIDs[indexA] = tempID;
 
        this.setState({componentNames: newComponentNames, componentIDs: newComponentIDs});
        localStorage.setItem(this.state.pageID+'-componentNames',newComponentNames);
        localStorage.setItem(this.state.pageID+'-componentIDs',newComponentIDs)
    }

    generateKey = (componentName, index) => {
        return `${componentName}-${ index }-${ new Date().getTime() }`;
    }
    // reindexComponents(){
    //     for
    // }

    render() {

        let pageComponents = []

        // alert(this.state.componentNames)

        this.state.componentIDs.forEach((componentID, index) => {
            // if (this.adminEditMode){
 
                let callbacks = {
                    deleteComponent: ()=>{this.deleteComponent(index)}, 
                    moveComponentUp: ()=>{this.moveComponentUp(index)},
                    moveComponentDown: ()=>{this.moveComponentDown(index)},
                    addComponentAtIndex: this.addComponentAtIndex
                }
                let componentName = this.state.componentNames[index]
                // alert(`newID-${newID}`)
                // alert(newID)
                const Component = this.componentMapping[componentName];
                let newComponent = <AdminComponentWrapper key ={`${componentName}+${index}`} componentOptions = {this.componentOptions} index = {index}
                                     componentCount = {this.state.componentNames.length} adminProps = {this.adminProps} callbacks = {callbacks} >
                                         <Component webStyle = {this.props.webStyle} key={componentID} id = {componentID}/>
                                    </AdminComponentWrapper>
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
                <WebsiteStyleEditor webStyle = {this.props.webStyle} updateWebStyle = {this.props.updateWebStyle} closeStyleEditor = {this.props.closeStyleEditor} showStyleEditor = {this.props.showStyleEditor}
                                    showStyleEditor = {this.props.showStyleEditor} minimizeStyleEditor = {this.minimizeStyleEditor} expandStyleEditor = {this.expandStyleEditor}/>
            
                <div id = "outerSection" style={{backgroundColor:this.props.webStyle.lightAccent,width:`${this.props.webStyle.centerWidth}%`,margin:"auto", paddingBottom: "50px"}}>
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
        // alert("Open above")
        this.setState({areAboveOptionsVisible:true,areBelowOptionsVisible:false,newComponentIndex:this.state.index})
    }
    
    openAddComponentBelow(){
        this.setState({areBelowOptionsVisible:true,areAboveOptionsVisible:false,newComponentIndex:this.state.index+1})
    }

    closeAddComponents(){
        this.setState({areBelowOptionsVisible:false,areAboveOptionsVisible:false,newComponentIndex:this.state.index})
    }
    
    addNewComponent(componentName){
        // alert(`Add at index ${this.state.index}`)
        this.state.callbacks.addComponentAtIndex(this.state.newComponentIndex,componentName)
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
            <button key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</button>
            ))

        options.push(
            <button key ={"deleteButton"} onClick = {()=>{this.closeAddComponents()}}>X</button>
        )

    return ( 
        
        <div className = {"flex-col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false);this.closeAddComponents()}}>
            {/* Above component */}
            {this.state.areAboveOptionsVisible && <div className = {"flex-row component-options"}>{options}</div> }
                {/* To the right of component */}
                <div className = {"flex-row"} style={{position:"relative"}}>
                    {this.children}
                    <div className = {"flex-col floatOnTop"}>
                        <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline",zIndex:999}}>
                            {/* {this.props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} */}

                            <div className = {"flex-row"}>
                                {this.state.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>}
                                {this.state.index != 0 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentUp}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
                            </div>
                            
                            <div className = {"flex-row"}>
                            <button  className = {buttonClass} onClick = {this.state.callbacks.deleteComponent}>Delete</button >
                            <button  className = {buttonClass} onClick = {this.closeAddComponents}>X</button >
                            </div>
                            
                            <div className = {"flex-row"}>
                                <button  className = {buttonClass} onClick = {this.openAddComponentBelow}>Add <FontAwesomeIcon   icon={faSortDown} /></button>

                                {this.props.index != this.state.componentCount - 1 && <button  className = {buttonClass} onClick = {this.state.callbacks.moveComponentDown}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
                            </div>
                        </div>
                    </div>
            </div>
            {/* Below component */}
            {this.state.areBelowOptionsVisible && <div className = {"flex-row component-options"}>{options}</div>}
        
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
