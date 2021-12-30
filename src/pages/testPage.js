import React from 'react';

function H1(props){return <h1>H1-{props.id}</h1>}
function H2(props){return <h2>H2-{props.id}</h2>}
function H3(props){return <h3>H3-{props.id}</h3>}

export default class TestPage extends React.Component {
    constructor(props) {
        super(props);

        this.componentMapping = {
            H1:H1,
            H2:H2,
            H3:H3,
          };
 
        this.state = {
            componentNames: ["H1","H2","H3","H2","H3"]
        };
    }
 
    moveComponentUp(index){
        this.swapComponents(index,index-1)
    }
    moveComponentDown(index){
        this.swapComponents(index,index+1)
    }
 
    swapComponents(indexA,indexB){
        let newComponentNames = this.state.componentNames.slice();
        let temp = this.state.componentNames[indexB];
        newComponentNames[indexB] = newComponentNames[indexA];
        newComponentNames[indexA] = temp;
 
        this.setState({componentNames: newComponentNames});
    }

    generateID(componentName,originalIndex){
        return`${componentName}_${originalIndex}`;
    }

    render() {

        let pageComponents = []

        this.state.componentNames.forEach((componentName, index) => {
                let callbacks = {
                    moveComponentUp: ()=>{this.moveComponentUp(index)},
                    moveComponentDown: ()=>{this.moveComponentDown(index)} 
                               }
                let newID = this.generateID(componentName, index)
                
                const Component = this.componentMapping[componentName];

                let newComponent = <ComponentWrapper key ={`${componentName}+${index}`} index = {index} componentCount = {this.state.componentNames.length} callbacks = {callbacks}>
                                        <Component index = {index} key={newID} id = {newID}/>
                                    </ComponentWrapper>

                pageComponents.push(newComponent)
        });
 
        return (
            <div >
                {pageComponents}
            </div>
        );
    }
  }
 
class ComponentWrapper extends React.Component {
    constructor(props) {
        super(props);
        // this.children = props.children;

      } 

    render() {

    return ( 
        
        <div style = {{display: "flex",  flexDirection: "column", border:"1px solid black",margin:"10px 0px"}}>
            <div style={{display: "flex",  flexDirection: "row", position:"relative"}}>
                {this.props.index}{this.props.children}
                <div style={{display: "flex",  flexDirection: "column",position: "absolute", right: "0"}}>
                    <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline"}}>
                        {this.props.index != 0 && <button onClick = {this.props.callbacks.moveComponentUp}>Move Up</button>}
                        {this.props.index != this.props.componentCount - 1 && <button onClick = {this.props.callbacks.moveComponentDown}>Move Down</button>}
                    </div>
                </div>
            </div>
        </div>
    )
    };
}
