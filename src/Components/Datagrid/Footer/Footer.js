import React from "react";
import Icon from "@material-ui/core/Icon";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      inputToggle: false,
      inputpageNumberValue: props.pageNumber
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
      toggle: !this.state.toggle,
      inputpageNumberValue: 1
    });
    this.props.OptionsHandler(1, value);
  }
  pages(){
    const {rows} = this.props;
    const {rowsPerPage} = this.props;
    return Math.ceil(rows/rowsPerPage);
  }
  firstRowNumber(){
    const {rowsPerPage, pageNumber, rows} = this.props;
    if(rows===0){
      return 0;
    }
    return (pageNumber*rowsPerPage-rowsPerPage)+1;
  }
  lastRowNumber(){
    const {rows, rowsPerPage,pageNumber} = this.props;
    return (pageNumber*rowsPerPage>rows ? rows : pageNumber*rowsPerPage);
  }
  navigation(pageNumber){
    this.setState({
      inputpageNumberValue: pageNumber
    });
    this.props.navigation(pageNumber);
  }
  render() {
    const { rows, noOfRowsOptions, rowsPerPage, pageNumber } = this.props;
    const { toggle, inputToggle, inputpageNumberValue } = this.state;
    const optionsRenderer = noOfRowsOptions.map(option => {
      return (
        <li
          className="eachOption"
          onClick={() => this.OptionsHandler(option.value)}
          key={option.value}
        >
          {option.value}
        </li>
      );
    });
    return (
      <div className="footerDiv">
        <div className="rowsPerPageWrapper">
          <span className="rowsSpan">rows</span>
          <div className="rowsPerPage">
            <div className="defaultOption" onClick={this.rowsPerPageHandler}>
              <span className="numberOfRowsSelected">{rowsPerPage}</span>
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
          <button className="firstPage" onClick={()=>this.navigation(1)} disabled={pageNumber===1}>
            {" "}
            <Icon className="dropDownIcon">first_page</Icon>
          </button>
          <button className="prevPage" onClick={()=>this.navigation(pageNumber-1)} disabled={pageNumber===1}>
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
              {pageNumber}
            </div>
          ) : (
            <input
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.setState({ 
                    inputToggle: !this.state.inputToggle,
                    inputpageNumberValue: inputpageNumberValue===0?1:inputpageNumberValue,
                   });
                   this.props.navigation(inputpageNumberValue===0?1:inputpageNumberValue,);
                }
              }}
              onChange={(e)=>{
                let { value } = e.target;
                value=Number(value.replace(/\D+/g, '').trim());
                if(value<=Math.ceil(rows/rowsPerPage)){
                  this.setState({inputpageNumberValue: value})
                }
              }}
              className="pageNumberInput"
              type="text"
              value={inputpageNumberValue}
            />
          )}
          <span className="slashDiv">/</span>
          <div className="totalPages">
            {
              this.pages()
            }
          </div>
          </div>
          <button className="nextPage" onClick={()=>this.navigation(pageNumber+1)} disabled={pageNumber===Math.ceil(rows/rowsPerPage)}>
            <Icon className="dropDownIcon">navigate_next</Icon>
          </button>
          <button className="lastPage" onClick={()=>this.navigation(Math.ceil(rows/rowsPerPage))} disabled={pageNumber===Math.ceil(rows/rowsPerPage)}>
            <Icon className="dropDownIcon">last_page</Icon>
          </button>
        </div>
        <div className="rowsStatus">
            <div className="firstOfRow">{this.firstRowNumber()}</div>
            <span className="dashSapan">-</span>
            <div className="lastOfRow">{this.lastRowNumber()}</div>
          <span className="slashDiv extraMargin">of</span>            
        <div className="noOfRows">{rows}</div>
        </div>
      </div>
    );
  }
}
export default Footer;
