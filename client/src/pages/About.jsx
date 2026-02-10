import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdOutlineHandshake } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { GiSupersonicArrow } from "react-icons/gi";

const faqs = [
  {
    question: "What is Skill Exchange Platform?",
    answer:
      "Skill Exchange is a community-driven platform where users exchange skills with each other without any monetary transactions. You can teach what you know and learn what you need.",
  },
  {
    question: "Is Skill Exchange completely free?",
    answer:
      "Yes. The platform is based on mutual skill sharing and does not involve any payments. Users exchange skills based on collaboration and trust.",
  },
  {
    question: "How do I offer or request a skill?",
    answer:
      "After logging in, you can list your skills on your profile or explore skills offered by others and send a request to start a skill exchange session.",
  },
  {
    question: "Is my data secure on the platform?",
    answer:
      "Absolutely. We use secure authentication, protected APIs, and best practices to keep your data safe.",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* About Section */}
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-6">
            About Skill Exchange
          </h1>

          <p className="text-center max-w-3xl mx-auto text-gray-700 leading-relaxed mb-12">
            Skill Exchange is built to connect learners and mentors across the
            globe. Our mission is to empower people to grow together by sharing
            knowledge, experience, and skills — without financial barriers.
          </p>

          {/* Core Values */}
          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 flex flex-row gap-3"> <MdOutlineHandshake className="mt-1 text-xl"/> Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Learn and teach through real-world collaboration and mutual
                respect.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 flex flex-row gap-3"> <GiSupersonicArrow className="mt-1 text-xl"/> Skill Growth</h3>
              <p className="text-gray-600 text-sm">
                Discover new skills and sharpen existing ones with hands-on
                learning.
              </p>
            </div>

          </div>

          {/* FAQ Section */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold"
                >
                  <span>{faq.question}</span>
                  <span className="text-xl">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
