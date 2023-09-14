import React from 'react';

function Checkout() {
    const gifURL = "https://media.tenor.com/suRA-3MIp8UAAAAd/cleaning-money-squidward.gif"

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={gifURL} alt="Checkout Gif" />
        </div>
    );
}

export default Checkout;
