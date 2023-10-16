import { useState } from 'react';
import AccountSettings from './AccountSettings';
import Orders from './Orders';
import PaymentSettings from './PaymentSettings';
import InvalidPage from '../authentication/InvalidPage';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode');
  const [settingsMode, setSettingsMode] = useState(initialMode || 'Account');

  const handleNavigation = (newMode) => {
    // Update the query parameters without navigating to a new page
    queryParams.set('mode', newMode);
    navigate({ search: queryParams.toString() });
    setSettingsMode(newMode);
  };

  function setPage() {
    if (settingsMode === 'Account') {
      return <AccountSettings />;
    } else if (settingsMode === 'Payment') {
      return <PaymentSettings />;
    } else if (settingsMode === 'Order') {
      return <Orders />;
    } else {
      return <InvalidPage />;
    }
  }

  return (
    <section className="bg-matte-black pt-36">
      <div className="container mx-auto flex pb-10">
        <div className="sidebar-container sidebar-border pr-8 text-slate-50 max-lg:hidden">
          <h1 className="text-center text-5xl py-16 font-[Merriweather]">
            Settings
          </h1>
          <nav className="gap-5 flex flex-col items-center h-40">
            <button
              onClick={() => handleNavigation('Account')}
              className={`text-start w-44 font-medium ${
                settingsMode === 'Account'
                  ? 'text-emerald-600'
                  : 'text-slate-50'
              } hover:text-emerald-600 transition-all`}
            >
              Account Settings
            </button>
            <button
              onClick={() => handleNavigation('Payment')}
              className={`text-start w-44 font-medium ${
                settingsMode === 'Payment'
                  ? 'text-emerald-600'
                  : 'text-slate-50'
              } hover:text-emerald-600 transition-all`}
            >
              Payment Settings
            </button>
            <button
              onClick={() => handleNavigation('Order')}
              className={`text-start w-44 font-medium ${
                settingsMode === 'Order' ? 'text-emerald-600' : 'text-slate-50'
              } hover:text-emerald-600 transition-all`}
            >
              Orders
            </button>
          </nav>
        </div>
        {setPage()}
      </div>
      <footer className="lg:hidden fixed flex justify-evenly bottom-0 inset-x-0 backdrop-blur-lg h-14 border-above">
        <button
          onClick={() => setSettingsMode('Account')}
          className={`bg-transparent w-1/3 text-sm text-slate-50 h-full border-right hover:bg-[#242425] transition-all`}
        >
          Account
        </button>
        <button
          onClick={() => setSettingsMode('Payment')}
          className={`bg-transparent w-1/3 text-sm text-slate-50 h-full hover:bg-[#242425] transition-all`}
        >
          Payment
        </button>
        <button
          onClick={() => setSettingsMode('Order')}
          className={`bg-transparent w-1/3 text-sm text-slate-50 h-full border-left hover:bg-[#242425] transition-all`}
        >
          Orders
        </button>
      </footer>
    </section>
  );
}
