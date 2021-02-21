import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
      <div className="grid-col grid-col_8">
        <p>
          Welcome to PickLogger - your one stop shop for all your locksport
          performance tracking needs! Once signed in, you will be able to manage
          your lock collection and track picking events for each of those locks.
        </p>

        <p>
          The hobby of lockpicking, also known as locksport, is the sport or
          recreation of defeating locking systems. Its enthusiasts learn a
          variety of skills including lock picking, lock bumping, and a variety
          of other skills traditionally known only to locksmiths and other
          security professionals. Locksport followers enjoy the challenge and
          excitement of learning to defeat all forms of locks, and often gather
          together in sport groups to share knowledge, exchange ideas, and
          participate in a variety of recreational activities and contests.
        </p>

        <p>
          Resources for learning more about locksport can be found on our About
          page. The best advice for newcomers - don't buy too much stuff out the
          get-go, never pick a lock that you don't own, never pick a lock that's
          currently in use, and of course - try it out! Practice makes perfect
          in all hobbies, but locksport especially is much more about physically
          learning the feel of a lock rather than studying theory or design
          behind locks.
        </p>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
