import React from "react";

const metadata = [
    {
      elementcode: "id",
      name: "Id",
      label: "Id",
      "min-width": "100px"
    },
    {
      elementcode: "first_name",
      name: "First Name",
      label: "First Name",
      "min-width": "100px",
      cell: (row, col)=>{
        return <button className="buttonCell" onClick={()=>{window.alert(row[col.elementcode])} }>{row[col.elementcode]}</button>
      }
    },
    {
      elementcode: "last_name",
      name: "Last Name",
      label: "Last Name",
      "min-width": "100px"
    },
    {
      elementcode: "company_name",
      name: "Company Name",
      label: "Company Name",
      "min-width": "100px"
    },
    {
      elementcode: "city",
      name: "city",
      label: "city",
      "min-width": "100px"
    },
    {
      elementcode: "state",
      name: "state",
      label: "state",
      "min-width": "100px"
    },
    {
      elementcode: "zip",
      name: "zip",
      label: "zip",
      "min-width": "100px"
    },
    {
      elementcode: "web",
      name: "web",
      label: "web",
      "min-width": "100px",
      cell: (row, col)=>{
        return <a href={row[col.elementcode]}>{row[col.elementcode]}</a>
      }
    },
    {
      elementcode: "age",
      name: "age",
      label: "age",
      "min-width": "100px"
    }
  ];
  export default metadata;
  