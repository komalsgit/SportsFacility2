import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.facilityid}</td>
      <td>{contact.facilityname}</td>
      <td>{contact.address}</td>
      <td>{contact.location}</td>
      <td> <label>
         
          <input
            name="isGoing"
            type="checkbox"
           />
        </label></td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;