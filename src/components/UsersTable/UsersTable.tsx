import { useState, useEffect } from "react";
import UsersTableRow from "./UsersTableRow";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./usersTable.css";

export default function UsersTable({ data, onClickRow }) {
  const [users, setUsers] = useState(data);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <div className="usersTable-container dataTable">
      {users.length > 0 ? (
        users.map((user) => {
          return user.role === "USER" ? (
            <UsersTableRow
              userId={user.id}
              image={user.profileImage}
              username={user.nickname}
              amountOfSuspiciousActivity={user.amountOfSuspiciousActivity}
              suspended={user.isSuspended}
              blocked={user.isBlocked}
              onClickRow={onClickRow}
            />
          ) : (
            <></>
          );
        })
      ) : (
        <NoData
          icon={"./icons/noComments-purple.png"}
          text={"Currently system does not have any users"}
        />
      )}
    </div>
  );
}
