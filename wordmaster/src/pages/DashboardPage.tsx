import React from 'react';

/*
  this page is for miscellaneous features of the app e.g.
  - user stats
  - leaderboards with highest scores for solo modes (all users)
*/

const DashboardPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>This page is still in development.</h2>
      <p>In the future, you will be able to:</p>
      <div className="feature-blocks">
        <div className="feature-block">
          <p>View your personal statistics and track your progress.</p>
        </div>
        <div className="feature-block">
          <p>See leaderboards with the highest scores for solo modes from all users.</p>
        </div>
        <div className="feature-block">
          <p>Compare your performance with friends and other players.</p>
        </div>
        <div className="feature-block">
          <p>Access detailed analytics to improve your gameplay.</p>
        </div>
      </div>
      <p className="mt-3">Stay tuned for these exciting features!</p>
    </div>
  );
};

export default DashboardPage;