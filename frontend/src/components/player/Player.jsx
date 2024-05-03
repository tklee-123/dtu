import React, { useState } from "react";
import scriptAPI from "../../api/script";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./player.css"; // Import CSS file for Main component
import SideBar from "../sidebar/Sidebar"
const Player = () => {
    const { userInfo } = useUser();
    const { id } = useParams(); // Lấy id từ params của URL
    console.log(id)

    return (
        <div className="wrapper">
            <SideBar playerId={id} /> {/* Truyền id từ params vào Sidebar */}
            <div className="main-container">
                {/* Nội dung của trang Player */}
            </div>
        </div>
    );
};
export default Player;