import * as React from 'react';
import avatarRoman from '../../avatars/Roman.jpg';

const EmployeeDetails = () => {
    return (
        <div className="card">
            <div className="row no-gutters">
                <div className="col-md-3">
                    <img src={avatarRoman} className="card-img" alt="..." />
                </div>
                <div className="col-md-9 mt-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Ионов Роман Дмитриевич</li>
                        <li className="list-group-item">Отдел Frontend-разработки</li>
                        <li className="list-group-item">r-io-home@ya.ru</li>
                        <li className="list-group-item">8(909)360-01-42</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default EmployeeDetails;