import React, { useContext } from "react";
//import { useNavigate } from 'react-router-dom';
//import { useParams } from "react-router-dom";
import { context } from "../context";

export default function Explain() {

    const pCtx = useContext(context);

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1> {pCtx.userName} שלום</h1>
            <br></br>
            <h2>מלא את פרטיך בטופס ע"פ ההגדרות</h2>
            <h2>הניתנות לך על יד כל תיבת קלט</h2>
            <h2>לאחר מכן מלא את מספר ילדיך.</h2>
            <h2>עבור כל ילד מלא את פרטיו</h2>
            <br></br>
            <h1>!בהצלחה </h1>
        </div>
    )
}