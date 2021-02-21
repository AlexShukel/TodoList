import React, { useContext } from 'react';
import { merge, cloneDeep } from 'lodash';
import { getIn } from 'formik';

export const I18nContext = React.createContext({} as unknown);

interface I18nLoaderProps<I> {
    defaultI18n: I;
    path?: string;
    children: (i18n: I) => React.ReactNode;
}

export const I18nLoader = <I extends unknown>({
    defaultI18n,
    path,
    children,
}: I18nLoaderProps<I>) => {
    const i18n = useI18n(defaultI18n, path);
    return <React.Fragment>{children(i18n)}</React.Fragment>;
};

export function useI18n<I>(defaultI18n: I, path?: string): I {
    const loadedI18n = useContext(I18nContext);
    return merge(
        cloneDeep(defaultI18n),
        path ? getIn(loadedI18n, path) : loadedI18n
    );
}

export function withI18n<T, I>(
    WrappedComponent: React.ComponentType<T>,
    defaultI18n: I,
    path?: string
) {
    type P = Omit<T, 'i18n'>;
    const WithI18n: React.FC<P> = (props: P) => {
        return (
            <I18nLoader defaultI18n={defaultI18n} path={path}>
                {(i18n) => <WrappedComponent {...(props as T)} i18n={i18n} />}
            </I18nLoader>
        );
    };
    const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

    WithI18n.displayName = `withI18n(${wrappedComponentName})`;
    return WithI18n;
}
