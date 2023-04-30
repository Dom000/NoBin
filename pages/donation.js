import React from "react";

function donation() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      {" "}
      <b className=" text-center text-xl pb-2">DONATION</b>
      <div className="bg-slate-400 flex justify-center w-1/3 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      <p>
        <b>Donate To Us</b> <br /> NoBin members have created a spectacular
        worldwide outpouring of generosity. Those with used items happily share;
        those who need, gracefully receive; all without judgement - or any funds
        - passed. And, NoBin performs many wonderful functions: building bonds
        and community, keeping material items from the landfills, and redeeming
        the clutter that consumes us by moving it forward to a new, productive
        life.
      </p>
      <br />
      <p>
        Owing to the incredible efforts of thousands of local volunteers, NoBin
        is able to keep its administrative expenses quite low. However, as the
        largest recycling and reuse website in the world, we have rather
        substantial server, bandwidth and coding expenses. Your help to keep
        this incredible grassroots effort going is deeply appreciated.
      </p>
      <br />
      <p>
        We depend upon donations to help meet these expenses and to continue to
        refine and spread our extraordinarily successful NoBin infrastructure.
        Your generous donations are tax deductible as we are a registered
        charitable nonprofit. Thank you for your support in "changing the world
        one gift at a time."
      </p>
      <br />
      
    </div>
  );
}

export default donation;
