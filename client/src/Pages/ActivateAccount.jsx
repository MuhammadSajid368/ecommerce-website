// src/components/ActivateAccount.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ActivateAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Component mounted');
        console.log('Token:', token);

        if (!token) {
            console.error('No token provided');
            toast.error('Invalid activation link');
            setLoading(false);
            return;
        }

        const activateAccount = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/account-activation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const result = await response.json();
                console.log('Response received:', result);

                if (response.ok) {
                    toast.success(result.message);
                    navigate('/login');
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                console.error('Activation error:', error);
                toast.error('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        activateAccount();
    }, [token, navigate]);

    return (
        <div className="activation-page">
            {loading ? <p>Activating your account...</p> : <p>Activation completed</p>}
        </div>
    );
};

export default ActivateAccount;
