'use client';
import WorkInHandFilter from './workInHandDateFilter';

const WorkInHandReport = () => {
    return (
        <>
            <div id="WorkProgression" role="tabpanel">
                <div className="card custom-card team_card">
                    <div className="card-header justify-content-between awards_card_header">
                        <div className="card-title">Work In Hand Report</div>
                        <WorkInHandFilter />
                    </div>
                    <div className="card-body">
                        <div className="table-responsive theme_table">
                            <table className="table text-nowrap table-hover border table-bordered">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="project-width"
                                        >
                                            Project Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="module-width"
                                        >
                                            Module
                                        </th>
                                        <th scope="col">Deadline Date</th>
                                        <th scope="col">Approved Hours</th>
                                        <th scope="col">Billed Hours</th>
                                        <th scope="col">Left Hours</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key="mainuser">
                                        <td>Attom Data Solutions</td>
                                        <td>General Module</td>
                                        <td>02/29/2024</td>
                                        <td className="text-success">12:00</td>
                                        <td className="text-success text-bold">
                                            <b>11:00</b>
                                        </td>
                                        <td className="text-danger">1:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/01/2024</td>
                                        <td className="text-success">5:00</td>
                                        <td className="text-success text-bold">
                                            <b>3:00</b>
                                        </td>
                                        <td className="text-danger">2:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td className="text-danger">2:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-bold">
                                            Total Hours
                                        </td>
                                        <td>32:00</td>
                                        <td className="text-success text-bold">
                                            <b>27:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                5:00
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="table-responsive theme_table">
                            <table className="table text-nowrap table-hover border table-bordered">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="project-width"
                                        >
                                            Project Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="module-width"
                                        >
                                            Module
                                        </th>
                                        <th scope="col">Deadline Date</th>
                                        <th scope="col">Approved Hours</th>
                                        <th scope="col">Billed Hours</th>
                                        <th scope="col">Left Hours</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key="mainuser">
                                        <td>Ptax</td>
                                        <td>General Module</td>
                                        <td>02/29/2024</td>
                                        <td className="text-success">12:00</td>
                                        <td className="text-success text-bold">
                                            <b>11:00</b>
                                        </td>
                                        <td className="text-danger">1:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/01/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td className="text-danger">2:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td className="text-danger">2:00</td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-bold">
                                            Total Hours
                                        </td>
                                        <td>32:00</td>
                                        <td className="text-success text-bold">
                                            <b>27:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                5:00
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="table-responsive theme_table">
                            <table className="table text-nowrap table-hover border table-bordered">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="project-width"
                                        >
                                            Project Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="module-width"
                                        >
                                            Module
                                        </th>
                                        <th scope="col">Deadline Date</th>
                                        <th scope="col">Approved Hours</th>
                                        <th scope="col">Billed Hours</th>
                                        <th scope="col">Left Hours</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key="mainuser">
                                        <td>Orbis</td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                2:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                2:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">15:00</td>
                                        <td className="text-success text-bold">
                                            <b>13:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                2:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-bold">
                                            Total Hours
                                        </td>
                                        <td>32:00</td>
                                        <td className="text-success text-bold">
                                            <b>27:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                5:00
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="table-responsive theme_table">
                            <table className="table text-nowrap table-hover border table-bordered">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="project-width"
                                        >
                                            Project Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="module-width"
                                        >
                                            Module
                                        </th>
                                        <th scope="col">Deadline Date</th>
                                        <th scope="col">Approved Hours</th>
                                        <th scope="col">Billed Hours</th>
                                        <th scope="col">Left Hours</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key="mainuser">
                                        <td>My Outdoor Agent</td>
                                        <td>General Module</td>
                                        <td>03/02/2024</td>
                                        <td className="text-success">8:00</td>
                                        <td className="text-success text-bold">
                                            <b>0:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                0:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/03/2024</td>
                                        <td className="text-success">8:00</td>
                                        <td className="text-success text-bold">
                                            <b>0:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                0:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>General Module</td>
                                        <td>03/04/2024</td>
                                        <td className="text-success">8:00</td>
                                        <td className="text-success text-bold">
                                            <b>0:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                0:00
                                            </span>
                                        </td>
                                        <td>
                                            <select className="form-control w120">
                                                <option>Open</option>
                                                <option>..</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-bold">
                                            Total Hours
                                        </td>
                                        <td>32:00</td>
                                        <td className="text-success text-bold">
                                            <b>27:00</b>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                5:00
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default WorkInHandReport;
