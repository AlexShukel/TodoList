import { useContext } from 'react';
import { ConfirmPopupContext } from '../popups/ConfirmPopupProvider';

export const useConfirmPopup = () => {
    const { showConfirmPopup } = useContext(ConfirmPopupContext);

    return {
        showConfirmPopup,
    };
};
