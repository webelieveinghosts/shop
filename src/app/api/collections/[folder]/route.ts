import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: { folder: string } }
) {
    try {
        const folder = params.folder;

        const lookbookPath = path.join(process.cwd(), 'public', 'image', 'lookbook', folder);

        if (!fs.existsSync(lookbookPath)) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        const files = fs.readdirSync(lookbookPath);

        const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.avif'];
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        const imageNames = imageFiles.map(file => path.parse(file).name);

        return NextResponse.json({ images: imageNames });
    } catch (error) {
        console.error('Error reading collection folder:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}