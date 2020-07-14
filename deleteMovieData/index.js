const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    
    let responseBody = "";
    let statusCode = 0; 
    
    const params = {
        TableName: "movies",
        Key: {
            id: "123"
        }
    }

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 204;
    }
    catch (err) {
        responseBody = "Error al eliminar película";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        body: responseBody
    };
    return response;
};
