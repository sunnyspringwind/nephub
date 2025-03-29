import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Model from "./Model";

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const timelineRef = useRef(null);
  const eventRefs = useRef([]);

  const nepalHistoricalEvents = [
    {
      "date": "1768 AD",
      "title": "Unification of Nepal",
      "desc": "King Prithvi Narayan Shah conquers Kathmandu Valley and begins the unification of Nepal.",
      "text": "King Prithvi Narayan Shah of the Gorkha Kingdom captured Kathmandu, marking the beginning of the unification of Nepal. His strategic conquests brought together various small kingdoms and principalities under a single nation.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Unification</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Gorkha Kingdom</text></svg>"
      ],
      "relatedEvents": [
        "Gorkha Expansion",
        "Creation of Modern Nepal"
      ]
    },    {
      "date": "1816",
      "title": "Anglo-Nepalese War",
      "desc": "Conflict with British East India Company results in the Treaty of Sugauli.",
      "text": "The war ended with the Treaty of Sugauli, which ceded significant territories to the British and established diplomatic relations that would influence Nepal's future.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Anglo-Nepalese War</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Treaty of Sugauli</text></svg>"
      ],
      "relatedEvents": [
        "Territorial Losses",
        "British Influence"
      ]
    },
    {
      "date": "1846 AD",
      "title": "Rana Regime Begins",
      "desc": "Jung Bahadur Rana establishes the Rana oligarchy, taking power from the Shah monarchs.",
      "text": "Jung Bahadur Rana seized political power, establishing a hereditary prime ministerial system that effectively marginalized the Shah kings and ruled Nepal for over a century.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Rana Regime</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Political Power</text></svg>"
      ],
      "relatedEvents": [
        "Shift in Political Power",
        "Autocratic Governance"
      ]
    },
    {
      "date": "1950-1951",
      "title": "Democracy Movement",
      "desc": "People's movement overthrows the Rana regime and establishes democratic reforms.",
      "text": "A popular uprising led by the Nepal Congress Party, supported by King Tribhuvan, ended the Rana oligarchy and paved the way for democratic governance in Nepal.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Democracy</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>People's Movement</text></svg>"
      ],
      "relatedEvents": [
        "End of Rana Rule",
        "Constitutional Monarchy"
      ]
    },{
      "date": "1951",
      "title": "Return of King Tribhuvan",
      "desc": "King Tribhuvan returns from India and becomes a symbol of democratic change.",
      "text": "After seeking refuge in India during the political upheaval, King Tribhuvan returned and played a crucial role in ending the Rana regime and initiating democratic reforms.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>King Tribhuvan</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Democratic Return</text></svg>"
      ],
      "relatedEvents": [
        "Political Transformation",
        "Royal Support for Democracy"
      ]
    },
    {
      "date": "1960",
      "title": "King Mahendra's Coup",
      "desc": "King Mahendra suspends the constitution and establishes the Panchayat system.",
      "text": "King Mahendra dissolved the democratically elected government, banned political parties, and introduced a partyless political system known as the Panchayat system.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>King Mahendra</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Political Coup</text></svg>"
      ],
      "relatedEvents": [
        "Royal Autocracy",
        "Political Suppression"
      ]
    },
    {
      "date": "1990",
      "title": "People's Movement II",
      "desc": "Massive pro-democracy protests force the king to accept a multi-party democratic system.",
      "text": "Widespread protests led to the restoration of multi-party democracy, constitutional reforms, and significant limitations on royal power.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Democracy Protest</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Constitutional Reform</text></svg>"
      ],
      "relatedEvents": [
        "Democratic Reforms",
        "Constitutional Changes"
      ]
    },
  
    {
      "date": "2006",
      "title": "End of Monarchy",
      "desc": "People's Movement III leads to the abolition of the monarchy and establishment of a republic.",
      "text": "Massive protests culminated in the removal of King Gyanendra's powers, and in 2008, Nepal was declared a federal democratic republic.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>End of Monarchy</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Republic Protest</text></svg>"
      ],
      "relatedEvents": [
        "Republican Transformation",
        "Abolition of Shah Dynasty"
      ]
    },
    {
      "date": "2008",
      "title": "First Constituent Assembly Election",
      "desc": "Maoist party wins the first democratic elections after the end of the civil war.",
      "text": "The Unified Communist Party of Nepal (Maoist) emerged as the largest party, marking a significant political shift and the culmination of the decade-long Maoist insurgency.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Maoist Election</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Constituent Assembly</text></svg>"
      ],
      "relatedEvents": [
        "Post-Conflict Elections",
        "Maoist Political Emergence"
      ]
    },
    {
      "date": "2015",
      "title": "New Constitution",
      "desc": "Nepal adopts a new constitution establishing a federal democratic republican structure.",
      "text": "After years of political negotiations, Nepal promulgated a new constitution that restructured the country into a federal system with seven provinces.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>New Constitution</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Federal Structure</text></svg>"
      ],
      "relatedEvents": [
        "Federal Restructuring",
        "Constitutional Milestone"
      ]
    },
    {
      "date": "2015",
      "title": "Devastating Earthquake",
      "desc": "Major earthquake strikes Nepal, causing widespread destruction and loss of life.",
      "text": "A 7.8 magnitude earthquake hit Nepal on April 25, killing nearly 9,000 people, injuring more than 22,000, and causing massive infrastructure damage. It was the worst natural disaster to hit Nepal in over 80 years.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Earthquake Disaster</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>National Resilience</text></svg>"
      ],
      "relatedEvents": [
        "Natural Disaster",
        "International Humanitarian Response"
      ]
    },
    {
      "date": "2017",
      "title": "First Local Elections",
      "desc": "Nepal holds its first local elections under the new federal system.",
      "text": "Following the 2015 constitution, Nepal conducted its first local elections, marking a significant step in decentralizing governance and implementing the federal structure.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Local Elections</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Federal Governance</text></svg>"
      ],
      "relatedEvents": [
        "Decentralization",
        "Political Restructuring"
      ]
    },
    {
      "date": "2018",
      "title": "Nepal-China Belt and Road Initiative",
      "desc": "Nepal joins China's Belt and Road Initiative, strengthening bilateral relations.",
      "text": "Nepal officially joined China's Belt and Road Initiative, signing multiple agreements to enhance connectivity and economic cooperation between the two countries.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Belt and Road</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>International Relations</text></svg>"
      ],
      "relatedEvents": [
        "Economic Diplomacy",
        "Regional Cooperation"
      ]
    },
    {
      "date": "2020-2021",
      "title": "COVID-19 Pandemic Impact",
      "desc": "Nepal faces significant challenges during the global COVID-19 pandemic.",
      "text": "The COVID-19 pandemic severely impacted Nepal's healthcare system, economy, and social structures. The country struggled with limited medical resources, economic downturn, and massive disruptions to daily life and international migration.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Pandemic Response</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>National Resilience</text></svg>"
      ],
      "relatedEvents": [
        "Global Health Crisis",
        "Economic Challenges"
      ]
    },
    {
      "date": "2022",
      "title": "Political Instability",
      "desc": "Frequent changes in government highlight ongoing political challenges.",
      "text": "Nepal experienced multiple government changes, with Prime Minister Sher Bahadur Deuba losing power after the Maoist Center and CPN-UML formed a new coalition, reflecting the complex and fragmented political landscape.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Political Transition</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Government Shifts</text></svg>"
      ],
      "relatedEvents": [
        "Coalition Politics",
        "Democratic Challenges"
      ]
    },
    {
      "date": "2023",
      "title": "Economic Reforms",
      "desc": "Nepal implements economic reforms to address financial challenges.",
      "text": "The government introduced various economic reforms, including efforts to attract foreign investment, stabilize the currency, and address the country's persistent economic challenges.",
      "images": [
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Economic Reforms</text></svg>",
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f0f0f0'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' font-size='20' fill='%23666'>Financial Strategy</text></svg>"
      ],
      "relatedEvents": [
        "Investment Attraction",
        "Economic Stabilization"
      ]
    }
]

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    eventRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Timeline line */}
        <div className="absolute left-1/2 w-1 bg-gradient-to-b from-amber-400 to-amber-600 h-full hidden md:block"></div>

        <div ref={timelineRef} className="space-y-20 md:space-y-32">
          {nepalHistoricalEvents.map((event, index) => (
            <div
              key={index}
              ref={(el) => (eventRefs.current[index] = el)}
              className={`relative group flex md:justify-between items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -ml-3 w-6 h-6 bg-amber-500 rounded-full shadow-glow hidden md:block"></div>

              {/* Event Card */}
              <div
                className={`md:w-5/12 relative transform transition-all duration-500 hover:scale-105 ${
                  index % 2 === 0 ? "md:-translate-x-6" : "md:translate-x-6"
                }`}
              >
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-amber-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-amber-400">
                      {event.title}
                    </h3>
                    <span className="text-sm bg-amber-500 text-gray-900 px-3 py-1 rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {event.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.images &&
                      event.images
                        .slice(0, 3)
                        .map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Event preview ${i + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ))}
                  </div>
                  <button
                    onClick={() => handleEventClick(event)}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-full transition-all flex items-center"
                  >
                    Explore More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Event Image */}
              <div className="hidden md:block md:w-5/12">
                <div className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
                  {event.images && event.images.length > 0 && (
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-64 object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <Model onClose={closeModal}>
            <div className="max-w-4xl bg-gray-800 rounded-xl p-8 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-amber-500 hover:text-amber-600"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold text-amber-400 mb-4">
                {selectedEvent.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-2">Date</h3>
                    <p className="text-gray-300">{selectedEvent.date}</p>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-2">
                      Description
                    </h3>
                    <p className="text-gray-300">{selectedEvent.desc}</p>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-2">
                      Detailed Information
                    </h3>
                    <p className="text-gray-300">{selectedEvent.text}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-2">Gallery</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvent.images &&
                        selectedEvent.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-full h-32 object-cover rounded"
                            alt={`Event visual ${i + 1}`}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-2">
                      Related Events
                    </h3>
                    <ul className="list-disc pl-4 text-gray-300">
                      {selectedEvent.relatedEvents &&
                        selectedEvent.relatedEvents.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Model>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;
