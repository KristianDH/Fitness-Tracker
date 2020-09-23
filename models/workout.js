const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      // For the schema of this attribute, define type and default
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      // Schema for each item in exercises array
      {
        type: {
          type: String,
          trim: true,
          required: "Please enter type of exercise"
          // For the schema of this attribute, define type and trim and required
        },
        name: {
          type: String,
          trim: true,
          required: "Please enter name of exercise."
          // For the schema of this attribute, define type and trim and required
        },
        duration: {
          type: Number,
          required: true
          // For the schema of this attribute, define type as number and its required
        },
        weight: {
          type: Number
          // For the schema of this attribute, define type as number
        },
        reps: {
          type: Number
          // For the schema of this attribute, define type as number
        },
        sets: {
          type: Number
          // For the schema of this attribute, define type as number
        },
        distance: {
          type: Number
          // For the schema of this attribute, define type as number
        },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual('totalDuration').get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
