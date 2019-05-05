import React from "react";
import Icon from '@material-ui/core/Icon';
import _ from "lodash";
import Overlay from 'react-bootstrap/Overlay';
class HeaderCell extends React.Component{
    constructor(props){
        super(props);
        this.attachRef = target => this.setState({ target });
        this.state={
            sortOrder: true,
            show: false,
        }
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }
    handleFilterClick(){
        this.setState({ show: !this.state.show })
    }
    render(){
        const {column} = this.props;
        const { show, target } = this.state;
        console.log("width", column);
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
                  console.log("buton clicked", column.elementcode);
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
                console.log("buton clicked", column.elementcode);
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
              <Overlay target={target} show={show} placement="right">
          {({ placement, scheduleUpdate, arrowProps, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: "#fff",
                padding: '2px 10px',
                color: 'black',
                borderRadius: 3,
                height: "100px",
                width: "200px",
                border: "3px solid black",
                ...props.style,
              }}
            >   
                <div className="filterLabelDiv">
                    <label className="filterLabel">Filter:</label>
                    <input className="filterinput"type="text"/>
                </div>
            </div>
          )}
        </Overlay>
            </div>
            </div>
          </div>
        );
    }
}
export default HeaderCell;