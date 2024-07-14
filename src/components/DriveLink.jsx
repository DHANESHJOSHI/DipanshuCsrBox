import { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

const GOOGLE_DRIVE_API_URL = 'https://www.googleapis.com/upload/drive/v3/files';
const API_KEY = '111f2885936fe17d83f281150681ca84b9ac4c5d'; // Replace with your Google API key

const createDriveLink = async () => {
  try {
    // Example: Creating a text file on Drive
    const fileMetadata = {
      name: 'Sample File.txt',
      mimeType: 'text/plain',
    };

    const media = {
      mimeType: 'text/plain',
      body: 'Hello, World!',
    };

    // Make a POST request to upload fil
    const response = await axios.post(`
      ${GOOGLE_DRIVE_API_URL}?uploadType=multipart&fields=webViewLink&key=${API_KEY}`,
      {
        ...fileMetadata,
        media,
      }
    );

    console.log('Response:', response.data);
    return response.data.webViewLink;
  } catch (error) {
    console.error('Error creating file:', error);
    throw new Error('Error generating link');
  }
};

const DriveLinkButton = () => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const webViewLink = await createDriveLink();
      if (webViewLink) {
        setLink(webViewLink);
        setError('');
      } else {
        setLink('Error generating link');
        setError('');
      }
    } catch (error) {
      setError('Failed to generate link');
      setLink('');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Drive Link</button>
      {link && (
        <p>
          Drive Link:{' '}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DriveLinkButton;
