import React from "react";
import HeaderCell from "./HeaderCell";
class Databody extends React.Component{
    constructor(props){
        super();
        this.myHeaderRef = React.createRef();
        this.myDataBodyRef = React.createRef();

        this.refCollector = {}
        this.state={
            headerWidth: "100%",
            columns: props.columns,
            stopUpdate: false
        }
    }
    componentDidMount(){
        this.setState({
            headerWidth: this.myDataBodyRef.current.scrollWidth
        });
    }

    componentDidUpdate(){
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
                headerWidth: this.myDataBodyRef.current.scrollWidth
            });
        }
    }
    render(){
        const { data} = this.props;
        const {columns} = this.state;

        const renderColumn = columns.map((col, index)=>{
            return(
                <div key={`headerColumn${col.elementcode}`} className={`headerColumn headerColumn${col.elementcode}`} style={{height: "100%"}}
                ref={(myHeader)=>{ 
                    if(myHeader){
                        this.refCollector[col.elementcode]=myHeader && myHeader.clientWidth || 100; }}
                    }
                >
                   <HeaderCell column={col}/>
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
            <div className="headeranddtatbodyWrapper">
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