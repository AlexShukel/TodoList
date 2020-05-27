import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
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
    Typography,
} from '@material-ui/core';
import Link from './Router/Link';

interface State {
    isOpen: boolean;
}

interface SideBarItemProps {
    title: string;
    groupId: number;
}

class SideBarItem extends React.Component<SideBarItemProps> {
    public render() {
        const { title, groupId } = this.props;
        return (
            <Link href={`group?groupId=${groupId}`}>
                {(onClick) => (
                    <ListItem onClick={onClick} button>
                        <ListItemText>{title}</ListItemText>
                    </ListItem>
                )}
            </Link>
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
                                    <Link href="groups">
                                        {(onClick) => (
                                            <IconButton onClick={onClick}>
                                                <Icon>home</Icon>
                                            </IconButton>
                                        )}
                                    </Link>
                                    <IconButton
                                        onClick={() => {
                                            this.setState({ isOpen: false });
                                        }}
                                    >
                                        <Icon>chevron_left</Icon>
                                    </IconButton>
                                </div>
                                <Divider />
                                <span className={styles['groups-list']}>
                                    <Typography
                                        className={
                                            styles['groups-list__header']
                                        }
                                        variant="h5"
                                    >
                                        My groups
                                    </Typography>
                                    <List>
                                        {controller.array.map((group) => (
                                            <SideBarItem
                                                title={group.title}
                                                groupId={group.id}
                                                key={group.id}
                                            />
                                        ))}
                                    </List>
                                </span>
                            </Drawer>
                        </div>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default SideBar;
