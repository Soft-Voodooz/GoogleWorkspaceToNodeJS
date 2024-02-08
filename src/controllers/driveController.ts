import { Request, Response } from 'express';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { readFile } from 'fs/promises'; 

class DriveController {
    private auth;

    constructor() {
        this.loadCredentialss();
    };

    private async loadCredentials() {
        try {
            const content = await readFile('./cred.json', 'utf-8');
            const data = JSON.parse(content);
            this.auth = new google.auth.GoogleAuth({
                credentials: data,
                scopes: ['https://www.googleapis.com/auth/drive']
            });
        } catch (error) {
            console.error('Error loading credentials:', error);
            throw new Error('Failed to load credentials');
        };
    };

    private async loadCredentialss() {
    try {
        const content = await readFile('./cred.json', 'utf-8');
        const credentials = JSON.parse(content);
        const auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: ['https://www.googleapis.com/auth/drive']
        });
        this.auth = auth;
    } catch (error) {
        console.error('Error loading credentials:', error);
        throw new Error('Failed to load credentials');
    }
}

   

    async getAllFiles(_req: Request, res: Response) {
        try {
            const drive = google.drive({ version: 'v3', auth: this.auth });
            const response = await drive.files.list({
                pageSize: 10,
                fields: 'nextPageToken, files(id, name)',
            });

            const files = response.data.files;
            res.json(files);
        } catch (error) {
            console.error('Error fetching files from Google Drive:', error);
            res.status(500).json({ error: 'Failed to fetch files from Google Drive' });
        }
    }
}


// getFile = async (req: Request, res: Response) => {
//         try {
//             const fileId = req.params.fileId; 
//             const drive = await this.authenticateWithGoogleDrive();
//             const response = await drive.files.get({
//                 fileId: fileId,
//                 fields: 'id, name, mimeType', 
//             });
//             const file = response.data;
//             res.json(file);
//         } catch (error) {
//             console.error('Error fetching file from Google Drive:', error);
//             res.status(500).json({ error: 'Failed to fetch file from Google Drive' });
//         }
//     };

//     uploadImage = async (req: Request, res: Response) => {
//         try {
//             let image : any;
//             if (typeof req.body.image === 'string') image = req.body.image;
//             image = req.body.image.data; 

//             const drive = await this.authenticateWithGoogleDrive();
//             const fileMetadata = {
//                 name: 'MyImage.jpg',
//             };

//             const media = {
//                 mimeType: 'image/jpeg',
//                 body: image,
//             };

//             const createdFile = await drive.files.create({
//                 requestBody: fileMetadata,
//                 media: media,
//                 fields: 'id',
//             });

//             res.json({ fileId: createdFile.data.id });
//         } catch (error) {
//             console.error('Error uploading image to Google Drive:', error);
//             res.status(500).json({ error: 'Failed to upload image to Google Drive' });
//         };
//     };

export default new DriveController();