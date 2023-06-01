import axios from 'axios';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChosenUser } from "../actions/userSlice";


export default function Admin() {
    const [wrongPass, setWrongPass] = useState(false);
    const [isLoginAdmin, setIsLoginAdmin] = useState(false);
    const [subscribedsTrs, setSubscribedsTrs] = useState();
    const [isShowList, setIsShowList] = useState();
    const dispatch = useDispatch();

    async function getAllSubscribeds() {
        console.log("reached");
        await axios.get(`https://localhost:7070/api/User`).then(res => {
            console.log(res.data);
            showAllSubscribeds(res.data);
        });

    }

    const goToForm = (sub) => {
        dispatch(updateChosenUser(sub));
    }

    const showAllSubscribeds = (allSubscribeds) => {
        console.log("came");
        console.log(allSubscribeds);

        let subscribedsTrs2 = allSubscribeds.map((sub, ind) => (
            <tbody>
                <tr key={ind}>
                    <td scope="row" >{ind}</td>
                    <td>{sub.firstName}</td>
                    <td>{sub.lastName}</td>
                    <td>{sub.tz}</td>
                    <td>{sub.hmo}</td>
                    <td><button onClick={() => { goToForm(sub); }}>לעריכה</button></td>
                </tr>
            </tbody>
        ));
        setSubscribedsTrs(subscribedsTrs2);
        setIsShowList(true);
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
        {isShowList &&
            <table>
                <thead class="thead-dark">
                    <tr>
                        <td scope="row" >{"מספר"}</td>
                        <td>שם פרטי</td>
                        <td>שם משפחה</td>
                        <td>תעודת זהות</td>
                        <td>קופת חולים</td>
                        <td>{"לטופס"}</td>
                    </tr>
                </thead>
                {subscribedsTrs}
            </table>
        }
    </>)

}