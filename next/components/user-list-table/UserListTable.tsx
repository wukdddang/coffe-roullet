import React from "react";

const UserList = ({ users }) => {
  return (
    <>
      {users.map((user, index) => (
        <tr key={user._id}>
          <th scope="row">{index + 1}</th>
          <td>{user.name}</td>
          <td>{user.times}</td>
          <td>{user.weight.toFixed(1)}</td>
          <td>
            <button
              className="plus-permanently btn btn-primary btn-sm ms-2"
              data-name={user.name}
            >
              ＋
            </button>
            <button
              className="minus-permanently btn btn-outline-primary btn-sm"
              data-name={user.name}
            >
              －
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default UserList;
