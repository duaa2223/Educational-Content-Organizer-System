'use client'

import React, { useState, useEffect } from 'react';

const WeeklyResetManager = () => {
    const [isCompetitionActive, setIsCompetitionActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompetitionStatus();
    }, []);

    useEffect(() => {
        let timer;
        if (isCompetitionActive && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
        } else if (isCompetitionActive && timeRemaining === 0) {
            endCompetition();
        }
        return () => clearInterval(timer);
    }, [isCompetitionActive, timeRemaining]);

    const fetchCompetitionStatus = async () => {
        try {
            const response = await fetch('/api/weekly-competition/status');
            const data = await response.json();
            setIsCompetitionActive(data.isActive);
            setTimeRemaining(data.timeRemaining);
        } catch (error) {
            console.error('Error fetching competition status:', error);
            setError('Failed to fetch competition status');
        }
    };

    const startCompetition = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/weekly-competition/start', { method: 'POST' });
            const data = await response.json();
            setIsCompetitionActive(true);
            setTimeRemaining(7 * 24 * 60 * 60); // 7 days in seconds
            setLoading(false);
        } catch (error) {
            console.error('Error starting competition:', error);
            setError('Failed to start competition');
            setLoading(false);
        }
    };

    const endCompetition = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/weekly-competition/end', { method: 'POST' });
            const data = await response.json();
            setIsCompetitionActive(false);
            setTimeRemaining(0);
            setLoading(false);
            // You might want to show a success message or update the UI to reflect the winners
        } catch (error) {
            console.error('Error ending competition:', error);
            setError('Failed to end competition');
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;
        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Weekly Competition Manager</h2>
            {isCompetitionActive ? (
                <>
                    <p className="mb-4">Competition is active. Time remaining: {formatTime(timeRemaining)}</p>
                    <button
                        onClick={endCompetition}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        End Competition
                    </button>
                </>
            ) : (
                <button
                    onClick={startCompetition}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Start New Competition
                </button>
            )}
        </div>
    );
};

export default WeeklyResetManager;