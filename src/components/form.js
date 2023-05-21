import { useForm } from 'react-hook-form';
import React, { useContext, useState } from "react";
import { context } from "../context";
import axios from 'axios';

export default function Form() {

    const pCtx = useContext(context);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isAxios, setIsAxios] = useState(false);

    const onSubmit = (d) => {
        let id = 0;
        let finalGen = 0;
        let finalHMO = 0;
        if (pCtx.genus === "נקבה") { finalGen = 1 }
        else { finalGen = 0 }
        if (pCtx.hMO === "כללית") { finalHMO = 0 }
        if (pCtx.hMO === "מאוחדת") { finalHMO = 1 }
        if (pCtx.hMO === "לאומית") { finalHMO = 3 }
        if (pCtx.hMO === "מכבי") { finalHMO = 2 }
        axios.post(`https://localhost:7070/api/User?firstN=${pCtx.userName}&lastN=${pCtx.lastName}&tz=${pCtx.tz}&d=${pCtx.dateOfBirth}&genus=${finalGen}&hmo=${finalHMO}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("post");
            })
        axios.get(`https://localhost:7070/api/User`)
            .then(res => {
                console.log(res.data[res.data.length - 1]);
                id = res.data[res.data.length - 1].id;
                console.log(res.data[res.data.length - 1].id);
                setIsAxios(true);
                console.log("get");
                pCtx.arrChildrenForms.map((child, ind) => {
                    console.log(child.name);
                    console.log(id);
                    axios.post(`https://localhost:7070/api/Child?firstName=${child.name}&tz=${child.tz}&d=${child.dateBirth}&idParent=${id}`)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                            console.log("post children");
                        })
                })
            })
    };

    const validateChildValues = (target, value) => {
        if (target === 'name') { }
        return false;
    }

    const updateSingleChild = (target, value, i) => {
        pCtx.setArrChildrenForms([...pCtx.arrChildrenForms].map(object => {
            if (object?.index === i) {
                if (validateChildValues(target, value)) {
                    return {
                        ...object,
                        error: true
                    }
                }
                return {
                    ...object,
                    [target]: value,
                    error: false
                };
            }
            return object;
        }
        ))
    }

    const updateChildrenForms = (e) => {
        console.log("update")
        let numChildren = e.target.value;
        pCtx.setNumChildren(numChildren);

        let updatedArr = [];
        for (let i = 0; i < numChildren; i++) {
            if (pCtx.arrChildrenForms.length > i) {
                updatedArr.push(pCtx.arrChildrenForms[i]);
            }
            else {
                updatedArr.push({ index: i, name: '', tz: 123456789, dateBirth: new Date(), error: false });
            }
        }
        pCtx.setArrChildrenForms(updatedArr);
    }

    const getChildrenForms = () => {
        if (pCtx.arrChildrenForms.length > 0) {
            return pCtx.arrChildrenForms.map((n, i) => {
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
                                defaultValue={pCtx.arrChildrenForms[i]?.name}
                                onBlur={(e) => updateSingleChild('name', e.target.value, i)}
                            />
                            {n.error && <p>שדה חובה</p>}
                        </div>

                        <div class="form-group col-md-6">
                            <label for={`Tz${i}`}>תעודת זהות</label>
                            <input type="number" class="form-control"
                                id={`Tz${i}`}
                                {...register(`FirstName${i}`, { required: true, validate: (value) => value > 99999999, valueAsNumber: true })}
                                defaultValue={pCtx.arrChildrenForms[i]?.tz}
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
                                defaultValue={pCtx.arrChildrenForms[i]?.dateBirth}
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

    return (<>

        {!isAxios && <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-row needs-validation" novalidate>

                <div class="form-group col-md-6">
                    <label for="FirstName">שם פרטי</label>
                    <input class="form-control" id="FirstName" {...register('firstName', { required: true })} defaultValue={pCtx.userName} onChange={(e) => { pCtx.setUserName(e.target.value) }} />
                    {errors.firstName && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="LastName">שם משפחה</label>
                    <input class="form-control" id="LastName" {...register('lastName', {
                        required: true, pattern: {
                            message: 'Please enter valid name',
                            value: /^[א-תA-Za-z\u00C0-\u017F]+(?:\s[א-תa-zA-Z\u00C0-\u017F]+)*$/
                        },
                    })} defaultValue={pCtx.lastName} onChange={(e) => { pCtx.setLastName(e.target.value) }} />
                    {errors.lastName && errors.lastName.type === "required" && <p>שדה חובה</p>}
                    {errors.lastName && errors.lastName.type !== "required" && <p> הכנס רק אותיות</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="Tz">תעודת זהות</label>
                    <input type="number" class="form-control" id="Tz" {...register('tz', { required: true, validate: (value) => value > 99999999, valueAsNumber: true })} defaultValue={pCtx.tz} onChange={(e) => { pCtx.setTz(e.target.value) }} />
                    {errors.tz && errors.tz.type === "required" && <p>שדה חובה</p>}
                    {errors.tz && errors.tz.type !== "valueAsNumber" && errors.tz.type !== "required" && <p>מינימום 9 תווים</p>}
                    {errors.tz && errors.tz.type === "valueAsNumber" && <p> הכנס רק מספרים</p>}
                </div>

                <div class="form-group col-md-6">
                    <label for="DateOfBirth">תאריך לידה </label>
                    <input type="date" class="form-control" id="DateOfBirth" {...register('dateOfBirth', { required: true })} defaultValue={pCtx.dateOfBirth} onChange={(e) => { pCtx.setDateOfBirth(e.target.value) }} />
                    {errors.dateOfBirth && errors.dateOfBirth.type === "required" && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-4">
                    <label for="inputState">מין</label>
                    <select id="inputState" class="form-control" {...register('genus', { required: true })}
                        onChange={(e) => { pCtx.setGenus(e.target.value) }} defaultValue={pCtx.genus}>
                        <option selected></option>
                        <option>נקבה</option>
                        <option>זכר</option>
                    </select>
                    {errors.genus && <p>שדה חובה</p>}
                </div>

                <div class="form-group col-md-4">
                    <label for="inputState2">קופת חולים</label>
                    <select id="inputState2" class="form-control" {...register('hMO', { required: true })}
                        onChange={(e) => { pCtx.setHMO(e.target.value) }} defaultValue={pCtx.hMO}>
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
                    <input type="number" class="form-control" id="NumChildren" {...register('numOfChildren', { required: true, validate: (value) => value > -1 })} defaultValue={pCtx.numChildren} onChange={updateChildrenForms} />
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
        {isAxios && <h3>{pCtx.userName}<br></br>פרטיך עודכנו במערכת בהצלחה,<br></br> ! תודה על פניתך ,</h3>}
    </>
    )
}