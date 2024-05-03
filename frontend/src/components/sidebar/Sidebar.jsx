import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css"; // Import file CSS cho side bar

const Sidebar = ({ playerId }) => { // Nhận playerId từ props
    return (
        <div className="sidebar">
            <ul>
                {/* Đường dẫn sẽ chứa playerId khi nhấn vào các link */}
                <li><Link to={`/profile/${playerId}`}>Thông tin cá nhân</Link></li>
                <li><Link to={`/recommended-questions/${playerId}`}>Câu hỏi được gợi ý</Link></li>
                <li><Link to={`/nearest-players/${playerId}`}>Cụm người chơi giống nhất</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;