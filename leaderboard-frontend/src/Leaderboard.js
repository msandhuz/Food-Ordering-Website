import React, { useState } from 'react';

function Leaderboard() {
    // Helper function to sort teams and assign ranks
    const sortTeamsAndAssignRanks = (teams) => {
        return teams.sort((a, b) => b.score - a.score)
                    .map((team, index) => ({ ...team, rank: index + 1 }));
    };

    // Helper function to format scores
    const formatScore = (score) => {
        return `+${new Intl.NumberFormat('en-US').format(score)}`;
    };

    // Initial teams data, sorted and ranked
    const initialTeams = [
        { _id: '1', name: 'The Avengers', gamesPlayed: 17, score: 295567, avatarUrl: '/Images/1.jpg' },
        { _id: '2', name: 'Skale', gamesPlayed: 26, score: 259981, avatarUrl: '/Images/2.jpg' },
        { _id: '3', name: 'One Million Bugs', gamesPlayed: 21, score: 515678, avatarUrl: '/Images/3.jpg' },
        { _id: '4', name: 'The Musketeers', gamesPlayed: 25, score: 496677, avatarUrl: '/Images/4.jpg' },
        { _id: '5', name: 'Bugs Killer', gamesPlayed: 23, score: 413324, avatarUrl: '/Images/5.jpg' },
        { _id: '6', name: 'Foo Fighters', gamesPlayed: 19, score: 356784, avatarUrl: '/Images/6.jpg' },
        { _id: '7', name: 'The Ultimate', gamesPlayed: 21, score: 509873, avatarUrl: '/Images/7.jpg' },
    ];
    const [teams, setTeams] = useState(sortTeamsAndAssignRanks(initialTeams));
    const [loading, setLoading] = useState(false);

    const loadTeams = () => {
        setLoading(true); // Start loading transition
        fetch('http://localhost:5001/api/teams')
            .then(response => response.json())
            .then(data => {
                setTimeout(() => { // Delay the update to simulate loading for 0.5 seconds
                    setTeams(sortTeamsAndAssignRanks(data));
                    setLoading(false); // End loading transition
                }, 500); // 500 milliseconds = 0.5 seconds
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const getRankTrophy = (rank) => {
        switch(rank) {
            case 1: return '/Images/golden.jpg';
            case 2: return '/Images/silver.jpg';
            case 3: return '/Images/bronze.jpg';
            default: return null;
        }
    };

    return (
        <div className={`leaderboard-container ${loading ? 'loading' : ''}`}>
            <h1>Leaderboard</h1>
            <button onClick={loadTeams}>Update Scores</button>
            {loading ? (
                <div className="loading-overlay">Updating Scores</div>  // Stylish loading indicator
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>RANK</th>
                            <th>TEAM NAME</th>
                            <th>TOTAL GAMES PLAYED</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team._id}>
                                <td>
                                    {getRankTrophy(team.rank) ? (
                                        <img src={getRankTrophy(team.rank)} alt={`Trophy for Rank ${team.rank}`} style={{ width: '30px', height: '30px' }} />
                                    ) : (
                                        team.rank
                                    )}
                                </td>
                                <td>
                                    <img src={team.avatarUrl || '/Images/1.jpg'} alt={team.name} className="avatar" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                    {team.name}
                                </td>
                                <td>{team.gamesPlayed}</td>
                                <td>{formatScore(team.score)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Leaderboard;
