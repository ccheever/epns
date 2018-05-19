let awsSqsConfig;
try {
  awsSqsConfig = require("./secret/aws");
} catch (e) {
  console.error("Put your AWS config in secret/aws.js\nIt should just be a JS object like the configuation shown here:\nhttps://www.npmjs.com/package/sqs");
}

module.exports = awsSqsConfig;
