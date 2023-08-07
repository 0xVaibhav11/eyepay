import React from 'react';


export function useDeviceSize() {

    const [width , setWidth] = React.useState(0);
    const [height , setHeight] = React.useState(0);

    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    React.useEffect(() => {

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { width, height };
}
