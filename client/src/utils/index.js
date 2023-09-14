import FileSaver from 'file-saver';

import { surpriseMePrompts } from '../constants';
// Function to get a random prompt
export function getRandomPrompt(prompt) {
    // Generate a random index within the range of available surprise prompts
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    // Get the random prompt using the random index
    const randomPrompt = surpriseMePrompts[randomIndex];

    // If the randomly selected prompt is the same as the current one, recursively call the function to get a different prompt
    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    // Return the randomly selected prompt
    return randomPrompt;
}

// Function to download an image
export async function downloadImage(_id, photo) {
    // Use the 'FileSaver' library to initiate the download of the provided 'photo' with a customized filename
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
