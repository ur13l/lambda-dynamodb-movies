
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    
    let responseBody = "";
    let statusCode = 0; 

    const {id} = event.pathParameters;
    
    const params = {
        TableName: "movies",
        Key: {
            id: id
        }
    }

    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    }
    catch (err) {
        responseBody = "Error al obtener película";
        statusCode = 403;
    }

    const response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: statusCode,
        body: responseBody
    };
    return response;
};
