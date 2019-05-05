import React from "react";
import SplitPane from "react-split-pane";
class Datagrid extends React.Component {
    render() {
        const { columns, data } = this.props;
        const newObj = {};
        columns.map(col => {
            newObj[col.elementcode] = col.name;
        });
        const newData = [newObj, ...data];
        const renderColumns = columns.map((col, index) => {
            const cells = newData.map((row, inx) => {
                return (
                    <div key={`${Math.random() * 3}${index}`} className="cells">
                        {row[col.elementcode]}
                    </div>
                );
            });
            return (
                <div key={`${Math.random() * 3}${col.elementcode}`} className="columns">
                    {cells}
                </div>
            );
        });
        const reduce = renderColumns.reverse().reduce((res, current) => {
            if (res === 0) {
                return (
                    <div>
                        {current}
                    </div>
                )
            }
            return (
                <SplitPane t split="vertical" minSize={50} defaultSize={200}>
                    <div>
                        {current}
                    </div>
                    <div>
                        {res}
                    </div>
                </SplitPane>
            );
        }, 0);
        console.log("datagridProps", reduce);
        return (
        <div className="wrapper">
            {reduce}
        </div>
        );
    }
}
export default Datagrid;
