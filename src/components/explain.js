import React, { useContext } from "react";
import { context } from "../context";

export default function Explain() {

    const pCtx = useContext(context);

    return (
        <div>
           <div class="m-3 p=3"> <h1> {pCtx.userName} שלום</h1></div>

           <div class="m-3 p=3"> <h3>מלא את פרטיך בטופס ע"פ ההגדרות</h3>
            <h3>הניתנות לך על יד כל תיבת קלט</h3>
            <h3>לאחר מכן מלא את מספר ילדיך.</h3>
            <h3>עבור כל ילד מלא את פרטיו</h3></div>

           <div class="m-3 p=3"> <h1>!בהצלחה </h1></div>
        </div>
    )
}