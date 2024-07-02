import React from 'react';
import { volunteerCards } from './volunteer_data';

const VolunteerCard = ({ opportunity }) => (
  <div className="volunteer-card">
    <h2>VOLUNTEER OPPORTUNITY</h2>
    <h1>{opportunity.title}</h1>
    <p className="commitment">• {opportunity.commitment}</p>
    <p className="description">{opportunity.description}</p>
    <div className="organizer">
      <img src={opportunity.organizer.image} alt={opportunity.organizer.name} />
      <div className="organizer-info">
        <p className="name">{opportunity.organizer.name}</p>
        <p className="title">{opportunity.organizer.title}</p>
      </div>
    </div>
    <div className="spots-left">
      <p>Spots left: {opportunity.spotsLeft}</p>
    </div>
    <button className="sign-up-btn">Sign Up</button>
  </div>
);

const VolunteerList = () => (
  <div className="volunteer-container">
    {volunteerCards.map(opportunity => (
      <VolunteerCard key={opportunity.key} opportunity={opportunity} />
    ))}
  </div>
);

export default VolunteerList;