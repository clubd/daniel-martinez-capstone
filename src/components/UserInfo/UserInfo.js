import "./UserInfo.scss";
import avatar from "../../assets/icons/avatar.svg"

function UserInfo({ userData }) {
    return (
        <div className="user">
            <img className="user__img" src={avatar}/*{userData.avatar}*/ alt="User Avatar" />
            <p className="user__info">{`${userData.firstName} ${userData.lastName}`}</p>
        </div>
    );
}

export default UserInfo;