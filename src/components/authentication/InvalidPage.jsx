import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
            404 - Page Not Found<span className="text-emerald-900">.</span>
          </h1>
          <p className="text-red-700 text-md my-3 text-center">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
