"use client";
import React from "react";
const DataContext = React.createContext<{
    data?: Record<string, any>;
    setData: React.Dispatch<
        React.SetStateAction<Record<string, any> | undefined>
    >;
}>({
    data: {},
    setData: () => {},
});

export const useDataContext = () => React.useContext(DataContext);

const DataProvider = (props: React.PropsWithChildren<{}>) => {
    const [data, setData] = React.useState<Record<string, any>>();

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;
