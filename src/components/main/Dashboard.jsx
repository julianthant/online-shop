import { useState } from 'react';
import AccountSettings from './AccountSettings';

export default function Dashboard() {
  const [settingsMode, setSettingsMode] = useState('Account');

  return (
    <section className="bg-matte-black pt-36 flex">
      <div className="container mx-auto flex">
        <div className="sidebar-container sidebar-border pr-8 text-slate-50">
          <h1 className="text-center text-5xl py-16 font-[Merriweather]">
            Settings
          </h1>
          <nav className=" gap-5 flex flex-col items-center h-40">
            <button
              onClick={() => setSettingsMode('Account')}
              className={`text-start w-44 font-medium ${
                settingsMode === 'Account'
                  ? 'text-emerald-600'
                  : 'text-slate-50'
              } hover:text-emerald-600 transition-all`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setSettingsMode('Order')}
              className={`text-start w-44 font-medium ${
                settingsMode === 'Order' ? 'text-emerald-600' : 'text-slate-50'
              } hover:text-emerald-600 transition-all`}
            >
              Orders
            </button>
          </nav>
        </div>
        <div className="ml-28 user-container mt-[10rem]">
          {settingsMode === 'Account' ? <AccountSettings /> : 'Order Page'}
        </div>
      </div>
    </section>
  );
}
