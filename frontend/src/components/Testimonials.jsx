import { motion } from "framer-motion";

function Testimonials() {
  const feedbacks = [
    {
      name: "Rishabh Mishra",
      role: "Software Developer",
      text: "PrepMate AI's mock interviews gave me real-time confidence. The feedback felt personalized!",
      image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=vaibhav",
    },
    {
      name: "Rahul Kr. Jha",
      role: "Data Analyst",
      text: "The JD vs Resume feature helped me stand out in a competitive role. Highly accurate insights!",
      image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=rahul",
    },
    {
      name: "Arpit Sharma",
      role: "Product Manager",
      text: "PrepMate AI streamlined my interview prep. Loved the instant feedback and role-specific questions.",
      image: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=arpit",
    },
  ];

  return (
    <section className="bg-[#12141f] pt-10 pb-0 px-4 text-white">
      {/* Gradient Heading */}
      <motion.h2
        className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        💬 What Our Users Say
      </motion.h2>

      {/* Testimonial Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#1b1e2b] border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={f.image}
                alt={f.name}
                className="w-14 h-14 rounded-full border-2 border-yellow-400 shadow-md bg-white"
              />
              <div>
                <p className="font-semibold text-yellow-400">{f.name}</p>
                <p className="text-sm text-gray-400">{f.role}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">“{f.text}”</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
