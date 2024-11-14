const LiveBgButtonDesign = ({ name, bgvideo }) => {
    const srcTemplete = `https://www.youtube.com/embed/${bgvideo}?autoplay=1&loop=1&mute=1&controls=0&disablekb=1&start=47&playlist=${bgvideo}`;
    return (
      <div className="relative w-[250px] h-[150px] hover-floating-banner mx-7">
        <div className="relative w-full h-[150px] max-w-lg overflow-hidden rounded-lg ">
          <iframe
            src={srcTemplete}
            title="YouTube Video"
            className="w-full h-full scale-y-[180%] scale-x-[150%] transition-transform duration-300 hover:scale-105"
          ></iframe>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-full h-full text-2xl font-mono text-yellow-400  hover:text-red-500 bg-black bg-opacity-40 rounded-lg">
            {name}
          </button>
        </div>
      </div>
    );
  };

  export default LiveBgButtonDesign;
  