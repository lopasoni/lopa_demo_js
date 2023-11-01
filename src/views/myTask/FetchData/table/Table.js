import React from 'react';
import '../table/Table.scss';

const Table = ({ data }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            <td>{data.id}</td>
            <td>{data.username}</td>
            <td>{data.website}</td>
            <td>{data.phone}</td>
            <td>{data.address.city}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
