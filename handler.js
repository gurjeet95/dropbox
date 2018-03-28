'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const accountSid = 'AC3aed2e0326600b357af83468f0e2bf9f'
const authToken = '37e879c49802265455c0779a988e1b54'
const client = require('twilio')(accountSid,authToken);
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
  });
  client.messages.create(
  {
    to: '+17783028501',
    from: '+17784006904',
    body: 'New file ' +filename+ ' has created.',
  },
  (err, message) => {
      if(err){
          
      }
    console.log(message.sid)
  }
)
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

