import Header from "./header";
import Navbar from "./navbar";
import BlogPreview from "./blogPreview";
import CaptionedPicture from "./captionedPicture";
import React from "react";
import DynamicForm from "./dynamicForm";
import CardPaymentBlock from "./cardPaymentBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faThList } from '@fortawesome/free-solid-svg-icons'
import Mosaic from "./mosaic";
import WebsiteStyleEditor from "./styleEditor";
import Footer from "./footer";
import VideoFrame from "./videoFrame";
import SlideShow from "./slideShow";
import PictureFrame from "./pictureFrame";
import QuickLink from "./quickLink";
import Paragraph from "./paragraph";
import ListComparisonTable from "./listComparisonTable";
import PlanComparison from "./planComparison";


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
            Footer:Footer,
            Mosaic:Mosaic,
            Navbar:Navbar,
            VideoFrame:VideoFrame,
            CardPaymentBlock:CardPaymentBlock,
            DynamicForm:DynamicForm,
            BlogPreview:BlogPreview,
            CaptionedPicture,CaptionedPicture,
            SlideShow:SlideShow,
            PictureFrame:PictureFrame,
            QuickLink:QuickLink,
            Paragraph:Paragraph,
            ListComparisonTable:ListComparisonTable,
            PlanComparison:PlanComparison,
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

        this.swapComponents = this.swapComponents.bind(this)
 
        this.state = {
            pageName: this.pageType,
            components : [],
            isStyleEditorMinimized: false,
            showStyleEditor: false,
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
        const components = JSON.parse(localStorage.getItem(this.props.pageName+'-componentList'))
    
        if (components){
            this.setState({components: components})
        }
        else{
            let components = [];

            for (var i = 0; i < this.props.defaultComponentList.length; i++){
                components.push(
                    {
                        name: this.props.defaultComponentList[i],
                        id: this.generateKey(this.props.defaultComponentList[i],i)
                    })
            }
            this.setState({components: components})

            localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(components));
        }
      }
 
    minimizeStyleEditor(){
        this.setState({showStyleEditor:false})
    }

    expandStyleEditor(){
        this.setState({showStyleEditor:true})
    }

    addComponentAtIndex(index,componentName){ // Need to be replaced with list of objects or they will get rerendered
        
        let newComponent = {}
        newComponent.name = componentName;
        newComponent.id = this.generateKey(componentName,index)
        
        let newComponentList = [...this.state.components.slice(0,index),newComponent,...this.state.components.slice(index)]

        this.setState({components:newComponentList});

        localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
    }
 
    deleteComponent(index){
        alert(`Delete component at index ${JSON.stringify(index)}`)

        let newComponentList = [...this.state.components.slice(0,index),...this.state.components.slice(index+1)]

        this.setState({components:newComponentList});

        localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
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
        if (index != this.state.components.length-1){
            this.swapComponents(index,index+1)
        }
        else{
            alert("Cant move the first element up")
        }
    }
 
    swapComponents(indexA,indexB){
        let newComponentList = [...this.state.components];
        let tempComponent = {...this.state.components[indexB]};

        newComponentList[indexB] = {...newComponentList[indexA]};
        newComponentList[indexA] = tempComponent
 
        this.setState({components:newComponentList});



        localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
    }

    generateKey = (componentName, index) => {
        return `${this.props.pageName}-${componentName}-${ index }${ String(new Date().getTime()).slice(-3) }`;
    }
    // reindexComponents(){
    //     for
    // }

    render() {

        let pageComponents = []

        // alert(this.state.componentNames)

        let callbacks = {
            deleteComponent: this.deleteComponent.bind(this), 
            moveComponentUp: this.moveComponentUp.bind(this),
            moveComponentDown: this.moveComponentDown.bind(this),
            addComponentAtIndex: this.addComponentAtIndex.bind(this)
        }

        this.state.components.forEach((component, index) => {
           
        
            const Component = this.componentMapping[component.name];
            // let newComponent = <AdminComponentWrapper key ={component.id+"-admin"} index = {index} componentCount = {this.state.components.length} 
                                                    //   callbacks = {callbacks} componentOptions = {this.props.componentOptions} adminProps = {this.adminProps} >
                                        let newComponent = <Component webStyle = {this.props.webStyle} key={component.id} id = {component.id} pages = {this.props.pages} pageCallbacks = {this.props.pageCallbacks} isMobile = {this.props.isMobile}
                                                   index = {index} pageName = {this.props.pageName} adminProps = {this.adminProps} socialMedias = {this.props.socialMedias} socialMediaCallbacks = {this.props.socialMediaCallbacks}/>
                                // </AdminComponentWrapper>
            pageComponents.push(newComponent)
        });

        // alert(JSON.stringify(pageComponents))
 
        return (
            <div className="w-100" style={{backgroundColor:this.props.webStyle.lightShade}}>    
    
                <WebsiteStyleEditor webStyle = {this.props.webStyle} updateWebStyle = {this.props.updateWebStyle} closeStyleEditor = {this.props.closeStyleEditor} showStyleEditor = {this.props.showStyleEditor}
                                    showStyleEditor = {this.props.showStyleEditor} minimizeStyleEditor = {this.minimizeStyleEditor} expandStyleEditor = {this.expandStyleEditor} 
                                    socialMedias = {this.props.socialMedias} socialMediaCallbacks = {this.props.socialMediaCallbacks} pages = {this.props.pages} pageCallbacks = {this.props.pageCallbacks}/>
                <div id = "outerSection" className="container ">
                    <div id = "innerSection" className="col justify-items-baseline p-5 boxShadow h-100" style={{backgroundColor:this.props.webStyle.lightAccent}}>

                    {/* <div id = "mainSection" style={{width:this.props.isMobile?"100%":`${this.props.webStyle.secondCenterWidth}%`,margin:"auto"}}> Includes everything inside the margin */}
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
            newComponentIndex:-1,
            callbacks: props.callbacks,
            componentOptions: props.componentOptions,
        };

        this.adminProps = props.adminProps

      }

    setButtonsVisibility(showButtons){
        if (this.adminProps.userIsAdmin)
            this.setState({areButtonsVisible: showButtons})
    }
    openAddComponentAbove(){
        // alert("Open above")
        this.setState({areAboveOptionsVisible:true,areBelowOptionsVisible:false,newComponentIndex:this.props.index})
    }
    
    openAddComponentBelow(){
        this.setState({areBelowOptionsVisible:true,areAboveOptionsVisible:false,newComponentIndex:this.props.index+1})
    }

    closeAddComponents(){
        this.setState({areBelowOptionsVisible:false,areAboveOptionsVisible:false,newComponentIndex:this.props.index})
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
 
        // buttonClass = "hidden"
        let options = this.state.componentOptions.map((option) => (
            <button key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</button>
            ))

        options.push(
            <button key ={"deleteButton"} onClick = {()=>{this.closeAddComponents()}}>X</button>
        )

    return ( 
        
        <div className = {"col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false);this.closeAddComponents()}}>
            {/* Above component */}
            {this.state.areAboveOptionsVisible && <div className = {"row component-options"}>{options}</div> }
                {/* To the right of component */}
                <div className = {"row w-100"} style={{position:"relative"}}>
                    {this.children}
                    <div className = {"col floatOnTopRight hidden"}>
                        <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline",zIndex:999}}>
                            {/* {this.props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} */}

                            <div className = {"row"}>
                                <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>
                                {this.props.index != 0 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentUp(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
                            </div>
                            
                            <div className = {"row"}>
                            <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.deleteComponent(this.props.index)}}>Delete</button >
                            <button  className = {buttonClass} onClick = {this.closeAddComponents}>X</button >
                            </div>
                            
                            <div className = {"row"}>
                                <button  className = {buttonClass} onClick = {this.openAddComponentBelow}>Add <FontAwesomeIcon   icon={faSortDown} /></button>

                                {this.props.index != this.props.componentCount - 1 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentDown(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
                            </div>
                        </div>
                    </div>
            </div>
            {/* Below component */}
            {this.state.areBelowOptionsVisible && <div className = {"row component-options"}>{options}</div>}
        
          </div>
    )

    };
}