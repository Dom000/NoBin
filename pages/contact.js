import React from 'react'

function contact() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      {" "}
      <b className=" text-center text-xl pb-2">CONTACT US</b>
      <div className="bg-slate-400 flex justify-center w-1/3 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      <p>
        <b>Contact Us</b> <br /> The following are basic questions you may have
        about our privacy statement. Where applicable, links are provided to the
        actual policy statements below this FAQ for further detail.
      </p>
      <br />
      <p>
        <b>Why is NoBin updating its privacy statement?</b>
        <br /> We now meet the high standard required by the European Union's
        General Data Protection Regulation (GDPR) and have updated our privacy
        statement to reflect that. We also continue to simplify language and
        remove jargon, to make our privacy statement easier to understand and
        read.
      </p>
      
    </div>
  );
}

export default contact