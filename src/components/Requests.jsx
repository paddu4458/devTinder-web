import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {} , {
                withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
        });
            dispatch(addRequests(res.data.data));
        } catch(err) {
            console.error(err);
        }
    };



    useEffect(() => {
        fetchRequests();
    }, []);

  if(!requests) return;

   if(requests.length == 0 ) return <h1 className="flex justify-center my-10"> No Friend Requests found for you</h1>;

    return (
        <div className="text-center my-10">
        <h1 className="font-bold italic text-3xl">New Friend requests</h1>
        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
        
       return  (
            <div key={_id} className="flex  items-center justify-between m-4 p-4 rounded-lg bg-base-200 w-1/3 mx-auto"> 
            <div>
                 <img alt="photo" className="w-30 h-30 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-8 ">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
            </div> 
            <div>
                
<button className="btn mx-2 btn-primary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
<button className="btn mx-2 btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>Accept</button></div>         
            </div>
        );      
    })}
    </div>
  );
};

export default Requests;