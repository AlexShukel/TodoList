import React from 'react';
import RouterContext from './RouterContext';

interface RouteProps {
    location: string;
}

export default class Route extends React.Component<RouteProps> {
    public render() {
        return (
            <RouterContext.Consumer>
                {({ page }) =>
                    this.props.location === page && this.props.children
                }
            </RouterContext.Consumer>
        );
    }
}
