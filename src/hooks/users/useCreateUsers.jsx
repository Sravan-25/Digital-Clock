const useCreateUser = (setUsers) => {
  const createUser = async (userData) => {
    console.log('Creating user via API:', userData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = {
      id: Date.now(),
      ...userData,
    };
    console.log('User created:', newUser);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return { createUser };
};

export default useCreateUser;
