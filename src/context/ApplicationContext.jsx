import { createContext, useState } from "react";
import { defaultState } from "./ApplicationDefaultState";

export const ApplicationContext = createContext(null);

export function ApplicationContextComponent(props) {
    const [data, setData] = useState(defaultState);
    const setDataProperty = (property, value) => {
        let newData = { ...data };
        newData[property] = value;
        setData(newData);
    };
    const setDataContext = (dataObject) => {
        let newData = { ...data, ...dataObject };
        setData(newData);
    };
    const utilities = { data, setDataProperty, setDataContext };
    return (
        <ApplicationContext.Provider value={utilities}>
            {props.children}
        </ApplicationContext.Provider>
    );
}
