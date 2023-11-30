import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import NewTask from "../../components/NewTask/NewTask";
import "./NewTaskPage.scss"

const NewTaskPage = () => {
        const userId = sessionStorage.getItem("userId");

    return (
        <>
        <Header />
        <div className="new-task__box">
            <NewTask userId={userId} />
        </div>
        </>
    );
};

export default NewTaskPage;