import SocialIcons from '../../../data/SocialIcons';

export default function ContactsPage() {
  const listIcon = (
    <span className="w-6 h-6 text-gray-400 mr-2">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19l-7-7 7-7 7 7-7 7zm0 0v-14"
        ></path>
      </svg>
    </span>
  );

  return (
    <section className="pt-[6rem] bg-matte-black">
      <div className="container mx-auto px-4">
        <div className=" bg-[#1B1B1B] text-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
          <p className="text-gray-500">
            If you have any questions or inquiries, please feel free to contact
            us using the information below or the contact form.
          </p>
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold">Contact Details</h2>
                <ul className="mt-4">
                  <li className="flex items-start text-gray-500 mb-4">
                    {listIcon}
                    <div>
                      <strong>Email:</strong> info@yourshoestore.com
                    </div>
                  </li>
                  <li className="flex items-start text-gray-500 mb-4">
                    {listIcon}
                    <div>
                      <strong>Phone:</strong> +1 (123) 456-7890
                    </div>
                  </li>
                  <li className="flex items-start text-gray-500">
                    {listIcon}
                    <div>
                      <strong>Address:</strong> 123 Shoe Street, City, Country
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <SocialIcons />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Contact Form</h2>
                <form className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 rounded-lg outline-none bg-[#28282B]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg outline-none bg-[#28282B]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-600 font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-2 rounded-lg outline-none bg-[#28282B]"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
