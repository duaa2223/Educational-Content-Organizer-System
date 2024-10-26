import mongoose from 'mongoose';

const weeklyCompetitionSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.models.WeeklyCompetition || mongoose.model('WeeklyCompetition', weeklyCompetitionSchema, "weeklyCompetitions");
