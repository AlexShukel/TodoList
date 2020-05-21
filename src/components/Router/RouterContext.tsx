import React from 'react';

interface RouterData {
    page: string;
    goToPage: (page: string) => void;
}

const RouterContext = React.createContext({} as RouterData);

export default RouterContext;
