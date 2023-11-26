import "./UserInfo.scss";

function UserInfo({ userData }) {
    return (
        <div className="user__info">
            <img src={userData.avatar} alt="User Avatar" />
            <p>{`${userData.firstName} ${userData.lastName}`}</p>
        </div>
    );
}

export default UserInfo;