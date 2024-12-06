import { MinusIcon, PlusIcon } from 'lucide-react';
import  { useState } from 'react';
 // Ensure you have these icons installed or use similar

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
    },
    {
      question: "How does the pricing work for teams?",
      answer:
        "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
    },
    {
      question: "What are the differences between Premium and Standard memberships?",
      answer:
        "Premium memberships offer additional features such as priority booking, extended facility hours, and exclusive access to certain amenities. Standard memberships provide access to all core features and facilities but do not include these premium perks. For a detailed comparison, please refer to our membership comparison page or contact our support team.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#5D2CA8] to-black p-[72px]">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">Frequently Asked Questions</h2>
        <div className="mt-12">
          {items.map((item, index) => (
            <div key={index} className="py-7 border-b border-white/30">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleToggle(index)}
              >
                <span className="flex-1 text-lg font-bold">{item.question}</span>
                {openIndex === index ? (
                  <MinusIcon className="w-6 h-6 text-white" />
                ) : (
                  <PlusIcon className="w-6 h-6 text-white" />
                )}
              </div>
              <div className={`mt-4 transition-max-height duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
