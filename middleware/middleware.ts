import { IncomingMessage } from 'http';
import multiparty from 'multiparty';
import nextConnect from 'next-connect';

const middleware = nextConnect();

interface IIncomingRequest extends IncomingMessage {
  body: unknown;
  uploads: ArrayBuffer[];
}

middleware.use((req: IIncomingRequest, res, next) => {
  if (req.method !== 'POST') next();

  const form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    req.body = fields;
    req.uploads = files;
    next();
  });
});

export default middleware;
