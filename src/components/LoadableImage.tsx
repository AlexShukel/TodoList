import React from 'react';

export const LoadableImage: React.FunctionComponent<React.ImgHTMLAttributes<
    HTMLImageElement
>> = React.memo(({ src, ...otherProps }) => {
    const [imageSource, setImageSource] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    let _isMounted = false;

    React.useEffect(() => {
        _isMounted = true;
        import(`icons/${src}`)
            .then((value) => {
                if (_isMounted) setImageSource(value.default);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (_isMounted) setIsLoading(false);
            });
        return () => {
            _isMounted = false;
        };
    });

    return !isLoading ? <img {...otherProps} src={imageSource} /> : null;
});
