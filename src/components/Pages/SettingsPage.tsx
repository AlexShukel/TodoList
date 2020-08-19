import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { Language } from '../../enums/Language';
import { withI18n, useI18n, I18nContext } from '../i18n/I18n';
import { defaultI18n as languagesI18n } from '../../enums/Language';
import { Button } from '@material-ui/core';
import TodoContext from '../TodoContext/TodoContext';

const defaultI18n = {
    languages: languagesI18n,
    apply: 'Apply',
};

interface Props {
    initialLanguage: Language;
}

const SettingsPage = ({ initialLanguage }: Props) => {
    const i18n = useI18n(defaultI18n, 'SettingsPage');
    const values = useContext(TodoContext);
    // const i18nContext = useContext(I18nContext);
    return (
        <Formik
            initialValues={{ language: initialLanguage }}
            onSubmit={(value) => {
                values.setValues({
                    groups: values.groups,
                    language: value.language,
                });
                // i18nContext.setI18n();
            }}
        >
            <Form>
                <Field name="language" as="select">
                    {Object.keys(Language).map((key) => (
                        <option value={key} key={key}>
                            {i18n.languages[key]}
                        </option>
                    ))}
                </Field>
                <Button type="submit">{i18n.apply}</Button>
            </Form>
        </Formik>
    );
};

export default SettingsPage;
