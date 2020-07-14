const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    
    let responseBody = "";
    let statusCode = 0; 
    
    const params = {
        TableName: "movies"
    }

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    }
    catch (err) {
        responseBody = "Error al traer películas";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responseBody
    };
    return response;
};
