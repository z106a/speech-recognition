import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { POST } from '../../../fetch-api';
import { bufferToWave } from './utils';

const sampleRate = 16000;
const numberOfChannels = 1;

let reader: FileReader;

if (process.browser) {
  reader = new FileReader();
  reader.onload = async () => {
    const audioContext = new window.AudioContext();
    const videoFileAsBuffer = reader.result as ArrayBuffer;

    const decodedAudioData = await audioContext.decodeAudioData(videoFileAsBuffer);
    var duration = decodedAudioData.duration;

    const offlineAudioContext = new OfflineAudioContext(1, 16000 * duration, 16000);
    const soundSource = offlineAudioContext.createBufferSource();

    soundSource.buffer = decodedAudioData;
    soundSource.connect(offlineAudioContext.destination);
    soundSource.start();

    const renderedBuffer = await offlineAudioContext.startRendering();
    const song = audioContext.createBufferSource();

    song.buffer = renderedBuffer;
    song.connect(audioContext.destination);
    // song.start();

    const formData = new FormData();
    const waveBuffer = bufferToWave(renderedBuffer, renderedBuffer.length);
    formData.append('files', waveBuffer);

    const response = await POST('upload', formData);
    console.log(response);
  };
}

const MainRoot: NextPage = () => {
  const onDrop = useCallback((acceptedFiles) => {
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        height: '500px',
        backgroundColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag drop some files here, or click to select files</p>}
      </div>
    </div>
  );
};

export default MainRoot;
