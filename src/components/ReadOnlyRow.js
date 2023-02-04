import React from "react";

const ReadOnlyRow = ({ resort, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{resort.name}</td>
      <td>{resort.location}</td>
      <td>{resort.number_of_ski_runs}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, resort)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(resort.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
