'use client'

import { useState, useEffect } from 'react'

const CORRECT_PASSWORD = 'DEVERDADE'
const STORAGE_KEY = 'wbg_shop_authenticated'

export function PasswordGate({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Verificar se já está autenticado no localStorage
        const authenticated = localStorage.getItem(STORAGE_KEY)
        if (authenticated === 'true') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password === CORRECT_PASSWORD) {
            localStorage.setItem(STORAGE_KEY, 'true')
            setIsAuthenticated(true)
            setError('')
        } else {
            setError('Senha incorreta. Tente novamente.')
            setPassword('')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black">
                <div className="text-white text-2xl">Carregando...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black">
                <div className="w-full max-w-md px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            WBG SHOP
                        </h1>
                        <p className="text-gray-400 text-lg">
                            we believe in ghosts
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Digite a senha para acessar a loja
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition"
                                placeholder="Digite a senha"
                                autoFocus
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        >
                            ENTRAR
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Acesso restrito
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
