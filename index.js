import sqs from 'sqs';

let awsSqsConfig;
try {
  awsSqsConfig = require("./secret/aws");
} catch (e) {
  console.error("Put your AWS config in secret/aws.js\nIt should just be a JS object like the configuation shown here:\nhttps://www.npmjs.com/package/sqs");
}

let q = sqs(awsSqsConfig);

// push some data to the test queue
q.push(awsSqsConfig.queue, {
  some: 'data'
}, function (err, result) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("completed successfully pushing some data");
  }
});
