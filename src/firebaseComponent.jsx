import React from 'react';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";


const firebaseConfig = {
    // apiKey: "AIzaSyDCH-INJkG1yntRzPe9MfbXw5ggUEqHMJg",
    // authDomain: "breno-tours.firebaseapp.com",
    // databaseURL: "https://breno-tours-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "breno-tours",
    // storageBucket: "breno-tours.appspot.com",
    // messagingSenderId: "628782122689",
    // appId: "1:628782122689:web:f277523e75398839b33640",
    // measurementId: "G-HCQJDQE6D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
const FirebaseComponent = () => {

    const [users, setUsers] = React.useState([]);

    const setUser = () => {
        const usersCollection = collection(db, "users");
        setDoc(doc(usersCollection, "ada"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        }, { merge: true });
    }



    const addUser = () => {
        addDoc(collection(db, "users"), {
            first: "Ada" + Math.random(),
            last: "Lovelace",
            born: 1815
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.log(error);
            }
            );
    }

    const getUsers = async () => {
        // get all users from users collection
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        }
        );
        console.log("📢[firebaseComponent.jsx:59]: usersList: ", usersList);
        setUsers(usersList);
    }

    React.useEffect(() => {
        getUsers();
    }, [])




    return (
        <div>
            <h1>Firebase Component</h1>
            <button onClick={() => getUsers()}>Get</button>
            <button onClick={() => addUser()}>Add</button>
            <button onClick={() => setUser()}>Set</button>

            {users.map(user => {
                return <UserComponent user={user} key={user.id} />
            }
            )}

        </div>
    );
}



const UserComponent = ({ user }) => {
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} >
            <h5>{user.first}</h5>
            <span>{user.last}</span>
            <small>{user.born}</small>
            <button onClick={() => deleteUser(user.id)}>Remove</button>
        </div>
    )

}




export default FirebaseComponent;