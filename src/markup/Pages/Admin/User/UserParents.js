import React, { useEffect, useState } from 'react';
import instance from '../../../../helper/apis/baseApi/baseApi';
import ReactPaginate from 'react-paginate';

export default function UserParents() {
    const [parents, setParents] = useState([]); // State to store the parents data
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Pagination starts at page 0
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchParents = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`api/v1/users/admin/account?role=Parent`);
                // Assume the API returns the entire section data needed
                const data = response.data;
                console.log(' data: ', data);

                setParents(data.results);
                setPageCount(Math.ceil(data.totalRecords / pageSize));
            } catch (error) {
                console.error('Failed to fetch section details:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchParents();
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected); // react-paginate uses selected to indicate the new page number
    };

    return (
        <div className='admin-user my-5 mx-5 pt-3 px-5' style={{ backgroundColor: 'white', height: '650px' }}>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5>Parents</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-user-group"></i>
                </div>
            </div>
            <div>
                <div class="table-responsive" style={{ height: '500px' }}>
                    <table class="table table-bordered"  >
                        <thead >
                            <tr className='text-center' style={{ backgroundColor: '#1A9CB7 !important' }}>
                                <th>INDEX</th>
                                <th>IMAGE</th>
                                <th>FULL NAME</th>
                                <th>EMAIL</th>
                                <th>REGISTRATION DAY</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && parents.map((parent, index) => (

                                <tr key={index} className='text-center'>
                                    <td>1</td>
                                    <td></td>
                                    <td>{parent.fullName}</td>
                                    <td>{parent.email}</td>
                                    <td>{parent.createdDate}</td>
                                    <td>{parent.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {!loading && (
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                )}
            </div>
        </div>
    )
}
