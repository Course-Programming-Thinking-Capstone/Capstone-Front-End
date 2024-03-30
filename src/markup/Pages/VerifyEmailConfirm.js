import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import background from './../../images/background/loginBackground.webp';
import CenterSliderHome3 from './../Element/CenterSliderHome3';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function VerifyEmailConfirm() {
    const query = useQuery();
    const email = query.get('Email');
    const token = query.get('Token');

    useEffect(() => {
        if (!email || !token) {
            console.error('Email and token are required.');
            return;
        }

        const verifyEmail = async () => {
            const url = `https://www.kidpro-production.somee.com/api/v1/authentication/confirm/check/Email=${encodeURIComponent(email)}&Token=${token}`;

            try {
                const response = await fetch(url);
                const data = await response.json(); 
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}, message: ${data.message}`);
                    return; 
                }

                console.log(data); 
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        verifyEmail();
    }, [email, token]);


    return (
        <div style={{
            backgroundImage: `url(${background})`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="verify">
                <h3 className='text-center' style={{ color: '#FF8A00' }}>Your account has been activated, please login to our web for further service</h3>
                <div className="d-flex justify-content-center">
                    <button style={{ backgroundColor: '#FF8A00', border: 'none', borderRadius: '8px', color: 'white' }}>Login now</button>
                </div>
            </div>
        </div>
    )
}
