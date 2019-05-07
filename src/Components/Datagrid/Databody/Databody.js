import React from "react";
import HeaderCell from "./HeaderCell";
import _ from "lodash";
class Databody extends React.Component{
    constructor(props){
        super();
        this.myHeaderRef = React.createRef();
        this.myDataBodyRef = React.createRef();
        this.myDatagridBodyRef = React.createRef();


        this.refCollector = {}
        this.state={
            headerWidth: "100%",
            columns: props.columns,
            stopUpdate: false,
            data: props.data,
            footerWidth: "100%"
        }
        this.handleSort = this.handleSort.bind(this);
        this.sort = this.sort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

    }
    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.data, nextProps.data)){
            this.setState({
                data: nextProps.data
            });
        }
    }
    componentDidMount(){
        console.log("this.myDatagridBodyRef", this.myDatagridBodyRef.current)
        this.setState({
            headerWidth: this.myDataBodyRef.current.scrollWidth,
            footerWidth: this.myDataBodyRef.current.clientWidth
        });
    }

    componentDidUpdate(){
        console.log("this.myDatagridBodyRef didUpdate", this.myDatagridBodyRef.current)

        if(!this.state.stopUpdate){
            const columns = this.state.columns.map(col=>{
                col.width = this.refCollector[col.elementcode]
                return col;
            });
            this.setState({
                columns,
                stopUpdate: true
            })
        }
        
        if(this.myDataBodyRef.current.scrollWidth!==this.state.headerWidth){
            this.setState({
                headerWidth: this.myDataBodyRef.current.scrollWidth,
                footerWidth: this.myDataBodyRef.current.clientWidth
            });
        }
    }
    sort(a, b, columnName){
        let first = a;
        let second = b
        if(typeof first[columnName] ==="string" && typeof second[columnName] ==="string"){
            first = first[columnName].toUpperCase();
            second = second[columnName].toUpperCase();
        }
        if(typeof first[columnName] ==="number" && typeof second[columnName] ==="number"){
            first = first[columnName];
            second = second[columnName];
        }
        if(first>second){
            return 1;
        }
        if(first<second){
            return -1;
        }
        return 0;

    }
    
    handleSort(columnName, order){
        let {data} = this.state;
        
        if(order==="asc"){
            data = data.sort((a,b)=>this.sort(a,b, columnName));
        }else{
            data = data.sort((a,b)=>this.sort(a,b, columnName)).reverse();              
        }
        this.setState({ data });
    }
    handleFilter(){

    }
    render(){
        const {columns, data} = this.state;
        const renderColumn = columns.map((col, index)=>{
            return(
                <div key={`headerColumn${col.elementcode}`} className={`headerColumn headerColumn${col.elementcode}`} style={{height: "100%"}}
                ref={(myHeader)=>{ 
                    if(myHeader){
                        this.refCollector[col.elementcode]=myHeader && myHeader.clientWidth || 100; }}
                    }
                >
                   <HeaderCell handleSort={this.handleSort} handleFilter={this.handleFilter} column={col}/>
                </div>
            )
        });
        const rows = data.map((row, index)=>{
            return (
                <div className={`dataGridRow dataGridRow${row.id}`} key={`dataGridRow${index}`}>
                    {
                        columns.map((col, indx)=>{
                        if(col && col.cell){
                            return(
                                <div key={`cell${index}${indx}`} className={`dataGridCell dataGridCell${index}${indx}`} style={{minWidth: `${col["width"]}px`, height: "100%"}}>
                                        {col.cell(row, col)}
                                </div>
                            )
                        }
                        return(
                            <div key={`cell${index}${indx}`} className={`dataGridCell dataGridCell${index}${indx}`} style={{minWidth: `${col["width"]}px`, height: "100%"}}>
                            {row[col.elementcode]}
                        </div>
                        );
                    })
                    }
                </div>
            )
        })
        return(
            <div className="headeranddtatbodyWrapper" ref={this.myDatagridBodyRef}>
                <div className="headerDiv" ref={this.myHeaderRef} style={{width: this.state.headerWidth}}>
                {renderColumn}
            </div>
            <div className="dataBodyDiv" ref={this.myDataBodyRef} style={{width: this.state.headerWidth}}>
                {rows}
            </div>
            </div>
        );
    }
}
export default Databody;