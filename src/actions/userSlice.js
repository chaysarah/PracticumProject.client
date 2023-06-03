import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const envVar=process.env.REACT_APP_CUSTOM_ENV_VAR;

const initialState = {
    chosenPerson: {
        arrChildrenForms: [],
        tz: "",
        userName: "",
        lastName: "",
        dateOfBirth: new Date(),
        genus: "",
        hMO: "",
        numChildren: 0,
        isUpdeteChildren: false,
    }
};

const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signIn: (state, action) => {
            axios.post(`${envVar}/api/User?firstN=${action.payload.chosenPerson.userName}&lastN=${action.payload.chosenPerson.lastName}&tz=${action.payload.chosenPerson.tz}&d=${action.payload.chosenPerson.dateOfBirth}&genus=${action.payload.finalGen}&hmo=${action.payload.finalHMO}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("post");
                })
            axios.get(`${envVar}/api/User`)
                .then(res => {
                    console.log(res.data[res.data.length - 1]);
                    let id = res.data[res.data.length - 1].id;
                    console.log(res.data[res.data.length - 1].id);
                    console.log("get");
                    action.payload.chosenPerson.arrChildrenForms.map((child, ind) => {
                        console.log(child.name);
                        console.log(id);
                        axios.post(`${envVar}/api/Child?firstName=${child.name}&tz=${child.tz}&d=${child.dateBirth}&idParent=${id}`)
                            .then(res => {
                                console.log(res);
                                console.log(res.data);
                                console.log("post children");
                            })
                    })
                })
        },
        updateChosenUser: (state, action) => {
            state.chosenPerson = action.payload;
        },
        updateUser: (state, action) => {
            state.chosenPerson = action.payload;
        },
    }
});

export const { updateChosenUser, signIn, updateUser } = userSlice.actions;
export default userSlice.reducer;

