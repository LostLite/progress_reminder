const app = require('express')()
const router = require('express').Router();
const cron = require('node-cron');
const PORT = process.env.PORT || 3000;
const fetchModules = require('./sendReminders');

//apply middleware
app.use('/', router);

//setup a cron job to run at a specified interval
cron.schedule("0 00 * * *", () => {
    console.log('Cron job running every minute.');
     fetchModules();
});

// this end point will display all sent out alert/reminders
app.get('/', async (req, res) => {
    res.status(200).json({message:'Welcome to the Reminder system.'});
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});