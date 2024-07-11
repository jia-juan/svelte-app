import { writable } from 'svelte/store';
import { push } from 'svelte-spa-router';

export const error = writable('');

export const login = async (username, password) => {
    error.set('');
    const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        push('/orders');
    } else {
        const errorMessage = await response.json();
        error.set(errorMessage.detail || 'Login failed');
    }
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    push('/login');
};