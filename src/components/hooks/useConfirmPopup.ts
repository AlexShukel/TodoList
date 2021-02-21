import { useState, useCallback, useRef } from 'react';

export const useConfirmPopup = () => {
    const [open, setOpen] = useState(false);
    const openPopup = useCallback(() => setOpen(true), []);
    const closePopup = useCallback(() => setOpen(false), []);

    const resolve = useRef<(ans: boolean) => void>(() => {
        //
    });

    const showConfirmPopup = useCallback(async (): Promise<boolean> => {
        return new Promise((res) => {
            resolve.current = res;
            openPopup();
        }).then((ans: boolean) => {
            closePopup();
            return ans;
        });
    }, [openPopup, closePopup]);

    return {
        open,
        closePopup,
        resolve: resolve.current,
        showConfirmPopup,
    };
};
