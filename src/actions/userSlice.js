import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    count: 2,
    chosenPerson: {
        arrChildrenForms: [],
        tz: "123456789",
        userName: "testtt",
        lastName: "",
        dateOfBirth: new Date(),
        genus: "נקבה",
        hMO: "",
        numChildren: 2,
        isUpdeteChildren: false,
    },

    isAxios: false
};

const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signIn: (state, action) => {
            axios.post(`https://localhost:7070/api/User?firstN=${action.payload.chosenPerson.userName}&lastN=${action.payload.chosenPerson.lastName}&tz=${action.payload.chosenPerson.tz}&d=${action.payload.chosenPerson.dateOfBirth}&genus=${action.payload.finalGen}&hmo=${action.payload.finalHMO}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("post");
                })
            axios.get(`https://localhost:7070/api/User`)
                .then(res => {
                    console.log(res.data[res.data.length - 1]);
                    let id = res.data[res.data.length - 1].id;
                    console.log(res.data[res.data.length - 1].id);
                    console.log("get");
                    action.payload.chosenPerson.arrChildrenForms.map((child, ind) => {
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
            state.isAxios = true;
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

