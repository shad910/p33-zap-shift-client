import React from 'react';

const MyParcels = () => {

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                    {/* rows */}
                    <tr className="hover:bg-base-300">
                        <th>1</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;