'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const accountSid = 'AC3aed2e0326600b357af83468f0e2bf9f'
const authToken = '37e879c49802265455c0779a988e1b54'
const client = require('twilio')(accountSid,authToken);
const lambda = new AWS.Lambda({
  region: 'us-east-1'
})

module.exports.filesaveinfo = (event) => {
  event.Records.forEach((record) => {
      console.log(record);
    const filename = record.s3.object.key;
    const date = record.eventTime;
    const type = record.eventName;
    const params = {
        TableName: 'dropbox',
        Item: {
            id : uuid.v1(),
            fileName: filename ,
            eventtype:type,
            dateCreated : date
            
        }
    }
    
    dynamoDb.put(params,(error, result) => {
        if(error){
            console.log(error);
        }
        console.log("success");
        let params2 = {
        FunctionName: 'first-serverless-dev-sendsms',
        Payload: JSON.stringify({ filename: filename })
      }
      lambda.invoke(params2, (err, data) => {
        if(err) {
          console.log(err)
          return
        }
})
  });
});
}

module.exports.filedelinfo = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const date = record.eventTime;
    const type = record.eventName;
    const params = {
        TableName: 'dropbox',
        Item: {
            id : uuid.v1(),
            fileName: filename ,
            eventtype:type,
            dateCreated : date
        }
    }
    
    dynamoDb.put(params,(error, result) => {
        if(error){
            console.log(error);
        }
        console.log("success");
  });
});
}


module.exports.sendsms = (event, context, callback) => {
client.messages.create(
    {
      to: '+17783028501',
      from: '+17784006904',
      body: `New file ${event.filename} has added to S3.`
    },
    (err, message) => {
        if(err){
            
        }
      console.log(message.sid)
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "Success" }),
      }
      callback(null, response);
    }
  )
};

