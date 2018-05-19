import express from 'express';
import bodyParser from 'body-parser';

import queue from './queue';
import validateMessage from './validate';

let app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));

async function handleMessageAsync(msg) {
  let vmsg = validateMessage(msg);
  let result = await queue.pushAsync(vmsg);
  console.log("Successfully wrote to queue: ", vmsg);
  return result;
}

async function handleRequestAsync(req, res) {
  let body = req.body;

  try {
    if (Array.isArray(body)) {
      // Array of messages
      let $ps = [];
      for (let i = 0; i < body.length; i++) {
        $ps.push(handleMessageAsync(body[i]));
      }
      await Promise.all($ps);
    } else if ((typeof body === "object") && (body !== null)) {
      // Single message
      await handleMessageAsync(body);
    } else {
      // Error
      res.status(400).send({
        error: "Malformed request. Send a JSON objects for a message or an Array of objects for messages. See the docs.",
      });
    }
  } catch (e) {
    if (e._ApiValidationError) {
      res.status(400).send("Request format error: " + e.message);
    } else {
      res.status(500).send(e.message);
    }
  }

}

app.all('/push/send', (req, res) => {
  handleRequestAsync(req, res);
});


app.listen(port, () => {
  console.log('Push notifications endpoint listening on port ' + port);
});

