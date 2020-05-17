import React from 'react';
import { TodoArrayHelper, ArrayController } from './TodoContext';
import { TodoTask } from '../objects/TodoTask';
import { Button, Select, MenuItem, IconButton, Icon } from '@material-ui/core';
import { Menu } from 'electron';
import { Formik, Field, FieldProps } from 'formik';
import styles from './FilterPanel.scss';

interface Props<T> {
    arrayPath: string;
    sortingTypes: SortType<T>[];
    defaultCompare: (a: T, b: T) => number;
}

interface SortType<T> {
    title: string;
    compare: (a: T, b: T) => number;
}

export default class FilterPanel<T> extends React.Component<Props<T>> {
    public render() {
        const { arrayPath, sortingTypes, defaultCompare } = this.props;
        return (
            <TodoArrayHelper arrayPath={arrayPath}>
                {(controller: ArrayController<T>) => {
                    const reorder = (
                        sortingOrder: number,
                        sortType: number
                    ) => {
                        const compare =
                            sortType >= 0 && sortType < sortingTypes.length
                                ? sortingTypes[sortType].compare
                                : defaultCompare;
                        controller.sort(
                            (a: T, b: T) => sortingOrder * compare(a, b)
                        );
                    };
                    return (
                        <Formik
                            initialValues={{
                                sortingOrder: 1,
                                sortType: -1,
                            }}
                            onSubmit={() => {}}
                        >
                            {({ values }) => (
                                <div className={styles['filter-panel']}>
                                    <Field name="sortType">
                                        {({ field }: FieldProps) => (
                                            <div>
                                                Sorting type:
                                                <Select
                                                    {...field}
                                                    onChange={(
                                                        e: React.ChangeEvent<{
                                                            value: number;
                                                        }>
                                                    ) => {
                                                        field.onChange(e);
                                                        reorder(
                                                            values.sortingOrder,
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    <MenuItem value={-1}>
                                                        None
                                                    </MenuItem>
                                                    {sortingTypes.map(
                                                        (value, index) => (
                                                            <MenuItem
                                                                value={index}
                                                                key={index}
                                                            >
                                                                {value.title}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="sortingOrder">
                                        {({ field, form }: FieldProps) => (
                                            <IconButton
                                                onClick={() => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        field.value === 1
                                                            ? -1
                                                            : 1
                                                    );
                                                    reorder(
                                                        values.sortingOrder,
                                                        field.value === 1
                                                            ? -1
                                                            : 1
                                                    );
                                                }}
                                            >
                                                <Icon
                                                    className={
                                                        styles[
                                                            'filter-panel__sorting-order'
                                                        ] +
                                                        ' ' +
                                                        (field.value === 1
                                                            ? styles[
                                                                  'filter-panel__sorting-order_asc'
                                                              ]
                                                            : styles[
                                                                  'filter-panel__sorting-order_desc'
                                                              ])
                                                    }
                                                >
                                                    arrow_upward
                                                </Icon>
                                            </IconButton>
                                        )}
                                    </Field>
                                </div>
                            )}
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}
