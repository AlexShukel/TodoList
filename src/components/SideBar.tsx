import React from 'react';
import { TodoArrayHelper, ArrayController } from './TodoContext';
import { TodoGroup } from '../objects/TodoGroup';
import styles from './SideBar.scss';
import {
    Drawer,
    IconButton,
    Icon,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@material-ui/core';

interface State {
    isOpen: boolean;
}

interface SideBarItemProps {
    title: string;
}

class SideBarItem extends React.Component<SideBarItemProps> {
    public render() {
        const { title } = this.props;
        return (
            <ListItem button>
                <ListItemText>{title}</ListItemText>
            </ListItem>
        );
    }
}

class SideBar extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { isOpen: false };
    }
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <div className={styles['side-bar']}>
                            <IconButton
                                onClick={() => {
                                    this.setState({
                                        isOpen: true,
                                    });
                                }}
                            >
                                <Icon>dehaze</Icon>
                            </IconButton>
                            <Drawer
                                open={this.state.isOpen}
                                onClose={() => this.setState({ isOpen: false })}
                                variant="persistent"
                            >
                                <div className={styles['drawer-header']}>
                                    <IconButton
                                        onClick={() => {
                                            this.setState({ isOpen: false });
                                        }}
                                    >
                                        <Icon>chevron_left</Icon>
                                    </IconButton>
                                </div>
                                <Divider />
                                <List>
                                    {controller.array.map((group) => (
                                        <SideBarItem title={group.title} />
                                    ))}
                                </List>
                            </Drawer>
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default SideBar;
