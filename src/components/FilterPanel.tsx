import React, { ChangeEvent } from 'react';
import {
    TodoArrayHelper,
    ArrayController,
} from './TodoContext/TodoArrayHelper';
import { IconButton, Icon } from '@material-ui/core';
import { Formik, Field, FieldProps } from 'formik';
import styles from './FilterPanel.scss';
import EnumField from './EnumField';
import Label from './Label';
import { withI18n } from './I18nContext';
import { SortingTypesBundle } from '../enums/SortingTypes';

const defaultI18n = {
    sortingType: 'Sorting type',
};

type I18n = typeof defaultI18n;

interface Props<T, E> {
    arrayPath: string;
    sortingTypes: EnumSortTypes<E, T>;
    values: E;
    defaultCompare: (a: T, b: T) => number;

    i18n: I18n;
}

interface SortType<T> {
    title: string;
    compare: (a: T, b: T) => number;
}

export type EnumSortTypes<E, T> = Record<keyof E, SortType<T>>;

class _FilterPanel<T, E> extends React.Component<Props<T, E>> {
    public render() {
        const { arrayPath, sortingTypes, defaultCompare, i18n } = this.props;

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
                            onSubmit={() => {
                                //
                            }}
                        >
                            {({ values }) => (
                                <Label label={i18n.sortingType} labelWidth={4}>
                                    <div
                                        className={
                                            styles['filter-panel__sorting-type']
                                        }
                                    >
                                        <EnumField
                                            name="sortType"
                                            enumBundle={SortingTypesBundle}
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
                                                width: 120,
                                            }}
                                        />
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
                                                        fontSize="small"
                                                    >
                                                        arrow_upward
                                                    </Icon>
                                                </IconButton>
                                            )}
                                        </Field>
                                    </div>
                                </Label>
                            )}
                        </Formik>
                    );
                }}
            </TodoArrayHelper>
        );
    }
}

const FilterPanel = withI18n(_FilterPanel, defaultI18n, 'FilterPanel');
export default FilterPanel;
