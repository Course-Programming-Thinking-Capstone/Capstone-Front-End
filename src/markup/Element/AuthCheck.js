import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCheck() {
    // let navigate = useNavigate();

    // useEffect(() => {
    //     const checkAuth = () => {
    //         const token = localStorage.getItem('accessToken');
    //         if (!token) {
    //             navigate('/register'); // Redirect to login
    //         }
    //     };

    //     checkAuth();

    //     const handleStorageChange = () => {
    //         checkAuth();
    //     };

    //     window.addEventListener('storage', handleStorageChange);

    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, [navigate]);

    // return null; 
}
