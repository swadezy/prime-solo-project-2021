import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h4>Where Can I Buy Locks?</h4>
        <ul>
          <li>
            Craigslist - You may get lucky and find a locksmith going out of
            business
          </li>
          <li>
            Local Locksmith - Talk to them about getting cheap or scrap locks,
            you may be able to get them for cost of scrap, so pounds of locks
            for a couple of bucks
          </li>
          <li>
            Local scrap yard - Get down and dirty and you may find that pot of
            gold
          </li>
          <li>
            Lockpicking Forums: http://www.lockpicking101.com and
            http://www.keypicking.com are the best sites to learn about all
            things locks and they both have great Buy, Sell, Trade sections with
            a lot of cheap locks. Additionally, participate in the chat of
            keypicking.com to get to know some great people while you're there.
          </li>
          <li>
            Home Depot/Lowes - Retail prices for lower quality locks. You will
            find locks like Master, Kwikset, & Schlage here, but you will
            normally pay full price for them (save as a last resort)
          </li>
          <li>
            Walmart - They normally have a good selection of residential locks
            for cheaper than hardware stores with a decent range of locks, from
            cheap defiant to decent quality brinks locks.
          </li>
          <li>
            Local Thrift stores - You may have luck finding some locks at your
            local thrift shops, like salvation army or goodwill.
          </li>
          <li>
            Ebay - You can get good deals on "lots" of locks (e.g. Lot of 25
            assorted locks)
          </li>
        </ul>
        <h4>What Kind of Locks Should I Buy?</h4>
        <ul>
          <li>1-2 regular Master Padlocks</li>
          <li>1 Magnum Master Lock (has a boron carbide shackle)</li>
          <li>
            1 Brinks padlock (uses security pins, for more advanced picking)
          </li>
          <li>
            1-3 American padlocks (uses different security pins, fun for
            advanced picking)
          </li>
          <li>1 Commando padlock (newer company, quality build)</li>
          <li>1-3 Schlage & Kwikset locks (door or deadbolt)</li>
          <li>
            Some variety of other cylinders, including Corbin Ruswin, Abus,
            Sargent, Yale, or Weiser
          </li>
        </ul>
        <h4>How Can I Learn?</h4>
        <ul>
          <li>
            Great intro to lock picking:
            http://www.youtube.com/playlist?list=PL66CD42F86F3A1F85
          </li>
          <li>MIT Guide to Lock Picking - Lysator (Google is your friend)</li>
          <li>
            Deviant Ollam - Distinguishing Picks
            http://www.youtube.com/watch?v=e07VRxJ01Fs
          </li>
          <li>
            Deviant Ollam - The Four Types of Locks http://vimeo.com/31179906
          </li>
          <li>
            Deviant Ollam - Lockpicking & Physical Security
            http://www.youtube.com/watch?v=JupQ3BpKGYg
          </li>
          <li>
            Realistically, all of Deviant Ollams videos -
            http://deviating.net/lockpicking/videos.html
          </li>
          <li>
            Datagram - Intro to Lockpicking
            http://www.youtube.com/watch?v=KZtOiWjIuwM
          </li>
          <li>
            Practical Lock Picking: A Physical Penetration Tester's Training
            Guide - Deviant Ollam
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
