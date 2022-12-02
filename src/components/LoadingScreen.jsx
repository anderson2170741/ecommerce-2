import React from 'react';

const LoadingScreen = () => {
    return (
        <>
        <div className='spinner-overlay'>
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>
        </>
    );
};

export default LoadingScreen;