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

                    <button
                        type="button"
                        onClick={() => window.open('https://wa.me/+555198660241?text=Olá,%20gostaria%20de%20me%20filiar%20ao%20SIMCA.', '_blank')}
                        className="px-4 py-2 mt-4 font-bold text-white uppercase transition-all rounded-lg shadow-soft-md bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        Contato via WhatsApp
                    </button>


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

            <section className="bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">

                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold mb-4 text-red-800 border-b-2 border-red-800 pb-2">Horários de Atendimento</h3>
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold">Segunda a Sexta:</span>
                                    <span>08:00 às 17:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold mb-4 text-red-800 border-b-2 border-red-800 pb-2">Informações de Contato</h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-semibold">Email:</span>
                                    <span className="break-all">simcacachoeirinha@gmail.com</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-semibold">Telefone:</span>
                                    <span>+55 51 99866-0241</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">Endereço:</span>
                                    <span className="text-sm sm:text-base">Avenida Flores da Cunha, 903, Sala 1202 - 12º Andar - Cachoeirinha/RS</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-2 lg:col-span-1">
                            <h3 className="text-2xl font-bold mb-4 text-red-800 border-b-2 border-red-800 pb-2">Assessoria de Imprensa</h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-semibold">Email:</span>
                                    <span className="break-all">simcacomunicacao@gmail.com</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-semibold">Telefone:</span>
                                    <span>+55 51 99590-1688</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>

    );
}