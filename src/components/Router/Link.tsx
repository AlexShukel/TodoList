import React from 'react';
import RouterContext from './RouterContext';

interface LinkProps {
    href: string;
    children: (onClick: () => void) => React.ReactNode;
}

export default class Link extends React.Component<LinkProps> {
    public render() {
        return (
            <RouterContext.Consumer>
                {(value) =>
                    this.props.children(() => value.goToPage(this.props.href))
                }
            </RouterContext.Consumer>
        );
    }
}
