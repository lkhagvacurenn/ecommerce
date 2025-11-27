import { getFirestore } from "firebase/firestore";
import { app } from "./config.js";
db = getFirestore(app);
const Dashboard = () => {
    
        
  return (
    <div>
       {
            db.collection('products').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => 
                <li>doc.data().name</li>
        );})
       }
    </div>
  )
};

export default Dashboard