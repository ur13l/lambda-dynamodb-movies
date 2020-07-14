const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    
    let responseBody = "";
    let statusCode = 0; 

    const {id, name, director} = JSON.parse(event.body);
    
    const params = {
        TableName: "movies",
        Key: {
            id: id
        },
        Item: {
            id: id,
            name: name,
            director: director
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    }
    catch (err) {
        responseBody = "Error al insertar película";
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
