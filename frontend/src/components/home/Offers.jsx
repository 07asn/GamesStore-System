import React from "react";


const Offers = () => {
  return (
    <div>
      {/* ------------------ Offers Section ------------------ */}
      <section className="bg-[#f9f9f9] py-5">
        <div className="container mx-auto px-4">
          {/* Countdown Timer */}
          <div className="text-center mb-5">
            <h3 className="mb-4 text-2xl font-bold">
              Hurry, Offer Ends In:
            </h3>
            <div
              id="countdownTimer"
              className="flex flex-wrap justify-center items-center gap-4 font-bold text-[#FFDF00]"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            >
              {["days", "hours", "minutes", "seconds"].map((label) => (
                <div key={label} className="mx-3">
                  <div
                    className="bg-white p-6 rounded-[15px] shadow-[0_8px_25px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 ease hover:scale-105 active:scale-110 m-2 min-w-[120px]"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
                  >
                    <span
                      id={label}
                      className="font-bold text-black"
                      style={{ fontSize: "clamp(2rem,6vw,3rem)" }}
                    >
                      00
                    </span>
                    <p
                      className="text-black"
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                        marginTop: "5px",
                      }}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Cards */}
          <div className="flex flex-wrap justify-center">
            {/* ----- First Card ----- */}
            <div className="w-full md:w-1/2 lg:w-5/12 mb-4">
              <div className="offers-card w-[90%] max-w-[420px] min-h-[480px] bg-white relative flex flex-col justify-between items-center overflow-hidden rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] my-4 mx-auto transition-all duration-300 ease hover:-translate-y-2.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <div className="absolute top-[15px] left-[15px] bg-gradient-to-r from-[#FF0000] to-[#FF4500] text-white text-[14px] py-[8px] px-[14px] rounded-[8px] font-bold z-[3] shadow-[0_5px_10px_rgba(255,0,0,0.4)]">
                  75% Sale
                </div>
                <img
                  src="img/product-4.jpg"
                  alt="Product Image"
                  className="w-[95%] h-[35vh] max-h-[220px] object-cover rounded-[15px] mb-5 block border-[3px] border-[#FFDF00] relative z-[1] transition-all duration-300 ease hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,223,0,0.5)]"
                />
                <h2 className="text-black text-[1.6em] font-bold text-center my-[15px] z-[2]">
                  Fc 25 Standard Edition
                </h2>
                <div className="text-black text-center text-[1.2em] z-[2]">
                  <span className="line-through text-[#888] mr-[10px]">
                    JD 49.99
                  </span>
                  <span className="text-[#ff0000] font-bold text-[1.6em]">
                    JD 9.99
                  </span>
                </div>
                <button
                  className="CartBtn w-full h-10 rounded-[12px] border-0 bg-[rgb(255,208,0)] flex items-center justify-center cursor-pointer transition duration-500 overflow-hidden shadow-[0px_5px_10px_rgba(0,0,0,0.103)] relative z-[1] active:scale-95 group"
                  type="button"
                >
                  <span className="IconContainer absolute left-[-50px] w-[30px] h-[30px] bg-transparent rounded-full flex items-center justify-center overflow-hidden z-[2] transition duration-500 group-hover:translate-x-[58px] group-hover:rounded-[40px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="w-4 h-4"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </span>
                  <p className="text h-full w-auto flex items-center justify-center text-[rgb(17,17,17)] z-[1] transition duration-500 text-[1.04em] font-semibold group-hover:translate-x-[10px]">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>

            {/* ----- Second Card ----- */}
            <div className="w-full md:w-1/2 lg:w-5/12 mb-4">
              <div className="offers-card w-[90%] max-w-[420px] min-h-[480px] bg-white relative flex flex-col justify-between items-center overflow-hidden rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] my-4 mx-auto transition-all duration-300 ease hover:-translate-y-2.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <div className="absolute top-[15px] left-[15px] bg-gradient-to-r from-[#FF0000] to-[#FF4500] text-white text-[14px] py-[8px] px-[14px] rounded-[8px] font-bold z-[3] shadow-[0_5px_10px_rgba(255,0,0,0.4)]">
                  75% Sale
                </div>
                <img
                  src="img/product-2.jpg"
                  alt="Product Image"
                  className="w-[95%] h-[35vh] max-h-[220px] object-cover rounded-[15px] mb-5 block border-[3px] border-[#FFDF00] relative z-[1] transition-all duration-300 ease hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,223,0,0.5)]"
                />
                <h2 className="text-black text-[1.6em] font-bold text-center my-[15px] z-[2]">
                  Cyberpunk 2077 + DLC
                </h2>
                <div className="text-black text-center text-[1.2em] z-[2]">
                  <span className="line-through text-[#888] mr-[10px]">
                    JD 9.99
                  </span>
                  <span className="text-[#ff0000] font-bold text-[1.6em]">
                    JD 1.99
                  </span>
                </div>
                <button
                  className="CartBtn w-full h-10 rounded-[12px] border-0 bg-[rgb(255,208,0)] flex items-center justify-center cursor-pointer transition duration-500 overflow-hidden shadow-[0px_5px_10px_rgba(0,0,0,0.103)] relative z-[1] active:scale-95 group"
                  type="button"
                >
                  <span className="IconContainer absolute left-[-50px] w-[30px] h-[30px] bg-transparent rounded-full flex items-center justify-center overflow-hidden z-[2] transition duration-500 group-hover:translate-x-[58px] group-hover:rounded-[40px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="w-4 h-4"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </span>
                  <p className="text h-full w-auto flex items-center justify-center text-[rgb(17,17,17)] z-[1] transition duration-500 text-[1.04em] font-semibold group-hover:translate-x-[10px]">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* ----- Explore Button ----- */}
          <div className="text-center mt-5 mr-3">
            <a
              href="shop.html"
              className="inline-block bg-gradient-to-r from-[#DFBF00] to-[#FFDF00] py-[12px] px-[40px] outline outline-[3px] outline-[#282936] outline-offset-[3px] border-0 text-[#282936] text-[1.1rem] rounded-[50px] transition-all duration-400 ease font-bold cursor-pointer shadow-[0_6px_12px_rgba(0,0,0,0.2)] no-underline text-center relative overflow-hidden hover:outline-offset-[6px] hover:bg-gradient-to-r hover:from-[#FF9F00] hover:to-[#FEBF00] hover:shadow-[0_8px_18px_rgba(0,0,0,0.3)]"
            >
              Explore
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
