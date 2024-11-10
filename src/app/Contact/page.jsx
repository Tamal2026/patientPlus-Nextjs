import React from 'react';

export default function ContactSection() {
  return (
    <div className="bg-white py-10 my-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Address Line #1</h2>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📍</span>
              <p>
                432 Main Street <br />
                Your City, State Country
              </p>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📞</span>
              <p>
                (123) 456-7890, <br />
                (123) 256-7890
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">✉️</span>
              <p>
                info@doctojones.me <br />
                info@themeperch.net
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact with Dr. Jones</h2>
            <p className="text-gray-600 mb-4">
              Donec fermentum augue quis augue ornare eget faucibus.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  className="border border-gray-300 rounded-md p-3 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter you Message"
                  className="border border-gray-300 rounded-md p-3 w-full"
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-3 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="h-96 mt-10">
        {/* You can replace this div with an actual Google Map iframe or use a React map library */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537363153166!3d-37.81627927975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f0b27d%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1636559063689!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
}
