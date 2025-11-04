'use client';

import { useState } from 'react';

interface Collection {
    name: string;
    displayName: string;
    folderName: string;
    cover: string;
}

interface CollectionImages {
    [folderName: string]: string[];
}

export default function LookBook() {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [collectionImages, setCollectionImages] = useState<CollectionImages>({});
    const [loading, setLoading] = useState<string | null>(null);

    const collections: Collection[] = [
        {
            name: "MIDNIGHT RAVER$",
            displayName: "MIDNIGHT RAVER$",
            folderName: "midnight",
            cover: "capa"
        }
    ];

    const SmartImage = ({
        collectionName,
        imageName,
        alt,
        className = ""
    }: {
        collectionName: string;
        imageName: string;
        alt: string;
        className?: string;
    }) => {
        const extensions: string[] = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

        return (
            <div className="w-full h-full">
                <picture className="w-full h-full block">
                    {extensions.map((ext) => (
                        <source
                            key={ext}
                            srcSet={`/image/lookbook/${collectionName}/${imageName}.${ext}`}
                            type={`image/${ext === 'jpg' ? 'jpeg' : ext}`}
                        />
                    ))}
                    <img
                        src={`/image/lookbook/${collectionName}/${imageName}.webp`}
                        alt={alt}
                        className={`w-full h-full object-cover block ${className}`}
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const currentSrc = target.src;
                            const url = new URL(currentSrc);
                            const currentFilename = url.pathname.split('/').pop() || '';
                            const currentExt = currentFilename.split('.').pop() || '';

                            const currentIndex = extensions.indexOf(currentExt);
                            console.log(`Extensão ${currentExt} falhou, tentando próxima...`);

                            if (currentIndex < extensions.length - 1) {
                                const nextExt = extensions[currentIndex + 1];
                                const newSrc = `/image/lookbook/${collectionName}/${imageName}.${nextExt}`;
                                target.src = newSrc;
                                console.log('Tentando:', newSrc);
                            } else {
                                console.log('Todas as extensões falharam para:', imageName);
                            }
                        }}
                        onLoad={(e) => {
                            console.log('✅ Imagem carregada:', e.currentTarget.src);
                            console.log('Dimensões:', e.currentTarget.naturalWidth, 'x', e.currentTarget.naturalHeight);
                        }}
                    />
                </picture>
            </div>
        );
    };

    const fetchCollectionImages = async (collection: Collection) => {
        setLoading(collection.folderName);

        try {
            if (collectionImages[collection.folderName]) {
                setSelectedCollection(collection);
                setLoading(null);
                return;
            }

            const response = await fetch(`/api/collections/${collection.folderName}`);

            if (!response.ok) {
                throw new Error('Failed to fetch collection images');
            }

            const data = await response.json();
            console.log('Imagens da API:', data.images);

            const lookbookImages = data.images.filter((img: string) => img !== collection.cover);

            setCollectionImages(prev => ({
                ...prev,
                [collection.folderName]: lookbookImages
            }));

            setSelectedCollection(collection);
        } catch (error) {
            console.error('Error fetching collection images:', error);
            alert('Erro ao carregar imagens da coleção');
        } finally {
            setLoading(null);
        }
    };

    const handleCloseModal = () => {
        setSelectedCollection(null);
    };

    return (
        <>
            <main className="flex flex-col mx-auto max-w-screen-2xl px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collections.map((collection) => (
                        <div
                            key={collection.name}
                            className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
                            onClick={() => fetchCollectionImages(collection)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                {/* Debug: Mostrar se a imagem está carregando */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                    Carregando capa...
                                </div>

                                <SmartImage
                                    collectionName={collection.folderName}
                                    imageName={collection.cover}
                                    alt={`Capa da coleção ${collection.displayName}`}
                                    className="relative z-10"
                                />

                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-20" />

                                {loading === collection.folderName && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                                        <div className="text-white">Carregando coleção...</div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {collection.displayName}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {selectedCollection && (
                <div
                    className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative w-full max-w-7xl max-h-full bg-white rounded-xl shadow-2xl border border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white border-b border-gray-200 rounded-t-xl">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {selectedCollection.displayName}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-gray-100"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-[70vh]">
                                {collectionImages[selectedCollection.folderName]?.map((imageName, index) => (
                                    <div key={imageName} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        <SmartImage
                                            collectionName={selectedCollection.folderName}
                                            imageName={imageName}
                                            alt={`${selectedCollection.displayName} - ${index + 1}`}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}