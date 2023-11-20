import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FAQ() {
  const faqs = useMemo(() => {
    return [
      {
        id: 'track',
        question: 'How can I track my order?',
        answer:
          'You can track your order by logging into your account and checking the order status.',
      },
      {
        id: 'returns',
        question: 'What is your return policy?',
        answer:
          'Our return policy allows returns within 30 days of the purchase date. Please check our Returns page for more details.',
      },
      {
        id: 'size_chart',
        question: 'Can you show me a shoe size chart?',
      },
      {
        id: 'buy',
        question: 'How do I buy from solesteals?',
        answer:
          'First, create an account. Then, add the shoes you wish to buy to cart and add payment information. After, you can buy the shoes you want from solesteals.',
      },
      // Add more FAQs as needed
    ];
  }, []);

  const [openQuestion, setOpenQuestion] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const question = queryParams.get('question');

  useEffect(() => {
    if (question) {
      setOpenQuestion(faqs.findIndex((faq) => faq.id === question));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleQuestion = (index) => {
    setOpenQuestion((prev) => (prev === index ? null : index));
    if (question) {
      navigate('/faq');
    }
  };

  return (
    <section className="flex justify-center min-h-screen bg-matte-black text-white">
      <div className="container mx-auto mt-[9rem]">
        <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-5 mb-10 text-center">
          Frequently Asked Questions<span className="text-emerald-900">.</span>
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, index) => (
            <div
              onClick={() => toggleQuestion(index)}
              key={index}
              className="bg-gray-800 rounded-lg p-5 transition"
            >
              <button className="flex justify-between items-center w-full focus:outline-none">
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="ml-2">
                  {openQuestion === index ? '▲' : '▼'}
                </span>
              </button>
              {openQuestion === index && (
                <div className="mt-4">
                  {faq.id === 'size_chart' ? (
                    <div className="mt-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        Men&apos;s Shoe Size Chart
                      </h2>
                      <div className="size-chart">
                        <div className="size-row">
                          <div className="size-cell">US</div>
                          <div className="size-cell">UK</div>
                          <div className="size-cell">EU</div>
                        </div>
                        {[...Array(15).keys()].map((size) => (
                          <div key={size} className="size-row">
                            <div className="size-cell">{size + 6}</div>
                            <div className="size-cell">{size + 5.5}</div>
                            <div className="size-cell">{size + 39}</div>
                          </div>
                        ))}
                      </div>

                      <h2 className="text-2xl font-semibold mt-6 mb-3">
                        Women&apos;s Shoe Size Chart
                      </h2>
                      <div className="size-chart">
                        <div className="size-row">
                          <div className="size-cell">US</div>
                          <div className="size-cell">UK</div>
                          <div className="size-cell">EU</div>
                        </div>
                        {[...Array(15).keys()].map((size) => (
                          <div key={size} className="size-row">
                            <div className="size-cell">{size + 5}</div>
                            <div className="size-cell">{size + 3.5}</div>
                            <div className="size-cell">{size + 36}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
