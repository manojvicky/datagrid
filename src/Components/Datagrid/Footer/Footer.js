import React from "react";
import Icon from "@material-ui/core/Icon";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPageValue: props.rowsPerPage || "",
      toggle: false,
      inputToggle: false,
      inputPageValue: props.pageNumber
    };
    this.rowsPerPageHandler = this.rowsPerPageHandler.bind(this);
    this.OptionsHandler = this.OptionsHandler.bind(this);
  }
  rowsPerPageHandler() {
    this.setState({
      toggle: !this.state.toggle
    });
  }
  OptionsHandler(value) {
    this.setState({
      rowsPerPageValue: value,
      toggle: !this.state.toggle
    });
  }
  render() {
    const { rows, noOfRowsOptions, pageNumber } = this.props;
    const { toggle, rowsPerPageValue, inputToggle, inputPageValue } = this.state;
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
          <div className="firstPage">
            {" "}
            <Icon className="dropDownIcon">first_page</Icon>
          </div>
          <div className="prevPage">
            <Icon className="dropDownIcon">navigate_before</Icon>
          </div>
          {!inputToggle ? (
            <div
              className="pageNumberInput"
              onClick={() => {
                this.setState({ inputToggle: !this.state.inputToggle });
              }}
            >
              {inputPageValue}
            </div>
          ) : (
            <input
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.setState({ inputToggle: !this.state.inputToggle });
                }
              }}
              onChange={()=>{}}
              className="pageNumberInput"
              type="text"
              value={inputPageValue}
            />
          )}
          <div className="nextPage">
            <Icon className="dropDownIcon">navigate_next</Icon>
          </div>
          <div className="lastPage">
            <Icon className="dropDownIcon">last_page</Icon>
          </div>
        </div>
        <div className="noOfRows">{rows}</div>
      </div>
    );
  }
}
export default Footer;
