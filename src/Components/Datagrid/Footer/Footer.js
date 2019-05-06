import React from "react";
import Icon from "@material-ui/core/Icon";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPageValue: props.rowsPerPage || "",
      toggle: false,
      inputToggle: false,
      PageNumberValue: props.pageNumber,
      inputPageNumberValue: props.pageNumber
    };
    this.rowsPerPageHandler = this.rowsPerPageHandler.bind(this);
    this.OptionsHandler = this.OptionsHandler.bind(this);
    this.pages = this.pages.bind(this);
    this.firstRowNumber = this.firstRowNumber.bind(this);
    this.lastRowNumber = this.lastRowNumber.bind(this);
    this.navigation = this.navigation.bind(this);
  }
  rowsPerPageHandler(){
    this.setState({
      toggle: !this.state.toggle
    });
  }
  OptionsHandler(value){
    this.setState({
      rowsPerPageValue: value,
      toggle: !this.state.toggle,
      PageNumberValue: 1,
      inputPageNumberValue: 1
    });
  }
  pages(){
    const {rows} = this.props;
    const {rowsPerPageValue} = this.state;
    return Math.ceil(rows/rowsPerPageValue);
  }
  firstRowNumber(){
    const {rowsPerPageValue, PageNumberValue} = this.state;
    return (PageNumberValue*rowsPerPageValue-rowsPerPageValue)+1;
  }
  lastRowNumber(){
    const {rows} = this.props;
    const {rowsPerPageValue, PageNumberValue} = this.state;
    return (PageNumberValue*rowsPerPageValue>rows ? rows : PageNumberValue*rowsPerPageValue);
  }
  navigation(pageNumber){
    this.setState({
      PageNumberValue: pageNumber
    });
  }
  render() {
    const { rows, noOfRowsOptions } = this.props;
    const { toggle, rowsPerPageValue, inputToggle, PageNumberValue, inputPageNumberValue } = this.state;
    const optionsRenderer = noOfRowsOptions.map(option => {
      return (
        <li
          className="eachOption"
          onClick={() => this.OptionsHandler(option)}
          key={option}
        >
          {option}
        </li>
      );
    });
    return (
      <div className="footerDiv">
        <div className="rowsPerPageWrapper">
          <span className="rowsSpan">rows</span>
          <div className="rowsPerPage">
            <div className="defaultOption" onClick={this.rowsPerPageHandler}>
              <span>{rowsPerPageValue}</span>
              {!toggle ? (
                <Icon className="dropDownIcon">expand_more</Icon>
              ) : (
                <Icon className="dropUpIcon">expand_less</Icon>
              )}
            </div>
            {toggle && <ul className="optionsWrapper">{optionsRenderer}</ul>}
          </div>
        </div>
        <div className="pagination">
          <button className="firstPage" onClick={()=>this.navigation(1)} disabled={PageNumberValue===1}>
            {" "}
            <Icon className="dropDownIcon">first_page</Icon>
          </button>
          <button className="prevPage" onClick={()=>this.navigation(PageNumberValue-1)} disabled={PageNumberValue===1}>
            <Icon className="dropDownIcon">navigate_before</Icon>
          </button>
          <div className="pageDiv">

          {!inputToggle ? (
            <div
              className="pageNumberInput"
              onClick={() => {
                this.setState({ inputToggle: !this.state.inputToggle });
              }}
            >
              {PageNumberValue}
            </div>
          ) : (
            <input
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.setState({ 
                    inputToggle: !this.state.inputToggle,
                    PageNumberValue: inputPageNumberValue===0?1:inputPageNumberValue,
                    inputPageNumberValue: inputPageNumberValue===0?1:inputPageNumberValue,
                   });
                }
              }}
              onChange={(e)=>{
                let { value } = e.target;
                value=Number(value.replace(/\D+/g, '').trim());
                if(value<=Math.ceil(rows/rowsPerPageValue)){
                  this.setState({inputPageNumberValue: value})
                }
              }}
              className="pageNumberInput"
              type="text"
              value={inputPageNumberValue}
            />
          )}
          <span className="slashDiv">/</span>
          <div className="totalPages">
            {
              this.pages()
            }
          </div>
          </div>
          <button className="nextPage" onClick={()=>this.navigation(PageNumberValue+1)} disabled={PageNumberValue===Math.ceil(rows/rowsPerPageValue)}>
            <Icon className="dropDownIcon">navigate_next</Icon>
          </button>
          <button className="lastPage" onClick={()=>this.navigation(Math.ceil(rows/rowsPerPageValue))} disabled={PageNumberValue===Math.ceil(rows/rowsPerPageValue)}>
            <Icon className="dropDownIcon">last_page</Icon>
          </button>
        </div>
        <div className="rowsStatus">
            <div className="firstOfRow">{this.firstRowNumber()}</div>
            <span className="dashSapan">-</span>
            <div className="lastOfRow">{this.lastRowNumber()}</div>
          <span className="slashDiv extraMargin">/</span>            
        <div className="noOfRows">{rows}</div>
        </div>
      </div>
    );
  }
}
export default Footer;
