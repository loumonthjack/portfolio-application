const { cloudWatchClient } = require('./functions/external/Amazon/index');
const { _ } = require('lodash')

const today = `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`;
function createStream() {
    const stream = () => {
        const createLogStream = cloudWatchClient.createLogStream({
            logStreamName: today,
            logGroupName: 'application'
        }).promise().catch(err => {
            console.log(err)
        });
        return createLogStream;
    };
    return stream();
};


const logEvent = (request, response, error) => {
    const cloudWatch = cloudWatchClient.describeLogStreams({
        logGroupName: 'application'
    }).promise().catch(err => {
        console.log(err)
    });
    cloudWatch.then(data => {
        const isBodyEmpty = _.isEmpty(request.body);
        const bodylessRequest = {
            url: request.originalUrl,
            method: request.method,
            code: response.statusCode,
            message: response.statusMessage,
            error: error
        }
        const message = isBodyEmpty == true ? bodylessRequest : {
            ...bodylessRequest,
            body: request.body
        }

        const logStreamToday = data.logStreams.filter(result => result.logStreamName.includes(today));
        if (logStreamToday.length == 0) {
            createStream();
            const putLogs = () => {
                const createLog = cloudWatchClient.putLogEvents({
                    logEvents: [ /* required */ {
                        message: `${JSON.stringify(message)}`,
                        timestamp: `${new Date().getTime()}` /* required */
                    },],
                    logGroupName: `application`,
                    logStreamName: today
                }).promise().catch(err => { console.log(err) });
                return createLog;
            };
            setTimeout(putLogs, 2000)
        };
        if (logStreamToday.length > 0) {
            putParams = logStreamToday[0].uploadSequenceToken && {
                logEvents: [ /* required */ {
                    message: `${JSON.stringify(message)}`,
                    timestamp: `${new Date().getTime()}` /* required */
                },],
                logGroupName: `application`,
                logStreamName: today,
                sequenceToken: `${logStreamToday[0].uploadSequenceToken}`
            };
            cloudWatchClient.putLogEvents(putParams).promise().catch(err => { console.log(err) });
            return logStreamToday;
        }
    });
};


module.exports = { logEvent };