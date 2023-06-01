import { useState } from "react";
import { createContext } from "react";

export const context= createContext();

export default function Context(props) {
    const [userName, setUserName] = useState('')
    const [lastName, setLastName] = useState('')
    const [tz, setTz] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [genus, setGenus] = useState()
    const [hMO, setHMO] = useState()
    const [numChildren, setNumChildren] = useState(0)
    const [arrChildrenForms, setArrChildrenForms] = useState([])
    const [isUpdeteChildren, setIsUpdeteChildren] = useState(false)

    return (
        <context.Provider value={{ userName, setUserName,lastName,
        setLastName,tz,setTz,dateOfBirth,setDateOfBirth,genus,setGenus,hMO,setHMO
        ,numChildren,setNumChildren,arrChildrenForms,setArrChildrenForms,
        isUpdeteChildren,setIsUpdeteChildren }}>
            {props.children}
        </context.Provider>
    )
}


