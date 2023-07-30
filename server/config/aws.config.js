const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const ssm = new AWS.SSM();

async function getParameterValue(parameterName) {
    const params = {
        Name: parameterName,
        WithDecryption: true, 
    };

    const response = await ssm.getParameter(params).promise();
    console.log(`Retrieved ${parameterName} from AWS SSM Parameter Store.`);
    return response.Parameter.Value;
}

async function fetchEnvironmentVariables() {
    const secretKey = await getParameterValue('SECRET_KEY');
    console.log(secretKey);
    process.env.API_KEY = secretKey;
    const mapsAPI = await getParameterValue('REACT_APP_GOOGLE_MAPS_API_KEY');
    console.log(mapsAPI);
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY = mapsAPI;
    const nodeEnv = await getParameterValue('NODE_ENV');
    console.log(nodeEnv);
    process.env.NODE_ENV = nodeEnv;
}

module.exports = fetchEnvironmentVariables;
