import React, { ChangeEvent } from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { IconButton, Icon } from '@material-ui/core';
import { Formik, Field, FieldProps } from 'formik';
import styles from './FilterPanel.scss';
import EnumField from './EnumField';
import { SortingType, defaultI18n } from '../enums/SortingTypes';
import Label from './Label';

interface Props<T, E> {
    arrayPath: string;
    sortingTypes: EnumSortTypes<E, T>;
    values: E;
    i18n: any;
    defaultCompare: (a: T, b: T) => number;
}

interface SortType<T> {
    title: string;
    compare: (a: T, b: T) => number;
}

export type EnumSortTypes<E, T> = Record<keyof E, SortType<T>>;

export default class FilterPanel<T, E> extends React.Component<Props<T, E>> {
    public render() {
        const { arrayPath, sortingTypes, defaultCompare } = this.props;

        return (
            <TodoArrayHelper arrayPath={arrayPath}>
                {(controller: ArrayController<T>) => {
                    const reorder = (
                        sortingOrder: number,
                        sortType: keyof E
                    ) => {
                        const compare =
                            sortingTypes[sortType]?.compare || defaultCompare;
                        controller.sort(
                            (a: T, b: T) => sortingOrder * compare(a, b)
                        );
                    };
                    return (
                        <Formik
                            initialValues={{
                                sortingOrder: 1,
                                sortType: '' as keyof E,
                            }}
                            onSubmit={() => {}}
                        >
                            {({ values }) => (
                                <div className={styles['filter-panel']}>
                                    <div
                                        className={
                                            styles['filter-panel__sorting-type']
                                        }
                                    >
                                        <Label
                                            label="Sorting type"
                                            labelWidth={6}
                                        >
                                            <EnumField
                                                name="sortType"
                                                values={SortingType}
                                                i18n={defaultI18n}
                                                shownone="true"
                                                onChange={(
                                                    e: ChangeEvent<{
                                                        value: keyof E;
                                                    }>
                                                ) =>
                                                    reorder(
                                                        values.sortingOrder,
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    marginLeft: 10,
                                                    width: 150,
                                                }}
                                            />
                                        </Label>
                                    </div>
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
                                                        field.value === 1
                                                            ? -1
                                                            : 1,
                                                        values.sortType
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
