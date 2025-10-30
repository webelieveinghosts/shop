import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={`relative ${className}`} style={{ aspectRatio: '5 / 4' }}>
            <Image
                src="/logo.png"
                alt="WBG Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    )
}
