import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

const sendMail = async (event, context) => {
	const record = event.Records[0]; //SQS Records
	console.log('record processing:', record);

	const email = JSON.parse(record.body); //queue msg parse
	const { subject, body, recipient } = email;

	const params = {
		Source: 'legui.kevin@gmail.com',
		Destination: {
			ToAddresses: [recipient],
		},
		Message: {
			Body: {
				Text: {
					Data: body,
				},
			},
			Subject: {
				Data: subject,
			},
		},
	};

	try {
		const result = await ses.sendEmail(params).promise();
		console.log(result);
	} catch (err) {
		console.log(err);
	}
};

export const handler = sendMail;
