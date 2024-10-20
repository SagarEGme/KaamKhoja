import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ childeren }) => {
    const { user } = useSelector(store => store.auth);
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
        if (user===null && user.role !== "recruiter") {
            console.log("cant access page")
            navigate("/")
        }
    },[])
    return <>
        {childeren}
    </>
}

export default ProtectedRoute