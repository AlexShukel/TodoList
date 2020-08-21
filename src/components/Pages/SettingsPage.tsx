import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { Language } from '../../enums/Language';
import { useI18n } from '../I18nContext';
import { defaultI18n as languagesI18n } from '../../enums/Language';
import { Button } from '@material-ui/core';
import TodoContext from '../TodoContext/TodoContext';

interface Props {
    initialLanguage: Language;
}
const defaultI18n = {
    languages: languagesI18n,
    apply: 'Apply',
};

const SettingsPage = ({ initialLanguage }: Props) => {
    const i18n = useI18n(defaultI18n, 'SettingsPage');
    const values = useContext(TodoContext);
    return (
        <Formik
            initialValues={{ language: initialLanguage }}
            onSubmit={(value) => {
                values.setValues({
                    groups: values.groups,
                    language: value.language,
                });
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
