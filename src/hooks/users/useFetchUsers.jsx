import { useState, useEffect } from 'react';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      console.log('Fetching users from API...');
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Read & Write',
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'Read only',
        },
      ];
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      console.log('Users fetched:', mockUsers);
      setUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useFetchUsers;
