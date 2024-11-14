import React, { useEffect, useRef } from "react";
import thePath from "../assets/thePath3.png";
import timemachine from "../assets/timeboi.png";
import roadend from "../assets/underConstruction1.png";
import Header from "./Header";
import Footer from "./Footer";

export default function Timeline() {
  const nepalHistoricalEvents = [
    {
      title: "Unification of Nepal",
      desc: "King Prithvi Narayan Shah unified the small kingdoms and principalities in the mid-18th century, forming modern Nepal.",
      date: "1768-09-25",
      imageUrl: "https://www.drive.nepaldatabase.com/uploads/images/202306/image_750x_648bd753c55f2.jpg",
    },
    {
      title: "Nepal-British War",
      desc: "The Anglo-Nepalese War between Nepal and the British East India Company, resulting in the Sugauli Treaty and the loss of territory.",
      date: "1814-03-01",
      imageUrl: "https://bordernepal.wordpress.com/wp-content/uploads/2011/10/nepal-british-battle.jpg",
    },
    {
      title: "Treaty of Sugauli",
      desc: "After the Nepal-British War, Nepal signed the Treaty of Sugauli in 1816, ceding parts of its territory to the British Empire.",
      date: "1816-12-02",
      imageUrl: "https://i.pinimg.com/736x/bb/ef/c9/bbefc93ef9eba44356744ffe126b6836.jpg",
    },
    {
      title: "Establishment of the Rana Regime",
      desc: "Jung Bahadur Rana established the autocratic Rana regime, ruling Nepal as hereditary prime ministers for over a century.",
      date: "1846-09-15",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Chandra_Shamsher_and_sons.jpg",
    },
    {
      title: "Democracy Movement",
      desc: "The 1951 Revolution marked the end of the Rana regime and the establishment of democracy in Nepal.",
      date: "1951-02-18",
      imageUrl: "https://superdesk-pro-c.s3.amazonaws.com/sd-nepalitimes/2022110912118/636b8aea9c7e80680e06b26bjpeg.jpg",
    },
    {
      title: "King Mahendra's Coup",
      desc: "In 1960, King Mahendra dissolved the democratic government and established a Panchayat system, centralizing power with the monarchy.",
      date: "1960-12-15",
      imageUrl: "https://pbs.twimg.com/media/EpQEZEYUYAYMGNl.jpg",
    },
    {
      title: "People's Movement I",
      desc: "In 1990, a popular movement forced the monarchy to restore democracy and allowed political parties to govern Nepal.",
      date: "1990-04-08",
      imageUrl: "https://aawaajnews.com/wp-content/uploads/2020/11/GMS-1-web.jpg",
    },
    {
      title: "Nepal Civil War",
      desc: "The Nepalese Civil War between Maoist rebels and government forces lasted a decade, leading to significant political changes.",
      date: "1996-02-13",
      imageUrl: "https://pbs.twimg.com/media/ERX8JVRW4AEBiGT.jpg",
    },
    {
      title: "Royal Massacre",
      desc: "The tragic royal massacre of 2001, where King Birendra and many royal family members were killed, leading to a shift in the monarchy.",
      date: "2001-06-01",
      imageUrl: "https://nepalrevives.com/wp-content/uploads/2023/08/Nepalese-Royal-Family-1-1024x597.jpg",
    },
    {
      title: "Abolition of Monarchy",
      desc: "In 2008, Nepal abolished the monarchy, transitioning to a federal democratic republic after a peace agreement with Maoist forces.",
      date: "2008-05-28",
      imageUrl: "https://example.com/abolition_of_monarchy.jpg",
    },
    {
      title: "Earthquake of 2015",
      desc: "A devastating earthquake struck Nepal, causing extensive loss of life and destruction of heritage sites.",
      date: "2015-04-25",
      imageUrl: "https://example.com/earthquake_2015.jpg",
    },
    {
      title: "Promulgation of New Constitution",
      desc: "Nepal adopted a new constitution in 2015, establishing it as a secular, federal democratic republic.",
      date: "2015-09-20",
      imageUrl: "https://example.com/new_constitution_2015.jpg",
    },
  ];

  // open page from the bottom
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, []);

  //intersection observer timeboi
  const timeboiRefs = useRef([]);
  console.log(timeboiRefs.current);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.isIntersecting;
        entry.target.classList.toggle("visible", isVisible);
        entry.target.classList.toggle("invisible", !isVisible);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    // You can access each ref here, for example, to log their current values
    timeboiRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      timeboiRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  useEffect(() => {
    // You can access each ref here, for example, to log their current values
    timeboiRefs.current.forEach((ref, index) => {
      if (ref) {
        console.log(`Item ${index + 1} ref:`, ref);
      }
    });
  }, [nepalHistoricalEvents]);

  return (
    <>
      <div className="relative">
        <Header />
      </div>
      <div ref={scrollableDivRef} className="relative h-full bg-[#1C1C1C]">
        {/* Foreground Content */}
        {nepalHistoricalEvents.map((event, index) => (
          <div
            key={index}
            className=" md:w-full w-full h-auto  px-[2vw] pb-[2rem] relative z-10 yearDiv shadow-inner shadow-[#DAA520] "
            // style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
          >
            {/* if key is even swap left right. */}
            {index % 2 === 0 ? (
              <div className=" grid md:items-center md:grid-cols-2 md:gap-[8vw] h-auto pt-10 text-[#fff] font-mono">
                <div className=" overflow-auto md:w-[45vw]">
                  <p
                    className=" w-full text-sm "
                    style={{ textShadow: "0px 0px 8px rgba(255, 215, 0, 0.7)" }}
                  >
                    <span
                      className="block text-center font-semibold text-md"
                      style={{
                        textShadow: "0px 0px 5px rgba(0, 191, 255, 0.8)",
                      }}
                    >
                      {event.title}
                    </span>
                    {event.desc}
                  </p>
                  <div
                    className="bg-[#B71C1C] p-1 text-[1rem] font-bold text-right"
                    style={{
                      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {event.date}
                  </div>
                </div>
                <div className=" h-[250px] md:w-[44vw]">
                  <img
                    src={event.imageUrl}
                    className="w-full h-full object-cover opacity-80"
                  ></img>
                </div>
              </div>
            ) : (
              <div className=" grid md:items-center md:grid-cols-2 md:gap-[8vw] h-auto pt-10 text-white font-mono">
                 <div className=" h-[250px] md:w-[44vw]">
                  <img
                    src={event.imageUrl}
                    className="w-full h-full object-cover opacity-80"
                  ></img>
                </div>
                <div className=" overflow-auto md:w-[45vw]">
                  <p
                    className=" w-full text-sm "
                    style={{ textShadow: "0px 0px 8px rgba(255, 215, 0, 0.7)" }}
                  >
                    <span
                      className="block text-center font-semibold text-md"
                      style={{
                        textShadow: "0px 0px 5px rgba(0, 191, 255, 0.8)",
                      }}
                    >
                      {event.title}
                    </span>
                    {event.desc}
                  </p>
                  <div
                    className="bg-[#B71C1C] p-1 text-[1rem] font-bold"
                    style={{
                      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {event.date}
                  </div>
                </div>
              </div>
            )}
          
            {/* <div
              ref={(el) => (timeboiRefs.current[index] = el)}
              className=" float-left  mr-2 md:float-none md:mr-0 md:flex md:flex-col sticky bottom-0 justify-center items-center floating-banner"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent  text-[#333333]">
                {event.date}
              </span>
              <img src={timemachine} className=" w-[4rem] h-[4rem] "></img>
            </div> */}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
