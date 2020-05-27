import React from 'react';
import RouterContext from './RouterContext';

interface RouteProps {
    location: string;
    children: (param: { [key: string]: string }) => React.ReactNode;
}

export default class Route extends React.Component<RouteProps> {
    private getLocationWithoutParams = (location: string) =>
        location.lastIndexOf('?') >= 0
            ? location.substring(0, location.lastIndexOf('?'))
            : location;
    private getParamsFromLocation = (
        location: string
    ): { [key: string]: string } | null => {
        if (location.lastIndexOf('?') === -1) return null;
        const parametersSource = location.substring(
            location.lastIndexOf('?') + 1
        );
        const parametersArray = parametersSource
            .split('&')
            .map((keyParamPair) => keyParamPair.split('='));
        return parametersArray.reduce<{ [key: string]: string }>(
            (previousValue, currentValue) => {
                previousValue[currentValue[0]] = currentValue[1];
                return previousValue;
            },
            {}
        );
    };
    public render() {
        return (
            <RouterContext.Consumer>
                {({ page }) =>
                    this.props.location ===
                        this.getLocationWithoutParams(page) &&
                    this.props.children(this.getParamsFromLocation(page))
                }
            </RouterContext.Consumer>
        );
    }
}
