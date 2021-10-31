const { cloudWatchClient } = require('./functions/external/Amazon/index');
const { _ } = require('lodash')

function createStream(){
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const date = `${month}-${day}-${year}`;
    const getParams = {
        logStreamName: `${date}`,
        logGroupName: 'application'
    }
    const stream = () => cloudWatchClient.createLogStream(getParams, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            return data
        };
    });
    return stream()

};

getParams = {
    logGroupName: 'application'
};
const logEvent = (request, response, error) => cloudWatchClient.describeLogStreams(getParams, function (err, data) {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const date = `${month}-${day}-${year}`;
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
    params = {
        logEvents: [ /* required */ {
            message: `${JSON.stringify(message)}`,
            timestamp: `${new Date().getTime()}` /* required */
        }, ],
        logGroupName: `application`,
        logStreamName: `${date}`
    }
    if (err) return {
        message: err.stack
    };
    else {
        const streamData = data.logStreams.filter(result => result.logStreamName.includes(date));
        if (streamData.length == 0) { 
            createStream();
            const putLogs = () => cloudWatchClient.putLogEvents(params, function (err, data) {
                if (err) {
                    return {
                        message: err.stack
                    }; // an error occurred
                } else return data; // successful response
            })
            setTimeout(putLogs, 2000)
        };
        putParams = (streamData[0] && streamData[0].uploadSequenceToken && {
            ...params,
            sequenceToken: `${streamData[0].uploadSequenceToken}`
        });
        cloudWatchClient.putLogEvents(putParams, function (err, data) {
            if (err) {
                return {
                    message: err.stack
                }; // an error occurred
            } else return data; // successful response
        })
        return streamData;
    };
});

module.exports = { logEvent };