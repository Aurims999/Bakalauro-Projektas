import { useEffect, useState } from "react";

import TableRow from "./TableRow";
import NoData from "../Error-Handling/NoData/NoData";

import "./table.css";

export default function Table({ data }) {
  const [tableData, setData] = useState(data.comments ?? []);

  useEffect(() => {
    if (data && data.comments) {
      setData(data.comments);
      console.log(tableData);
    }
  }, [data]);

  return (
    <div className="dataTable">
      <div
        className={`tableContainer ${
          !tableData || tableData.length === 0 ? "noComments" : ""
        }`}
      >
        {tableData && tableData.length > 0 ? (
          <>
            <div className="table-header">
              <h2>Memory</h2>
              <h2>Title</h2>
              <h2>Comment</h2>
              <h2>Status</h2>
            </div>
            <div className="table-content">
              {tableData.map((comment) => {
                return <TableRow data={comment} />;
              })}
            </div>
          </>
        ) : (
          <NoData
            icon={"./icons/comments-purple.png"}
            text={
              "You haven't posted any comments yet. Go and check out what others have posted!"
            }
          />
        )}
      </div>
    </div>
  );
}
