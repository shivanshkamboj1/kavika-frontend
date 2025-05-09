import React from 'react'

const testimonials = [
  {
    name: "John Doe",
    feedback: "This travel experience was life-changing. The service was exceptional!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    feedback: "Absolutely loved the destination and the smooth planning. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mark Lee",
    feedback: "One of the best trips I've ever taken. Everything was well-organized.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

const About = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">What Our Customers Say</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#fff1da] p-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-700">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
