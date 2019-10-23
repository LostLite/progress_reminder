const axios = require('axios');
const url = 'http://api.moringa.org/';

//Fetch list of modules to evaluate
const fetchModules = async () => {

    const result = await axios.get(`${url}/modules/live_modules`);
    const allModules = result.data.results;
    //for each module check for the status of each student's progression and send a notification
    allModules.map(singleModule => {

        //if we are middway through the module, check student progression
        const startdate = new Date(singleModule.start_date.split('/').reverse().join('-'));
        const enddate = new Date(singleModule.end_date.split('/').reverse().join('-'));
        const middate = new Date((startdate.getTime() + enddate.getTime()) / 2);

        if(isToday(middate)){
            singleModule.students.map(studentId => {
                checkStudentProgression(singleModule, studentId);
            });
        }
    });
}

/**
 * check the progression status of each student for each module
 * @param {*} moduleInstance 
 * @param {*} studentId 
 */
const checkStudentProgression = async (moduleInstance,studentId) => {

    const result = await axios.get(`${url}/progression/${moduleInstance.id}/${studentId}`);
    sendNotifications(studentId, moduleInstance, result.data.progress > 45? "on track":"behind");
}

/**
 * Send a notification to the student on the status of their progress in a module
 * @param {*} studentId 
 * @param {*} moduleInstance 
 * @param {*} status 
 * 
 */
const sendNotifications = (studentId, moduleInstance, status) => {
    axios({
        method: 'post',
        url: `${url}/notification/${studentId}`,
        data: {
            title:`Progress update for the ${moduleInstance.name} module`,
            body: `You are currently <b>${status}</b> in your progress for the ${moduleInstance.name} module`
        }
    });
}

/**
 * Check if a given date is today
 * @param {*} thisDate 
 */
const isToday = (thisDate) => {
    const today = new Date();
    return thisDate.getDate() == today.getDate() &&
    thisDate.getMonth() == today.getMonth() &&
    thisDate.getFullYear() == today.getFullYear()
}

module.exports = fetchModules;