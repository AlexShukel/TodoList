import React, { useRef } from 'react';

const _LoadableImage = ({
    src,
    ...otherProps
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const [imageSource, setImageSource] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const _isMounted = useRef(false);

    React.useEffect(() => {
        _isMounted.current = true;
        import(`icons/${src}`)
            .then((value) => {
                if (_isMounted) setImageSource(value.default);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.error(error))
            .finally(() => {
                if (_isMounted) setIsLoading(false);
            });
        return () => {
            _isMounted.current = false;
        };
    });

    return !isLoading ? <img {...otherProps} src={imageSource} /> : null;
};

export const LoadableImage = React.memo(_LoadableImage);
