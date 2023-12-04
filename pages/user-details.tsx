// pages/user-details.tsx
import { useState } from 'react';
import axios from 'axios';
import { User } from '../types';

interface UserDetailsProps {
    user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address.street}, {user.address.city}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

const UserInput: React.FC<{ onSubmit: (userId: number) => void }> = ({ onSubmit }) => {
    const [userId, setUserId] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(userId);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Enter User ID:</label>
            <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value, 10))}
                className="mt-1 p-2 border rounded w-full"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Get User Details
            </button>
        </form>
    );
};

const UserDetailsPage: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);

    const getUserDetails = async (userId: number) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user details', error);
            setUserData(null);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Details Page</h1>
            <UserInput onSubmit={getUserDetails} />
            <UserDetails user={userData} />
        </div>
    );
};

export default UserDetailsPage;
