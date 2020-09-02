import React from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { TodoGroup } from '../objects/TodoGroup';
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
    Button,
} from '@material-ui/core';
import Link from './Router/Link';

import { useI18n } from './I18nContext';
import styles from './SideBar.scss';

const defaultI18n = {
    settings: 'Settings',
    addNewGroup: 'Add new group',
    myGroups: 'My groups',
};

interface SideBarItemProps {
    title: string;
    groupId: number;
    closeSideBar: () => void;
}

const SideBarItem = ({ title, groupId, closeSideBar }: SideBarItemProps) => (
    <Link href={`group?groupId=${groupId}`}>
        {(onClick) => (
            <ListItem
                onClick={() => {
                    onClick();
                    closeSideBar();
                }}
                button
            >
                <ListItemText disableTypography>
                    <Typography className="text-ellipsis">{title}</Typography>
                </ListItemText>
            </ListItem>
        )}
    </Link>
);

const SideBar = () => {
    const [open, setOpen] = React.useState(false);
    const i18n = useI18n(defaultI18n, 'SideBar');

    const closeSideBar = () => setOpen(false);

    return (
        <TodoArrayHelper arrayPath={`groups`}>
            {(controller: ArrayController<TodoGroup>) => {
                return (
                    <ClickAwayListener onClickAway={closeSideBar}>
                        <div>
                            <IconButton onClick={() => setOpen(true)}>
                                <Icon>dehaze</Icon>
                            </IconButton>
                            <Drawer
                                open={open}
                                onClose={closeSideBar}
                                variant="persistent"
                            >
                                <div className={styles['drawer']}>
                                    <div className={styles['drawer__header']}>
                                        <Link href="groups">
                                            {(onClick) => (
                                                <IconButton
                                                    onClick={() => {
                                                        onClick();
                                                        closeSideBar();
                                                    }}
                                                >
                                                    <Icon>home</Icon>
                                                </IconButton>
                                            )}
                                        </Link>
                                        <Typography
                                            className={
                                                styles['groups-list__header']
                                            }
                                            variant="subtitle1"
                                        >
                                            {i18n.myGroups}
                                        </Typography>
                                        <IconButton onClick={closeSideBar}>
                                            <Icon>chevron_left</Icon>
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <div className={styles['drawer__content']}>
                                        <List>
                                            {controller.array.map((group) => (
                                                <SideBarItem
                                                    title={group.title}
                                                    groupId={group.id}
                                                    closeSideBar={closeSideBar}
                                                    key={group.id}
                                                />
                                            ))}
                                        </List>
                                    </div>
                                    <div className={styles['drawer__footer']}>
                                        <Link href="settings">
                                            {(onClick) => (
                                                <Button
                                                    onClick={() => {
                                                        onClick();
                                                        closeSideBar();
                                                    }}
                                                    startIcon={
                                                        <Icon>settings</Icon>
                                                    }
                                                >
                                                    {i18n.settings}
                                                </Button>
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
};

export default SideBar;
