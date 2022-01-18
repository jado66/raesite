import React, { useState, useEffect } from 'react'

import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faPencilAlt} from '@fortawesome/free-solid-svg-icons'

export default class PlanComparison extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        admin:false,
        edit:false,
        colNameHtmls : ["Package 1","Package 2","Package 3"],
        captionHtml: "* Here is a table caption",
        colCount: 3,
        tempColCount: 3,
        rowGroupCount: 2,
        tempRowGroupCount: 2,
        rowGroups: [3,4],
        tempRowGroups: [3,4]
    }
    this.contentEditables = [React.createRef(),React.createRef(),React.createRef(),React.createRef()]

    this.captionEditable = React.createRef()
  };

  editColHeader(evt,colIndex){
    const newColHeaders = Object.assign([...this.state.colNameHtmls], {
        [colIndex]: evt.target.value
    });
    this.setState({ colNameHtmls: newColHeaders });
    localStorage.setItem(this.props.id+'-colNames',JSON.stringify(newColHeaders));

  }

  componentDidMount(){
    const storedColNames = JSON.parse(localStorage.getItem(this.props.id+'-colNames'))
    const storedColCount = localStorage.getItem(this.props.id+'-colCount')
    const storedRowGroupCount = localStorage.getItem(this.props.id+'-rowGroupCount')
    const storedRowGroups = JSON.parse(localStorage.getItem(this.props.id+'-rowGroups'))

    if (storedColNames){
        this.setState({colNameHtmls: storedColNames})
    }
    if (storedColCount){
        this.setState({colCount: parseInt(storedColCount)})
    }
    if (storedRowGroupCount){
        this.setState({rowGroupCount: parseInt(storedRowGroupCount)})
    }
    if (storedRowGroups){
        this.setState({rowGroups: storedRowGroups})
    }

    // Set header to page name on new render
    
   
  }

  saveTableDimensions(){

    // Check Columns
    let newColNames = [...this.state.colNameHtmls]

    if (this.state.tempColCount > this.state.colNameHtmls.length){
        for (var i = 0; i < this.state.tempColCount - this.state.colNameHtmls.length; i++){
            newColNames.push("New Col")
            this.contentEditables.push(React.createRef())
        }
    }
    else if (this.state.tempColCount < this.state.colNameHtmls.length){
        for (var i = 0; i < this.state.colNameHtmls.length - this.state.tempColCount; i++){
            newColNames.pop()
            this.contentEditables.pop()
        }
    }
    
    // Check Row Groups
    let newRowGroups = [...this.state.rowGroups]

    if (this.state.tempRowGroups > this.state.rowGroupCount){
        for (var i = 0; i < this.state.tempColCount - this.state.colNameHtmls.length; i++){
            newColNames.push("New Col")
            this.contentEditables.push(React.createRef())
        }
    }
    else if (this.state.tempColCount < this.state.colNameHtmls.length){
        for (var i = 0; i < this.state.colNameHtmls.length - this.state.tempColCount; i++){
            newColNames.pop()
            this.contentEditables.pop()
        }
    }

    this.setState((state)=>(
        {
            colNameHtmls:newColNames,
            colCount:state.tempColCount,
            rowGroupCount:state.tempRowGroupCount,
            rowGroups:state.tempRowGroups,
        }
    ),()=>{
        localStorage.setItem(this.props.id+'-colNames',JSON.stringify(newColNames));
        localStorage.setItem(this.props.id+'-colCount',this.state.colCount);
        localStorage.setItem(this.props.id+'-rowGroupCount',this.state.rowGroupCount);
        localStorage.setItem(this.props.id+'-rowGroups', JSON.stringify(this.state.rowGroups))
    })
  }
  

  render(){

    let tableHeaders = []
    
    this.state.colNameHtmls.forEach((value,i)=>{
        tableHeaders.push(
            <ContentEditable
                style={{width: "18%"}}
                className="text-center font-shrink"
                spellCheck = "false"
                innerRef={this.contentEditables[i]}
                html={value} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={(evt)=>{this.editColHeader(evt,i)}} // handle innerHTML change
                tagName='th'/>
        // <th style={{width: "18%"}}>{value}</th>
        )
    })

    let groups = []

    for (var i = 0; i < this.state.rowGroupCount; i++){
        
        let groupRows = [];

        for (var j = 0; j < this.state.rowGroups[i]; j++){
            let newID = this.props.id+`-g${i},r${j}`
            groupRows.push(
                <PlanComparisonRow colCount ={this.state.colCount} id = {newID} key = {newID}/>
            )
        }
        
        groups.push(
            <tbody >
                {groupRows}
            </tbody>
        )
    }

    let adminGroupRowInputs = []

    for (var i = 0; i < this.state.rowGroupCount; i++){ 
        adminGroupRowInputs.push(
            <input className='form-control' value={this.state.rowGroups[i]}/>
        )
    }


    // let tableHeader = [<th style={{width: "18%"}}>Gold</th>,<th style={{width: "18%"}}>Platinum</th>]


    return(
        <div className="table-responsive boxShadow p-3" style={{backgroundColor:this.props.webStyle.lightShade}}>
            
                <div className={this.state.edit?"row mb-3":"hidden"}>
                    <div class="col-5">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id=""> Cols & Groups :</span>
                            </div>
                            <input className='form-control' value={this.state.tempColCount} onChange={(evt)=>{this.setState({tempColCount:evt.target.value})}}/>
                            <input className='form-control' value={this.state.tempRowGroupCount} onChange={(evt)=>{this.setState({tempRowGroupCount:evt.target.value})}}/>
                        </div>
                    </div>
                    <div class="col-7">
                        <div className='input-group'>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="">Group Rows:</span>
                            </div>
                            {adminGroupRowInputs}
                            <div className='input-group-append'>
                                <button onClick={this.saveTableDimensions.bind(this)} className='btn btn-light btn-outline-secondary' >Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                    
                <table className="table text-center table-hover borderless" >
                <ContentEditable
                    spellCheck = "false"
                    innerRef={this.captionEditable}
                    html={this.state.captionHtml} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(evt)=>{this.setState({captionHtml:evt.target.value})}} // handle innerHTML change
                    tagName='caption'/>
                {/* <caption>*All content from shoots, behind-the-scenes, IG lives, extra promtional stories...</caption> */}
                <thead className='relative-div' onMouseEnter={()=>{this.setState({admin:true})}} onMouseLeave={()=>{this.setState({admin:false})}}>
                    <tr>
                    <th style={{width: "28%"}}></th>
                    {tableHeaders}
                    </tr>
                    <div className={'relative-l'+(this.state.admin || this.state.edit ?"":" hidden")}>
                        <button onClick={()=>{this.setState((state)=>({edit:!state.edit}))}} className='btn no-back ' >Dimensions <FontAwesomeIcon  icon={this.state.edit?faCheck:faPencilAlt}/></button>
                    </div>
                </thead>
                    {groups}
                </table>
        </div>
    )
  }
}


function PlanComparisonRow(props){
    const [rowNameHtml, setRowNameHtml] = useState(`Feature`);
    const [checkRow,setCheckRow] = useState([false,false,false,false])
    const contentEditable = React.createRef();

    useEffect(() => {
        // alert("col count changed")
        if (props.colCount > checkRow.length){
            let newCheckRow = [...checkRow]
            for (var i = 0; i < props.colCount - checkRow.length; i++){
                newCheckRow.push(false)
            }
            setCheckRow(newCheckRow)
        }
        else if (props.colCount < checkRow.length){
            let newCheckRow = [...checkRow]
            for (var i = 0; i < checkRow.length - props.colCount; i++){
                newCheckRow.pop()
            }
            setCheckRow(newCheckRow)
        }
      }, [props.colCount]);

      useEffect(() => {
        const storedName = localStorage.getItem(props.id+'-name');
        const storedChecks = JSON.parse(localStorage.getItem(props.id+'-checkRow'))
        
        if (storedName){
            setRowNameHtml(storedName)
        }

        if (storedChecks){
            setCheckRow(storedChecks)
        }

      }, []);
    

    const handleRowNameChange = (evt) =>{
        setRowNameHtml(evt.target.value)
        localStorage.setItem(props.id+'-name',evt.target.value);
    }

    const checkCol = (colNumber) =>{
        let newCheckRow = [...checkRow]
        newCheckRow[colNumber] = !newCheckRow[colNumber]
        setCheckRow(newCheckRow)
        localStorage.setItem(props.id+'-checkRow',JSON.stringify(newCheckRow));

    }

    const columns = checkRow.map((value,index)  => (
        <td className='p-0 align-middle' key={props.id+`${index}`} onClick={()=>{checkCol(index)}}>{value&&<FontAwesomeIcon size={'xs'} icon={faCheck} />}</td>
    ))

    return(
        <tr>
            <ContentEditable
                className="text-start font-shrink"
                spellCheck = "false"
                innerRef={contentEditable}
                html={rowNameHtml} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={handleRowNameChange} // handle innerHTML change
                tagName='th'/>
            {columns}
        </tr>
    )
}



