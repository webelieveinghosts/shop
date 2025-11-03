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
        // Adicione mais coleções aqui
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
            <picture>
                {extensions.map((ext) => (
                    <source
                        key={ext}
                        srcSet={`/image/lookbook/${collectionName}/${imageName}.${ext}`}
                        type={`image/${ext === 'jpg' ? 'jpeg' : ext}`}
                    />
                ))}
                <img
                    src={`/image/lookbook/${collectionName}/${imageName}.jpg`}
                    alt={alt}
                    className={className}
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const currentSrc = target.src;
                        const currentExt = currentSrc.split('.').pop() || '';
                        const currentIndex = extensions.indexOf(currentExt);

                        if (currentIndex < extensions.length - 1) {
                            const nextExt = extensions[currentIndex + 1];
                            target.src = `/image/lookbook/${collectionName}/${imageName}.${nextExt}`;
                        }
                    }}
                />
            </picture>
        );
    };

    const fetchCollectionImages = async (collection: Collection) => {
        setLoading(collection.folderName);

        try {
            // Se já temos as imagens em cache, não busca novamente
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

            // Filtra a imagem de capa da lista
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
                <h1 className="text-3xl font-bold text-center mb-8">Coleções</h1>

                {/* Grid de Coleções */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collections.map((collection) => (
                        <div
                            key={collection.name}
                            className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105"
                            onClick={() => fetchCollectionImages(collection)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <SmartImage
                                    collectionName={collection.folderName}
                                    imageName={collection.cover}
                                    alt={`Capa da coleção ${collection.displayName}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                                {/* Loading Overlay */}
                                {loading === collection.folderName && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <div className="text-white">Carregando...</div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {collection.displayName}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Ver coleção
                                    {collectionImages[collection.folderName] && (
                                        <span> ({collectionImages[collection.folderName].length} fotos)</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            {selectedCollection && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative w-full max-w-7xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header do Modal */}
                        <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
                            <h2 className="text-2xl font-bold text-white">
                                {selectedCollection.displayName}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-opacity-70"
                            >
                                ×
                            </button>
                        </div>

                        {/* Grid de Imagens no Modal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[90vh] py-12">
                            {collectionImages[selectedCollection.folderName]?.map((imageName, index) => (
                                <div key={imageName} className="rounded-lg overflow-hidden bg-white">
                                    <SmartImage
                                        collectionName={selectedCollection.folderName}
                                        imageName={imageName}
                                        alt={`${selectedCollection.displayName} - ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}