import React from 'react';
import { I18nLoader } from '../components/I18nContext';

export type EnumI18n<T> = { [K in keyof T]: string };

export interface EnumBundle<T> {
    name: string;
    values: T;
    defaultI18n: EnumI18n<T>;
}

interface Props<T> {
    value: string;
    enumBundle: EnumBundle<T>;
}

export const RenderEnum = <T extends Record<string, string>>({
    value,
    enumBundle: { defaultI18n, name },
}: Props<T>) => {
    return (
        <I18nLoader defaultI18n={defaultI18n} path={`enums.${name}`}>
            {(i18n) => (
                <div>
                    <span>{i18n[value]}</span>
                </div>
            )}
        </I18nLoader>
    );
};
