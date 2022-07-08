import React from "react";
import ReactTypingEffect from "react-typing-effect";

const ReactTypingEffectDemo = () => {
  return (
    <>
      <div className="flex flex-col m ">
        <ReactTypingEffect
          className="text-4xl sm:text-5xl ms:text-8xl mb-14 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-embie-orange-600 via-embie-yellow-600 to-embie-blue-light-600 font-poppins"
          // className="text-8xl mt-28 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 "
          text={["Welcome on Embillard!"]}
          speed={50}
          eraseDelay={1500000000000}
          typingDelay={1000}
        />
        <ReactTypingEffect
          className="text-4xl sm:text-5xl ms:text-8xl pb-14 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-embie-orange-600 via-embie-yellow-600 to-embie-blue-light-600 font-poppins"
          text={["Ready to play a game? "]}
          speed={50}
          eraseDelay={1500000000000}
          typingDelay={2000}
          cursor={undefined}
        />
      </div>
    </>
  );
};

export default ReactTypingEffectDemo;
