// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as speech from '@google-cloud/speech';
import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const handler = nextConnect();
handler.use(middleware);

interface Request extends NextApiRequest {
  uploads: { files: { fieldName: string; path: 'string' }[] };
}

handler.post(async (req: Request, res: NextApiResponse) => {
  const client = new speech.SpeechClient();

  const file = req.uploads.files[0];
  const fileread = fs.readFileSync(file.path);
  const audioBytes = fileread.toString('base64');

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'ru-RU',
    enableWordConfidence: true,
    enableWordTimeOffsets: true,
  };
  const request = {
    audio,
    config,
  };
  // @ts-ignore
  const [response] = await client.recognize(request);
  console.log(response);
  res.json(response);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
