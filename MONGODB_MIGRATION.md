# MongoDB Migration Guide

This document outlines the migration from SQL database to MongoDB for the IPL Booking System.

## What Changed

### Database Technology
- **From**: MySQL + Sequelize ORM
- **To**: MongoDB + Mongoose ODM

### Models Changes
1. **User Model**
   - `userId` → `_id` (MongoDB ObjectId)
   - Relationships now use ObjectId references

2. **Team Model**
   - `teamId` → `_id` (MongoDB ObjectId)
   - Relationships now use ObjectId references

3. **Match Model**
   - `matchId` → `_id` (MongoDB ObjectId)
   - `homeTeamId` and `awayTeamId` now reference Team ObjectIds
   - Validation moved to pre-save middleware

4. **Booking Model**
   - `bookingId` → `_id` (MongoDB ObjectId)
   - `userId` and `matchId` now reference ObjectIds

### API Changes
- Query syntax updated from Sequelize to Mongoose
- `findAll()` → `find()`
- `findByPk()` → `findById()`
- `where` clauses → MongoDB query objects
- Includes/Joins → `populate()`

### Environment Variables
Update your `.env` file with MongoDB connection details:
```
MONGODB_URI=mongodb://localhost:27017/ipl_booking_system
```

## Setup Instructions

1. **Install MongoDB**: Make sure MongoDB is installed and running on your system
2. **Update Dependencies**: Dependencies have been updated automatically
3. **Environment Configuration**: 
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string
4. **Seed Data**: Run `npm run seed` to populate initial team data
5. **Start Application**: Use `npm run dev` for development

## Key Differences

### Query Examples

**Before (Sequelize)**:
```javascript
const user = await User.findOne({ where: { userId, isDeleted: false } });
const teams = await Team.findAll();
```

**After (Mongoose)**:
```javascript
const user = await User.findOne({ _id: userId, isDeleted: false });
const teams = await Team.find({ isDeleted: false });
```

### Relationships

**Before (Sequelize)**:
```javascript
const matches = await Match.findAll({
  include: [
    { model: Team, as: 'homeTeam' },
    { model: Team, as: 'awayTeam' }
  ]
});
```

**After (Mongoose)**:
```javascript
const matches = await Match.find()
  .populate('homeTeamId', 'code logo')
  .populate('awayTeamId', 'code logo');
```

## Benefits of MongoDB

1. **Flexible Schema**: Easy to add new fields without migrations
2. **JSON Native**: Works naturally with JavaScript objects
3. **Horizontal Scaling**: Better for large-scale applications
4. **Rich Query Language**: Powerful aggregation pipeline
5. **No Complex Joins**: Simplified relationship handling

## Notes

- All existing API endpoints remain the same
- ObjectIds are automatically converted to strings in JSON responses
- Virtual properties maintain backward compatibility for `userId`, `teamId`, etc.
- Soft deletes are maintained using `isDeleted` boolean field
