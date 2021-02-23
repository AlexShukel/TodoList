import React, { useCallback, useRef, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { ConfirmPopup } from './ConfirmPopup';

interface ConfirmPopupContextType {
    showConfirmPopup: (message: string) => Promise<boolean>;
}

export const ConfirmPopupContext = React.createContext<ConfirmPopupContextType>(
    ({} as unknown) as ConfirmPopupContextType
);

export const ConfirmPopupProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    const openPopup = useCallback(() => setOpen(true), []);
    const closePopup = useCallback(() => setOpen(false), []);

    const resolve = useRef<(ans: boolean) => void>(() => {
        //
    });
    const messageRef = useRef<string>('');

    const showConfirmPopup = useCallback(
        async (message: string): Promise<boolean> => {
            return new Promise((res) => {
                resolve.current = res;
                messageRef.current = message;
                openPopup();
            }).then((ans: boolean) => {
                closePopup();
                return ans;
            });
        },
        [openPopup, closePopup]
    );

    return (
        <ConfirmPopupContext.Provider value={{ showConfirmPopup }}>
            <Dialog
                open={open}
                onClose={closePopup}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        resolve.current(true);
                    }
                }}
            >
                <ConfirmPopup
                    resolve={resolve.current}
                    message={messageRef.current}
                />
            </Dialog>
            {children}
        </ConfirmPopupContext.Provider>
    );
};
