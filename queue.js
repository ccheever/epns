import sqs from 'sqs';

import awsSqsConfig from './awsSqsConfig';

let _queue = sqs(awsSqsConfig);

let queueName = awsSqsConfig.queue;

async function pushAsync(data) {
  return new Promise((resolve, reject) => {
    _queue.push(queueName, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  _queue,
  queueName,
  pushAsync,
}