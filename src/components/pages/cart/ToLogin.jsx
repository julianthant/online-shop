import { useNavigate } from 'react-router-dom';

export default function InvalidPage() {
  const navigate = useNavigate();

  return (
    <section className="grid container place-items-center">
      <div className="login-container">
        <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
          Please login to use cart<span className="text-emerald-900">.</span>
        </h1>
        <p className="text-red-700 text-md my-3 text-center">
          You cannot purchase items from our store without an account.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
