'use client';

import React from 'react';
import { Button } from "./ui/button";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function JoinSection() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // Configuração do EmailJS
            const templateParams = {
                from_name: formData.nome,
                from_email: formData.email,
                phone: formData.telefone,
                message: formData.mensagem,
                to_email: 'simcacachoeirinha@gmail.com' // Substitua pelo email do SIMCA
            };

            await emailjs.send(
                'service_ciqgtrs', // Substitua pelo seu Service ID
                'template_kr1cfue', // Substitua pelo seu Template ID
                templateParams,
                'XsjBtZjsWkrVFuTSy' // Substitua pela sua Public Key
            );

            setMessage('Mensagem enviada com sucesso!');
            setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setMessage('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="bg-red-800">
                <div className="container mx-auto flex flex-col gap-8 justify-center items-center p-8">
                    <h2 className="text-white text-4xl font-bold">
                        Filie-se ao SIMCA
                    </h2>

                    <span className="text-white text-xl">
                        Ao se filiar, você fortalece a luta por melhores condições de trabalho e direitos para todos os Servidores Públicos de Cachoeirinha.
                        <br />
                    </span>
                </div>
            </section>
            <section className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
                    <div className="relative z-0 flex flex-col bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 text-center border-b rounded-t-2xl">
                            <h5 className="text-lg font-semibold">ENTRE EM CONTATO</h5>
                        </div>
                        <div className="flex-auto p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        placeholder="Nome"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        placeholder="Telefone ex: (51) 91234-5678"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="tel"
                                        pattern="^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$"
                                        maxLength={15}
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        name="mensagem"
                                        value={formData.mensagem}
                                        onChange={handleChange}
                                        placeholder="Mensagem"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="text"
                                        required
                                    />
                                </div>

                                {message && (
                                    <div className={`mb-4 p-3 rounded ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {message}
                                    </div>
                                )}

                                <div className="text-center">
                                    <button
                                        className={`w-full px-6 py-3 mt-6 font-bold text-white uppercase transition-all rounded-lg shadow-soft-md bg-red-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Enviando...' : 'Enviar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}