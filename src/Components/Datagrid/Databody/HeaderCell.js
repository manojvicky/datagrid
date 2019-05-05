import React from "react";
import Icon from '@material-ui/core/Icon';
import _ from "lodash";
class HeaderCell extends React.Component{
    constructor(props){
        super(props);
        this.attachRef = target => this.setState({ target });
        this.state={
            sortOrder: true,
            show: false,
            filterValue: ""
        }
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClose = this.onClose.bind(this);

    }
    handleFilterClick(){
        this.setState({ show: !this.state.show })
    }
    handleChange(e){
        console.log("input value",e.target.value);
        this.setState({
            filterValue: e.target.value
        });
    }
    onClose(){
        console.log("On close");
    }
    render(){
        const {column} = this.props;
        const { show, target } = this.state;
        return (
          <div className="headerCell" style={{width: `${column.width}px`}}>
            <div className="headerCellLabel" style={{width: `${column.width-40}px`}}>{column.name}</div>
            <div className="twoDiv">
            <div className="sortDiv">
            {
                this.state.sortOrder ? <Icon
                className="sortIcon"
                onClick={() => {
                    this.setState({
                        sortOrder: !this.state.sortOrder
                    });
                    this.props.handleSort(column.elementcode, "asc");
                }}
              >
                arrow_drop_up
              </Icon> : 
              <Icon
              className="sortIcon"
              onClick={() => {
                  this.setState({
                      sortOrder: !this.state.sortOrder
                  });
                  this.props.handleSort(column.elementcode, "dec");
              }}
            >
              arrow_drop_down
            </Icon>
            }
            </div>
            <div className="threeDotsDiv">
              <Icon
                className="threeDotsIcon"
                ref={this.attachRef}
                onClick={this.handleFilterClick}
              >
                more_vert
              </Icon>
            </div>
            </div>
          </div>
        );
    }
}
export default HeaderCell;