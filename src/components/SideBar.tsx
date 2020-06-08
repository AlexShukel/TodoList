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
    ClickAwayListener,
    ListItemIcon,
} from '@material-ui/core';
import Link from './Router/Link';

import NewGroupForm from './NewGroupForm';

interface State {
    isOpen: boolean;
    addingGroup: boolean;
}

interface SideBarItemProps {
    title: string;
    groupId: number;
    closeSideBar: () => void;
}

class SideBarItem extends React.Component<SideBarItemProps> {
    public render() {
        const { title, groupId } = this.props;
        return (
            <Link href={`group?groupId=${groupId}`}>
                {(onClick) => (
                    <ListItem
                        onClick={() => {
                            onClick();
                            this.props.closeSideBar();
                        }}
                        button
                    >
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
        this.state = { isOpen: false, addingGroup: false };
    }
    private closeSideBar = () => {
        this.setState({ isOpen: false });
    };
    private endAdding = () => {
        this.setState({ addingGroup: false });
    };
    public render() {
        return (
            <TodoArrayHelper arrayPath={`groups`}>
                {(controller: ArrayController<TodoGroup>) => {
                    return (
                        <ClickAwayListener onClickAway={this.closeSideBar}>
                            <div>
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
                                    onClose={() =>
                                        this.setState({ isOpen: false })
                                    }
                                    variant="persistent"
                                >
                                    <div className={styles['drawer']}>
                                        <div
                                            className={styles['drawer__header']}
                                        >
                                            <Link href="groups">
                                                {(onClick) => (
                                                    <IconButton
                                                        onClick={() => {
                                                            onClick();
                                                            this.closeSideBar();
                                                        }}
                                                    >
                                                        <Icon>home</Icon>
                                                    </IconButton>
                                                )}
                                            </Link>
                                            <Typography
                                                className={
                                                    styles[
                                                        'groups-list__header'
                                                    ]
                                                }
                                                variant="subtitle1"
                                            >
                                                My groups
                                            </Typography>
                                            <IconButton
                                                onClick={() => {
                                                    this.setState({
                                                        isOpen: false,
                                                    });
                                                }}
                                            >
                                                <Icon>chevron_left</Icon>
                                            </IconButton>
                                        </div>
                                        <Divider />
                                        <div
                                            className={
                                                styles['drawer__content']
                                            }
                                        >
                                            <List>
                                                {controller.array.map(
                                                    (group) => (
                                                        <SideBarItem
                                                            title={group.title}
                                                            groupId={group.id}
                                                            closeSideBar={
                                                                this
                                                                    .closeSideBar
                                                            }
                                                            key={group.id}
                                                        />
                                                    )
                                                )}

                                                {!this.state.addingGroup && (
                                                    <ListItem
                                                        button
                                                        onClick={() =>
                                                            this.setState({
                                                                addingGroup: true,
                                                            })
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <Icon>add</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            Add new group
                                                        </ListItemText>
                                                    </ListItem>
                                                )}
                                            </List>
                                            {this.state.addingGroup && (
                                                <ClickAwayListener
                                                    onClickAway={this.endAdding}
                                                >
                                                    <NewGroupForm />
                                                </ClickAwayListener>
                                            )}
                                        </div>
                                        <div
                                            className={styles['drawer__footer']}
                                        >
                                            <Link href="settings">
                                                {(onClick) => (
                                                    <IconButton
                                                        onClick={() => {
                                                            onClick();
                                                            this.closeSideBar();
                                                        }}
                                                    >
                                                        <Icon>settings</Icon>
                                                    </IconButton>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                        </ClickAwayListener>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

export default SideBar;
