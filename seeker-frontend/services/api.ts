import axios from 'axios';
import { VideoData } from '../types/video'; // Importing the types we just made

// 1. Create a base configuration for Axios
const API = axios.create({
    baseURL: 'http://localhost:3000/api/videos', 
});

// 2. Function to fetch/save a new video transcript
export const fetchAndSaveTranscript = async (videoId: string): Promise<VideoData> => {
    const response = await API.post('/fetch', { videoId });
    return response.data.video;
};

// 3. Function to search within a specific video
export const searchTranscript = async (videoId: string, query: string) => {
    const response = await API.get('/search', {
        params: { videoId, q: query }
    });
    return response.data.results;
};