import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataMy } from '../../../redux/slice/getData';
import Table from '../FetchData/table/Table';
import '../FetchData/FechData.scss';

const itemsPerPage = 4;

function FechData() {
  const dispach = useDispatch();
  const data = useSelector((state) => state.getData.userData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispach(fetchDataMy());
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="fetchdata">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Website</th>
            <th>Pone No</th>
            <th>City</th>
          </tr>
        </thead>
      </table>
      {currentItems &&
        currentItems.map((item) => {
          return <Table key={item} data={item} />;
        })}

      <div className="pagination fix">
        <button className="btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active btn' : 'btn'}>
            {index + 1}
          </button>
        ))}

        <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default FechData;
