const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    
    let responseBody = "";
    let statusCode = 0; 
    
    const params = {
        TableName: "movies",
        Key: {
            id: "111"
        },
        UpdateExpression: "set director = :d",
        ExpressionAttributeValues: {
            ":d": "Steven Spielberg"
        }

    }

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    }
    catch (err) {
        responseBody = "Error al editar película";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responseBody
    };
    return response;
};
