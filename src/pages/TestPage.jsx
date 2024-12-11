// src/pages/HomePage.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../server/supabase.js';
import Navbar from '../components/Navbar';
import AmountBox from '../components/AmountBox';
import { Line } from 'react-chartjs-2';
import TransactionBox from '../components/TransactionBox';
import { useDarkMode } from '../context/DarkModeContext';
import { config, recentTransactions } from '../mock_data';
import { setUserProfile, setUserBalance, setError } from '../features/userSlice.js';

const HomePage = () => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  // Retrieve profile and balance from Redux store
  const { profile, balance, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfileAndBalance = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (session?.session) {
        const userId = session.session.user.id;

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          dispatch(setError('Error fetching profile: ' + profileError.message));
          return;
        }
        dispatch(setUserProfile(profileData)); // Store profile in Redux

        // Fetch user balance
        const { data: balanceData, error: balanceError } = await supabase
          .from('balance')
          .select('balance')
          .eq('user_id', userId)
          .single();

        if (balanceError) {
          dispatch(setError('Error fetching balance: ' + balanceError.message));
          return;
        }
        dispatch(setUserBalance(balanceData.balance)); // Store balance in Redux
      } else {
        dispatch(setError('You are not logged in!'));
      }
    };

    fetchProfileAndBalance();
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile || balance === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />

      {/* Welcome message */}
      <div className="w-full text-left pt-6 px-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          Welcome, {profile.first_name}!
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 p-6">
        {/* Amount boxes */}
        <div className="flex flex-wrap justify-around gap-4">
          <AmountBox
            title="Balance"
            amount={balance}
            className={`w-full sm:w-[45%] md:w-[30%] lg:w-[20%] p-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          />
          <AmountBox
            title="Expenses"
            amount="1500" // Placeholder for now
            className={`w-full sm:w-[45%] md:w-[30%] lg:w-[20%] p-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          />
        </div>

        {/* Chart and transactions */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart container */}
          <div className="w-full lg:w-2/3 h-[50vh] p-4">
            <Line
              options={config.options}
              data={config.data}
              className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}
            />
          </div>

          {/* Transaction box */}
          <div className="w-full lg:w-1/3 p-4">
            <TransactionBox
              title={'Recent Transactions'}
              transactions={recentTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
