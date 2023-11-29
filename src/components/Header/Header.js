import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-white.svg";
import menuIcon from "../../assets/icons/menu-dropdown.svg";
import homeIcon from "../../assets/icons/home-button.svg";
import newTaskIcon from "../../assets/icons/new-task.svg";
import taskIcon from "../../assets/icons/task-menu.svg";
import "./Header.scss";

function Header() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleLogoClick = () => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            navigate(`/users/${userId}`);
        } else {
            console.error("User ID is not available.");
        }
        closeSidebar();
    };

    const handleBackdropClick = (e) => {
        if (!e.target.closest(".header__sidebar")) {
            closeSidebar();
        }
    };

    return (
        <div className={`header ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <div className="header__menu-icon" onClick={toggleSidebar}>
                <img src={menuIcon} alt="Menu" />
            </div>
            <div className="header__logo" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="header__new-task">
                <Link to="/new-task">
                    <img src={newTaskIcon} alt="New Task" />
                </Link>
            </div>
            {isSidebarOpen && (
                <div className="header__sidebar">
                    <button onClick={() => navigate(`/users/${sessionStorage.getItem("userId")}`)}>
                        <img src={homeIcon} alt="Home" />
                        <p className="header__menu-option">Home</p>
                    </button>
                    <button onClick={() => navigate("/tasks")}>
                        <img src={taskIcon} alt="Tasks" />
                        <p className="header__menu-option">Tasks</p>
                    </button>
                    <button onClick={() => navigate("/new-task")}>
                        <img src={newTaskIcon} alt="Create New Task" />
                        <p className="header__menu-option">Create Task</p>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
