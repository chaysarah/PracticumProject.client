import React, { useContext, useState } from "react";
import { context } from "../context";
import axios from 'axios';



export default function Admin() {
    const [wrongPass, setWrongPass] = useState(false);
    const [isLoginAdmin, setIsLoginAdmin] = useState(false);
    const [subscribedsTrs, setSubscribedsTrs] = useState();
    const [bool, setBool] = useState();

    const pCtx = useContext(context);

    async function getAllSubscribeds() {
        console.log("reached");
        await axios.get(`https://localhost:7070/api/User`).then(res => {
            console.log(res.data);
            showAllSubscribeds(res.data);
        });

    }


    const showAllSubscribeds = (allSubscribeds) => {
        console.log("came");
        console.log(allSubscribeds);
        let subscribedsTrs2 = allSubscribeds.map((sub, ind) => (
            <thead class="thead-dark">
                <tr key={ind}>
                    <td scope="row" >{ind}</td>
                    <td>{sub.firstName}</td>
                    <td>{sub.lastName}</td>
                    <td>{sub.tz}</td>
                    <td>{sub.hmo}</td>
                </tr></thead>
        ));
        setSubscribedsTrs(subscribedsTrs2);
        setBool(true);
    }

    const checkPass = (e) => {
        console.log(e.target.type);
        let pass = e.target.value;
        if (pass == "1234") {
            getAllSubscribeds();
        }
        else {
            setWrongPass(true);
        }
    }

    return (<>

        {!isLoginAdmin &&
            <div class="input-group mb-3 d-flex justify-content-center">
                <input placeholder="הכנס סיסמת מנהל" aria-label="Recipient's username" aria-describedby="basic-addon2" onBlur={checkPass} />
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">@password</span>
                </div>
            </div>
        }
        {wrongPass && <p>קוד שגוי</p>}
        {bool && subscribedsTrs}
    </>)

}