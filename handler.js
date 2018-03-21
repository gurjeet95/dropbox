'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
