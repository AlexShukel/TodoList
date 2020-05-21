import React from 'react';
import RouterContext from './RouterContext';

interface RouterProps {
    initialPage: string;
}

interface RouterState {
    page: string;
}

export default class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = { page: props.initialPage };
    }
    private goToPage = (page: string) => {
        this.setState({ page });
    };
    public render() {
        return (
            <RouterContext.Provider
                value={{ page: this.state.page, goToPage: this.goToPage }}
            >
                {this.props.children}
            </RouterContext.Provider>
        );
    }
}
