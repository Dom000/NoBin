import React from "react";

function privacy() {
  return (
    <div className="flex flex-col p-6  items-center">
      {" "}
      <b className=" text-center text-xl pb-2">PRIVACY</b>
      <div className="bg-slate-400 flex justify-center w-1/3 h-0.5 mb-3">
        <div className="bg-NoBingreen w-20 h-0.5"></div>
      </div>
      <div>
        <p>
          <b>Privacy Policy FAQ</b> <br />
          The following are basic questions you may have about our privacy
          statement. Where applicable, links are provided to the actual policy
          statements below this FAQ for further detail.
        </p>
        <br />
        <p>
          <b>Why is NoBin updating its privacy statement?</b> <br />
          We now meet the high standard required by the European Union's General
          Data Protection Regulation (GDPR) and have updated our privacy
          statement to reflect that. We also continue to simplify language and
          remove jargon, to make our privacy statement easier to understand and
          read.
        </p>
        <br />
        <p>
          <b>What is the GDPR?</b> <br />
          The GDPR is a regulation intended to strengthen and unify data
          protection for everyone within the European Union (EU). And because we
          believe that all our members can benefit from its mandates, we're
          implementing it globally. The GDPR requires greater openness and
          transparency from organisations on how they collect, store and use
          personal data, while also imposing tighter limits on the use of
          personal data.
        </p>
        <br />
        <p>
          <b>How often do you anticipate updating your privacy statement?</b>{" "}
          <br />
          We will update our privacy statement as necessary to ensure that our
          policies are in line with international regulations, our services and
          charitable activities.
        </p>
        <br />
        <p>
          <b>What information does NoBin collect about me?</b> <br />
          When you visit the NoBin website and access information, you remain
          anonymous but to become a member or make a donation we collect
          personally identifiable information that you voluntarily provide
          through our website or via e-mail correspondence.
        </p>
        <br />
      </div>
    </div>
  );
}

export default privacy;
