"use client"
import React, { useState } from 'react';
import { Search, FileText, Folder, ChevronRight, Info } from 'lucide-react';
import Footer from "@/components/Footer";

const FileItem = ({ name, type, icon: Icon, onClick }) => (
    <div className="flex items-center space-x-2 p-2 hover:bg-[rgba(58,58,58,0.7)] transition-colors cursor-pointer" onClick={onClick}>
        <Icon className="w-5 h-5 text-[#00ffff]" />
        <span>{name}</span>
    </div>
);


export default function Library() {
    const [selectedFile, setSelectedFile] = useState(null);

    const files = [
        { name: 'AI in Healthcare.pdf', type: 'pdf' },
        { name: 'Machine Learning Basics', type: 'folder' },
        { name: 'Data Science Overview.pdf', type: 'pdf' },
        { name: 'Neural Networks', type: 'folder' },
        { name: 'Quantum Computing.pdf', type: 'pdf' },
    ];

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    return (
        <div className="h-screen bg-[#0a0a0a] text-[#00ffff] flex flex-col relative overflow-hidden" style={{fontFamily: '"Orbitron", sans-serif'}}>
            <div className="relative z-10 flex flex-col h-full p-4" style={{backgroundColor: "#000000a1"}}>
                <div className="w-full h-full bg-[rgba(26,26,26,0.7)] p-4 relative">
                    <CyberpunkBorder />
                    <div className="w-full h-full bg-[#0a0a0a] p-4 relative">
                        <CyberpunkBorder />
                        <header className="flex justify-between items-center mb-4 animate-fade-in">
                            <div className="text-2xl font-bold">PDFb Library</div>
                            <div className="relative flex-1 max-w-2xl mx-4">
                                <input
                                    type="text"
                                    placeholder="Search PDFs..."
                                    className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)] px-4 py-2 focus:outline-none focus:border-[#00cccc]"
                                />
                                <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#00ffff]"/>
                            </div>
                        </header>

                        <main className="flex-1 flex space-x-4 overflow-hidden">
                            <div className="w-1/2 bg-[rgba(26,26,26,0.7)] p-4 animate-fade-in flex flex-col overflow-hidden relative">
                                <CyberpunkBorder />
                                <h2 className="text-lg font-bold mb-4">Your Files</h2>
                                <div className="flex-1 overflow-y-auto cyberpunk-scrollbar">
                                    {files.map((file, index) => (
                                        <FileItem
                                            key={index}
                                            name={file.name}
                                            type={file.type}
                                            icon={file.type === 'pdf' ? FileText : Folder}
                                            onClick={() => handleFileClick(file)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="w-1/2 bg-[rgba(26,26,26,0.7)] p-4 animate-fade-in flex flex-col overflow-hidden relative">
                                <CyberpunkBorder />
                                {selectedFile ? (
                                    <>
                                        <h2 className="text-lg font-bold mb-4">{selectedFile.name}</h2>
                                        <div className="flex-1 overflow-y-auto cyberpunk-scrollbar">
                                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg mb-4 relative">
                                                <CyberpunkBorder />
                                                <h3 className="text-sm font-semibold mb-2">File Information</h3>
                                                <p>Type: {selectedFile.type.toUpperCase()}</p>
                                                <p>Size: 2.5 MB</p>
                                                <p>Last Modified: 2023-06-15</p>
                                            </div>
                                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg mb-4 relative">
                                                <CyberpunkBorder />
                                                <h3 className="text-sm font-semibold mb-2">Indexing Status</h3>
                                                <p>Status: Completed</p>
                                                <p>Indexed Data Size: 1.8 MB</p>
                                                <p>Last Indexed: 2023-06-16</p>
                                            </div>
                                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg relative">
                                                <CyberpunkBorder />
                                                <h3 className="text-sm font-semibold mb-2">Content Preview</h3>
                                                <p className="text-sm text-gray-400">
                                                    This document discusses the applications of artificial intelligence in modern healthcare...
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <Info className="w-6 h-6 mr-2" />
                                        Select a file to view details
                                    </div>
                                )}
                            </div>
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}