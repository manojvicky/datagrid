import React from "react";

class Header extends React.Component{
    constructor(props){
        super();
        this.myHeaderRef = React.createRef();
        this.refCollector = {}
    }
    componentDidMount(){
        console.log("ref", this.myHeaderRef.current);

    }
    render(){
        const {columns} = this.props;
        const renderColumn = columns.map((col, index)=>{
            return(
                <div key={`headerColumn${col.elementcode}`} className={`headerColumn headerColumn${col.elementcode}`} style={{minWidth: col["min-width"], height: "100%"}}
                ref={(myHeaderRef)=>{ console.log(myHeaderRef); this.myHeaderRef=myHeaderRef}}
                >
                    {col.name}
                </div>
            )
        });
        return(
            <div className="headerDiv">
                {renderColumn}
            </div>
        );
    }
}
export default Header;