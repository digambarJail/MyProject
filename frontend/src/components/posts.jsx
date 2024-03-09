// Posts page, representing the data using DataTable

import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const Posts = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // useEffect hook for fetching the data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, Please SignUp');
                }

                const response = await axios.get('http://localhost:3000/api/auth/posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const dataWithSerial = response.data.map((item, index) => ({
                    ...item,
                    srNo: index + 1,
                }));

                setData(dataWithSerial);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);

    // Adding style to the table
    const customStyles = {
        headCells: {
            style: {
                background: '#4b5563',
                color: '#ffffff',
                fontSize: '1rem'
            },
        },
        rows: {
            style: {
                fontSize: '0.7rem',
                fontWeight: '400', 
                textAlign: 'center', 
            },
        },
        pagination: {
            style: {
                borderTop: 'none',
            },
        },
    };

    // Setting the columns
    const columns = [
        {
            name: 'Sr. No.',
            selector: row => row.srNo,
            sortable: true,
            width: '10%'
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            cell: (row) => <div style={{ fontSize: '1.1rem' }}>{row.name}</div>,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            cell: (row) => <div style={{ fontSize: '1.1rem' }}>{row.email}</div>,
        },
    ];

    return (
        <div className="bg-gray-100 mx-20 p-6 rounded-md shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4">Posts</h1>
            {error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <DataTable
                    className="border border-black border-2px"
                    columns={columns}
                    data={data}
                    defaultSortFieldId={1}
                    pagination
                    customStyles={customStyles}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]} 
                />
            )}
        </div>
    );
};

export default Posts;
