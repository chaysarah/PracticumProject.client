import axios from 'axios';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChosenUser } from "../actions/userSlice";
import { useNavigate } from 'react-router-dom';


export default function Admin() {
    const enVar=process.env.REACT_APP_CUSTOM_ENV_VAR;
    const [wrongPass, setWrongPass] = useState(false);
    const [isLoginAdmin, setIsLoginAdmin] = useState(false);
    const [subscribedsTrs, setSubscribedsTrs] = useState();
    const [isShowList, setIsShowList] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getAllSubscribeds() {
        console.log("reached");
        await axios.get(`${enVar}/api/User`).then(res => {
            console.log(res.data);
            showAllSubscribeds(res.data);
        });

    }

    const goToForm = (sub) => {
        dispatch(updateChosenUser(sub));
        navigate('/form');
    }

    const showAllSubscribeds = (allSubscribeds) => {
        console.log("came");
        console.log(allSubscribeds);

        let subscribedsTrs2 = allSubscribeds.map((sub, ind) => (
            <tbody>
                <tr key={ind}>
                    <th scope="row" >{ind}</th>
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
            setWrongPass(false);
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
                    <span class="input-group-text" id="basic-addon2">check password</span>
                </div>
            </div>
        }
        {wrongPass && <p>קוד שגוי</p>}
        {isShowList &&
            <table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <td scope="col" >מספר</td>
                        <td scope="col">שם פרטי</td>
                        <td scope="col">שם משפחה</td>
                        <td scope="col">תעודת זהות</td>
                        <td scope="col">קופת חולים</td>
                        <td scope="col">לטופס</td>
                    </tr>
                </thead>
                {subscribedsTrs}
            </table>
        }
    </>)

}