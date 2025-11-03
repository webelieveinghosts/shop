import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ folder: string }> }
) {
    try {
        const params = await context.params;
        const { folder } = params;

        // Validação básica do folder name
        if (!folder || folder.includes('..') || folder.includes('/')) {
            return NextResponse.json(
                { error: 'Invalid folder name' },
                { status: 400 }
            );
        }

        const lookbookPath = path.join(process.cwd(), 'public', 'image', 'lookbook', folder);

        // Verifica se a pasta existe
        if (!fs.existsSync(lookbookPath)) {
            return NextResponse.json(
                { error: 'Collection not found' },
                { status: 404 }
            );
        }

        // Lê todos os arquivos da pasta
        const files = fs.readdirSync(lookbookPath);

        // Filtra apenas arquivos de imagem
        const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.avif'];
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        // Remove a extensão dos nomes dos arquivos
        const imageNames = imageFiles.map(file => path.parse(file).name);

        return NextResponse.json({
            success: true,
            images: imageNames,
            count: imageNames.length
        });
    } catch (error) {
        console.error('Error reading collection folder:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}