import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
   const connections = useSelector((store) => store.connections);
   const dispatch = useDispatch();
   const fetchConnections = async () => {
    try {
        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
    } catch(err) {
        console.error(err);
    }
   };

   useEffect(() => {
    fetchConnections();
   }, []);

   if(!connections) return;

   if(connections.length == 0 ) return <h1 className="flex justify-center my-10"> No Connections found for you</h1>;

    return (
        <div className="text-center my-10">
        <h1 className="font-bold italic text-3xl">My Connections </h1>
        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about} = connection;
        
       return  (
            <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-200 w-1/3 mx-auto"> 
            <div>
                 <img alt="photo" className="w-30 h-30 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-8 ">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
            </div>          
            </div>
        );      
    })}
    </div>
  );
};

export default Connections;