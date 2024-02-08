import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

// Load credentials from credentials.json
const credentials = require('./cred.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Set up Google Drive API
const drive = google.drive({ version: 'v3', auth: oAuth2Client });

// Authenticate with OAuth2
oAuth2Client.setCredentials({ access_token: 'YOUR_ACCESS_TOKEN' });

// Create a new file
app.post('/create', async (_req: Request, res: Response) => {
    try {
        const fileMetadata = {
            name: 'MyFile.txt', 
            mimeType: 'text/plain',
        };
        const media = {
            mimeType: 'text/plain',
            body: fs.createReadStream('path/to/your/local/file.txt'), 
        };
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media, 
            fields: 'id',
        });
        res.json({ fileId: response.data.id });
    } catch (error) {
        console.error('Error creating file:', error.message);
        res.status(500).json({ error: 'Failed to create file' });
    }
});


// Read a file by ID
app.get('/read/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        console.error('Error reading file:', error.message);
        res.status(500).json({ error: 'Failed to read file' });
    }
});

// Update a file by ID
app.put('/update/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        // Update file metadata or content as needed
        // Example: Change the title or modify the content
        // ...
        res.json({ message: 'File updated successfully' });
    } catch (error) {
        console.error('Error updating file:', error.message);
        res.status(500).json({ error: 'Failed to update file' });
    };
});

// Delete a file by ID
app.delete('/delete/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        await drive.files.delete({ fileId });
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error.message);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
