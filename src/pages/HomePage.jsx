import AmountBox from '../components/AmountBox'
import { amountData } from '../mock_data'
import Navbar from '../components/Navbar'
import { config } from '../mock_data'
import { Line } from 'react-chartjs-2'
import TransactionBox from '../components/TransactionBox'
import { recentTransactions } from '../mock_data'
import { useDarkMode } from '../context/DarkModeContext'; // Import dark mode context

function HomePage() {
  const { darkMode } = useDarkMode(); // Access dark mode state

  return (
    <div className={`h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Navbar />

      {/* Welcome message */}
      <div className="w-full text-left pt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
        Welcome,  
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Chart container */}
        <div className="w-full md:w-[70vw] lg:w-[75vw] h-[50vh] p-4">
          <Line
            options={config.options}
            data={config.data}
            className={darkMode ? "bg-gray-800" : "bg-gray-50"}
          />
        </div>

        {/* Transaction box */}
        <div className="w-full md:w-[30vw] lg:w-[25vw] p-4">
          <TransactionBox
            title={"Recent Transactions"}
            transactions={recentTransactions}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
