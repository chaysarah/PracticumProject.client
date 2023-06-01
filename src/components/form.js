import React from "react";
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { updateTz } from '../actions/userSlice';

export default function Form() {

    const dispatch = useDispatch();

    const isAxios = useSelector((state) => state.isAxios);
    const chosenPerson = useSelector((state) => state.user.chosenPerson);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (d) => {
        let finalGen = 0;
        let finalHMO = 0;
        if (chosenPerson.genus === "נקבה") { finalGen = 1 }
        else { finalGen = 0 }
        if (chosenPerson.hMO === "כללית") { finalHMO = 0 }
        if (chosenPerson.hMO === "מאוחדת") { finalHMO = 1 }
        if (chosenPerson.hMO === "לאומית") { finalHMO = 3 }
        if (chosenPerson.hMO === "מכבי") { finalHMO = 2 }

        dispatch(updateTz(chosenPerson, finalGen, finalHMO))
    };

    const validateChildValues = (target, value) => {
        if (target === 'name') { }
        return false;
    }

    const updateSingleChild = (target, value, i) => {
        // pCtx.setArrChildrenForms([...pCtx.arrChildrenForms].map(object => {
        //     if (object?.index === i) {
        //         if (validateChildValues(target, value)) {
        //             return {
        //                 ...object,
        //                 error: true
        //             }
        //         }
        //         return {
        //             ...object,
        //             [target]: value,
        //             error: false
        //         };
        //     }
        //     return object;
        // }
        // ))
    }

    const updateChildrenForms = (e) => {
        console.log("update")
        let numChildren = e.target.value;
        // pCtx.setNumChildren(numChildren);

        let updatedArr = [];
        for (let i = 0; i < numChildren; i++) {
            if (chosenPerson.arrChildrenForms.length > i) {
                updatedArr.push(chosenPerson.arrChildrenForms[i]);
            }
            else {
                updatedArr.push({ index: i, name: '', tz: 123456789, dateBirth: new Date(), error: false });
            }
        }
        // pCtx.setArrChildrenForms(updatedArr);
    }

    const getChildrenForms = () => {
        if (chosenPerson.arrChildrenForms && chosenPerson.arrChildrenForms.length > 0) {
            return chosenPerson.arrChildrenForms.map((n, i) => {
                return (
                    <>
                        <br />
                        <h4> ילד מספר: {i + 1}</h4>
                        <br />
                        <div class="form-group col-md-6">
                            <label for={`FirstName${i}`}>שם פרטי</label>
                            <input class="form-control"
                                id={`firstName${i}`}
                                required={!n.error}
                                defaultValue={chosenPerson.arrChildrenForms[i]?.name}
                                onBlur={(e) => updateSingleChild('name', e.target.value, i)}
                            />
                            {n.error && <p>שדה חובה</p>}
                        </div>

                        <div class="form-group col-md-6">
                            <label for={`Tz${i}`}>תעודת זהות</label>
                            <input type="number" class="form-control"
                                id={`Tz${i}`}
                                {...register(`FirstName${i}`, { required: true, validate: (value) => value > 99999999, valueAsNumber: true })}
                                defaultValue={chosenPerson.arrChildrenForms[i]?.tz}
                                onChange={(e) => { updateSingleChild('tz', e.target.value, i) }} />
                            {errors[`tz${i}`] && errors.tz.type === "required" && <p>שדה חובה</p>}
                            {errors.tz && errors.tz.type !== "valueAsNumber" && errors.tz.type !== "required" && <p>מינימום 9 תווים</p>}
                            {errors.tz && errors.tz.type === "valueAsNumber" && <p> הכנס רק מספרים</p>}
                        </div>

                        <div class="form-group col-md-6">
                            <label for={`DateOfBirth${i}`}>תאריך לידה </label>
                            <input type="date" class="form-control"
                                id={`DateOfBirth${i}`}
                                {...register(`dateOfBirth${i}`, { required: true })}
                                defaultValue={chosenPerson.arrChildrenForms[i]?.dateBirth}
                                onChange={(e) => { updateSingleChild('dateBirth', e.target.value, i) }} />
                            {errors[`dateOfBirth${i}`] && errors.dateOfBirth.type === "required" && <p>שדה חובה</p>}
                        </div>
                        <br />
                        <br />
                    </>
                )
            });
        }
    }

    return chosenPerson ? <>


        {!isAxios && <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-row needs-validation" novalidate>

                <div class="form-group col-md-6">
                    <label for="FirstName">שם פרטי</label>
                    <input class="form-control" id="FirstName" {...register('firstName', { required: true })} defaultValue={chosenPerson.userName} onChange={(e) => {
                        // pCtx.setUserName(e.target.value) 
                    }} />
                    {errors.firstName && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="LastName">שם משפחה</label>
                    <input class="form-control" id="LastName" {...register('lastName', {
                        required: true, pattern: {
                            message: 'Please enter valid name',
                            value: /^[א-תA-Za-z\u00C0-\u017F]+(?:\s[א-תa-zA-Z\u00C0-\u017F]+)*$/
                        },
                    })} defaultValue={chosenPerson.lastName} onChange={(e) => { chosenPerson.setLastName(e.target.value) }} />
                    {errors.lastName && errors.lastName.type === "required" && <p>שדה חובה</p>}
                    {errors.lastName && errors.lastName.type !== "required" && <p> הכנס רק אותיות</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="Tz">תעודת זהות</label>
                    <input type="number" class="form-control" id="Tz" {...register('tz', { required: true, validate: (value) => value > 99999999, valueAsNumber: true })} defaultValue={chosenPerson.tz} onChange={(e) => {
                        // pCtx.setTz(e.target.value) 
                    }} />
                    {errors.tz && errors.tz.type === "required" && <p>שדה חובה</p>}
                    {errors.tz && errors.tz.type !== "valueAsNumber" && errors.tz.type !== "required" && <p>מינימום 9 תווים</p>}
                    {errors.tz && errors.tz.type === "valueAsNumber" && <p> הכנס רק מספרים</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="DateOfBirth">תאריך לידה </label>
                    <input type="date" class="form-control" id="DateOfBirth" {...register('dateOfBirth',
                        { required: true })} defaultValue={chosenPerson.dateOfBirth} onChange={(e) => {
                            //  pCtx.setDateOfBirth(e.target.value) 
                        }} />
                    {errors.dateOfBirth && errors.dateOfBirth.type === "required" && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-4">
                    <label for="inputState">מין</label>
                    <select id="inputState" class="form-control" {...register('genus', { required: true })}
                        onChange={(e) => {
                            // pCtx.setGenus(e.target.value) 
                        }} defaultValue={chosenPerson.genus}>
                        <option selected></option>
                        <option>נקבה</option>
                        <option>זכר</option>
                    </select>
                    {errors.genus && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-4">
                    <label for="inputState2">קופת חולים</label>
                    <select id="inputState2" class="form-control" {...register('hMO', { required: true })}
                        onChange={(e) => {
                            //  pCtx.setHMO(e.target.value)
                        }} defaultValue={chosenPerson.hMO}>
                        <option selected></option>
                        <option>כללית</option>
                        <option>מכבי</option>
                        <option>לאומית</option>
                        <option>מאוחדת</option>
                    </select>
                    {errors.hMO && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="NumChildren">מספר ילדים</label>
                    <input type="number" class="form-control" id="NumChildren" {...register('numOfChildren', { required: true, validate: (value) => value > -1 })} defaultValue={chosenPerson.numChildren} onChange={updateChildrenForms} />
                    {errors.numOfChildren && errors.numOfChildren.type === "required" && <p>שדה חובה</p>}
                    {errors.numOfChildren && errors.numOfChildren.type !== "required" && <p>מספר הילדים אינו יכול להיות שלילי </p>}
                </div>

                {getChildrenForms()}
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </form>}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        {isAxios && <h3>{chosenPerson.userName}<br></br>פרטיך עודכנו במערכת בהצלחה,<br></br> ! תודה על פניתך ,</h3>}



    </> : <></>

}