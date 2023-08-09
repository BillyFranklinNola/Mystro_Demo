import React, { useEffect } from 'react';

const withScrollReset = (WrappedComponent) => {
    const WithScrollReset = (props) => {
        useEffect(() => {
            const handleRouteChange = () => window.scrollTo(0, 0);
            window.addEventListener('hashchange', handleRouteChange);
            return () => {
                window.removeEventListener('hashchange', handleRouteChange);
            };
        }, []);
        return <WrappedComponent {...props} />;
        };
    return WithScrollReset;
};

export default withScrollReset;
