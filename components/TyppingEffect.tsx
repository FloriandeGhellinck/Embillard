import React from "react";
import ReactTypingEffect from "react-typing-effect";

const ReactTypingEffectDemo = () => {
  return (
    <>
      <div className="flex flex-col m ">
        <ReactTypingEffect
          className="text-8xl mb-14 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-embie-orange-600 via-embie-yellow-600 to-embie-blue-light-600 font-poppins"
          // className="text-8xl mt-28 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 "
          text={["Welcome on Embillard!"]}
          speed={150}
          eraseDelay={1500000000000}
          typingDelay={1500}
        />
        <ReactTypingEffect
          className="text-8xl mb-14 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-embie-orange-600 via-embie-yellow-600 to-embie-blue-light-600 font-poppins"
          text={["Ready to play a game? "]}
          speed={150}
          eraseDelay={1500000000000}
          typingDelay={6000}
          cursor={undefined}
          // displayTextRenderer={(text, i) => {
          //     return (
          //       <h1>
          //         {text.split("").map((char, i) => {
          //           const key = `${i}`;
          //           return (
          //             <span key={key} style={i % 2 === 0 ? {} : {}}>
          //               {char}
          //             </span>
          //           );
          //         })}
          //       </h1>
          //     );
          //   }}
        />
      </div>
    </>
  );
};

export default ReactTypingEffectDemo;