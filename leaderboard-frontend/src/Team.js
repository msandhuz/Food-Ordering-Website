import React from 'react';

function Team({ team }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <img src={team.avatarUrl} alt={team.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <strong>{team.name}</strong> (Rank: {team.rank})
            <div>Score: {team.score}</div>
            <div>Games Played: {team.gamesPlayed}</div>
            <div>Achievements: {team.achievements.join(', ')}</div>
        </div>
    );
}

export default Team;
