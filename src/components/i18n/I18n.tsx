import React, { useContext } from 'react';
import { merge } from 'lodash';
import { getIn } from 'formik';

export const I18nContext = React.createContext({} as any);

interface I18nLoaderProps<I> {
    defaultI18n: I;
    path?: string;
    children: (i18n: I) => React.ReactNode;
}

const I18nLoader = <I extends unknown>({
    defaultI18n,
    path,
    children,
}: I18nLoaderProps<I>) => {
    const i18n = useI18n(defaultI18n, path);
    return <React.Fragment>{children(i18n)}</React.Fragment>;
};

export function useI18n<I>(defaultI18n: I, path?: string) {
    const loadedI18n = useContext(I18nContext);
    return merge(defaultI18n, path ? getIn(loadedI18n, path) : loadedI18n);
}

export function withI18n<T, I>(
    WrappedComponent: React.ComponentType<T>,
    defaultI18n: I,
    path?: string
) {
    return class extends React.Component<Omit<T, 'i18n'>> {
        render() {
            const { ...other } = this.props;
            return (
                <I18nLoader defaultI18n={defaultI18n} path={path}>
                    {(i18n) => (
                        <WrappedComponent {...(other as T)} i18n={i18n} />
                    )}
                </I18nLoader>
            );
        }
    };
}
