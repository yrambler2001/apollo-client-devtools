import React, { useState, useEffect } from 'react';
import { container } from "./index.css";

function buildListItems(queries) {
  return queries.map((item, index) => {
    return <li key={index}>{item}</li>;
  })
}

function ActiveQueries(props) {
  const mockQueries  = ['hi', 'there', 'active'];
  const [queries, setQueries] = useState([]);
  const {getQueries} = props;

  useEffect(() => {
    getQueries();
    setQueries(mockQueries);
  }, []);

  return (
    <div className={container}>
      <h1>Active Queries</h1>
      <ul>
        {buildListItems(queries)}
      </ul>
    </div>
  )
}

export default ActiveQueries;
