"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search, Mic, Send, Upload, Scan, BarChart3, Maximize2 } from 'lucide-react'
import GLOBE from 'vanta/dist/vanta.globe.min'
import * as THREE from 'three'
import { BarChart, LineChart, XAxis, YAxis, Bar, Line } from 'recharts'
import * as d3 from 'd3'
import Footer from "@/components/footer";

export default function Component() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Olá! Estou pronto para analisar seu PDF. Como posso ajudar?' },
        { role: 'user', content: 'Pode me dar um resumo do conteúdo deste PDF?' },
        { role: 'assistant', content: 'Claro! O PDF que você enviou parece ser um artigo científico sobre inteligência artificial e suas aplicações na medicina. O documento tem 15 páginas e está dividido em várias seções, incluindo introdução, metodologia, resultados e conclusão. Gostaria que eu destacasse alguma seção específica?' },
        { role: 'user', content: 'Sim, por favor. Pode me falar mais sobre a seção de resultados?' },
        { role: 'assistant', content: 'Certamente! A seção de resultados começa na página 8 e se estende até a página 12. Os principais pontos destacados são:\n\n1. O sistema de IA desenvolvido demonstrou uma precisão de 94% no diagnóstico de imagens médicas, superando a média dos radiologistas humanos em 7%.\n2. O tempo médio de análise por imagem foi reduzido de 15 minutos (análise humana) para apenas 30 segundos com o sistema de IA.\n3. Em um estudo de caso com 1000 pacientes, o uso do sistema de IA resultou em uma redução de 23% nos diagnósticos falso-negativos.\n\nGostaria que eu elaborasse mais algum desses pontos?' },
        { role: 'user', content: 'Isso é muito interessante! Há alguma menção sobre os desafios ou limitações do sistema?' },
        { role: 'assistant', content: 'Excelente pergunta! Sim, o artigo menciona alguns desafios e limitações do sistema de IA na seção de discussão, que começa na página 13. Os principais pontos são:\n\n1. Viés nos dados de treinamento: O sistema foi treinado principalmente com dados de uma população específica, o que pode limitar sua eficácia em outros grupos demográficos.\n2. Interpretabilidade: Embora o sistema seja altamente preciso, às vezes é difícil para os médicos entenderem exatamente como ele chegou a certas conclusões.\n3. Dependência de hardware: O sistema requer hardware de alto desempenho para funcionar em tempo real, o que pode limitar sua implementação em ambientes com recursos limitados.\n4. Questões éticas e regulatórias: O artigo destaca a necessidade de diretrizes claras sobre o uso de IA na tomada de decisões médicas.\n\nO artigo sugere que pesquisas futuras devem focar em abordar essas limitações. Há algo específico sobre esses desafios que você gostaria de saber mais?' },
        { role: 'user', content: 'Não, isso já é muito útil. Obrigado! Pode me dizer quais são as principais conclusões do artigo?' },
        { role: 'assistant', content: 'Claro, fico feliz em ajudar! As principais conclusões do artigo, encontradas na seção final (páginas 14-15), são:\n\n1. A IA tem um potencial significativo para melhorar a precisão e eficiência do diagnóstico médico, especialmente em radiologia.\n2. A implementação bem-sucedida de sistemas de IA na medicina requer uma abordagem multidisciplinar, envolvendo médicos, cientistas de dados e especialistas em ética.\n3. Embora os resultados sejam promissores, é necessário mais pesquisa para abordar as limitações atuais, especialmente em termos de viés e interpretabilidade.\n4. A adoção generalizada de IA na medicina provavelmente mudará o papel dos médicos, com um foco maior na interpretação de resultados de IA e na comunicação com os pacientes.\n5. É crucial desenvolver padrões éticos e regulatórios robustos para garantir o uso responsável da IA na saúde.\n\nO artigo conclui que, apesar dos desafios, a IA tem o potencial de revolucionar a prática médica, melhorando os resultados dos pacientes e tornando os cuidados de saúde mais eficientes e acessíveis.\n\nHá mais alguma coisa sobre o artigo que você gostaria de saber?' },
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const [streamingMessage, setStreamingMessage] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)
    const [vantaEffect, setVantaEffect] = useState(null)
    const vantaRef = useRef(null)

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                GLOBE({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x00ffff,
                    color2: 0x0000ff,
                    size: 1.50,
                    backgroundColor: 0x0a0a0a
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Simulação do grafo de conhecimento
        const knowledgeGraphData = {
            nodes: [
                { id: "IA", group: 1 },
                { id: "Medicina", group: 1 },
                { id: "Diagnóstico", group: 2 },
                { id: "Radiologia", group: 2 },
                { id: "Ética", group: 3 },
                { id: "Regulação", group: 3 }
            ],
            links: [
                { source: "IA", target: "Medicina", value: 1 },
                { source: "IA", target: "Diagnóstico", value: 1 },
                { source: "Medicina", target: "Radiologia", value: 1 },
                { source: "Diagnóstico", target: "Radiologia", value: 1 },
                { source: "IA", target: "Ética", value: 1 },
                { source: "IA", target: "Regulação", value: 1 }
            ]
        };

        const width = "100%";
        const height = "100%";

        const svg = d3.select("#knowledge-graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const simulation = d3.forceSimulation(knowledgeGraphData.nodes)
            .force("link", d3.forceLink(knowledgeGraphData.links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.append("g")
            .selectAll("line")
            .data(knowledgeGraphData.links)
            .enter().append("line")
            .attr("stroke", "#00ffff")
            .attr("stroke-opacity", 0.6);

        const node = svg.append("g")
            .selectAll("circle")
            .data(knowledgeGraphData.nodes)
            .enter().append("circle")
            .attr("r", 8)
            .attr("fill", "#00ffff")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const text = svg.append("g")
            .selectAll("text")
            .data(knowledgeGraphData.nodes)
            .enter().append("text")
            .text(d => d.id)
            .attr("font-size", 10)
            .attr("dx", 12)
            .attr("dy", 4);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            text
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Simulação do gráfico de embedding
        const embeddingData = Array.from({ length: 100 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            cluster: Math.floor(Math.random() * 3)
        }));

        const embeddingSvg = d3.select("#embedding-graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const colorScale = d3.scaleOrdinal()
            .domain([0, 1, 2])
            .range(["#00ffff", "#ff00ff", "#ffff00"]);

        const zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        embeddingSvg.call(zoom);

        const g = embeddingSvg.append("g");

        const points = g.selectAll("circle")
            .data(embeddingData)
            .enter().append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 5)
            .attr("fill", d => colorScale(d.cluster))
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function zoomed(event) {
            g.attr("transform", event.transform);
        }

        function handleMouseOver(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 8);

            g.append("text")
                .attr("id", "tooltip")
                .attr("x", d.x + 10)
                .attr("y", d.y - 10)
                .text(`Cluster: ${d.cluster}`)
                .attr("font-size", "12px")
                .attr("fill", "#ffffff");
        }

        function handleMouseOut() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 5);

            d3.select("#tooltip").remove();
        }

    }, []);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setIsSending(true)
            setMessages([...messages, { role: 'user', content: inputMessage }])
            setInputMessage('')

            setIsStreaming(true)
            const response = "Entendi. Estou processando sua solicitação... Aqui está uma resposta mais longa para demonstrar o efeito de streaming cyberpunk."
            let i = 0
            const streamInterval = setInterval(() => {
                if (i < response.length) {
                    setStreamingMessage(prev => prev + response[i])
                    i++
                } else {
                    clearInterval(streamInterval)
                    setIsStreaming(false)
                    setMessages(prev => [...prev, { role: 'assistant', content: response }])
                    setStreamingMessage('')
                    setIsSending(false)
                }
            }, 50)
        }
    }

    return (
        <div ref={vantaRef} className="h-screen bg-[#0a0a0a] text-[#00ffff] flex flex-col relative overflow-hidden" style={{fontFamily: '"Orbitron", sans-serif'}}>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

        .cyberpunk-border {
          position: relative;
          overflow: hidden;
        }
        .cyberpunk-border::before,
        .cyberpunk-border::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ffff, #0000ff, #ff00ff, #00ffff);
          background-size: 400% 400%;
          z-index: -1;
          animation: gradientBorder 15s ease infinite;
        }
        .cyberpunk-border::after {
          filter: blur(10px);
        }
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .futuristic-border {
          position: relative;
          overflow: hidden;
        }
        //.futuristic-border::before {
        //  content: '';
        //  position: absolute;
        //  top: 0;
        //  left: 0;
        //  right: 0;
        //  bottom: 0;
        //  border: 1px solid rgba(0, 255, 255, 0.5);
        //  clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
        //  z-index: 1;
        //}
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-send {
          animation: send 0.5s ease-out;
        }
        @keyframes send {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }
        .thumbnail-hover {
          transition: transform 0.3s ease-in-out;
        }
        .thumbnail-hover:hover {
          transform: scale(1.05);
        }
        .cyberpunk-cursor {
          display: inline-block;
          width: 10px;
          height: 20px;
          background-color: #00ffff;
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .cyberpunk-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .cyberpunk-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }
        .cyberpunk-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 255, 255, 0.5);
          border-radius: 4px;
        }
        .cyberpunk-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 255, 255, 0.7);
        }

      `}</style>

            <div className="cyberpunk-border absolute inset-0 z-0"></div>

            <div className="relative z-10 flex flex-col h-full p-4 " style={{backgroundColor: "#000000a1"}}>
                <header className="flex justify-between items-center mb-4 animate-fade-in">
                    <div className="text-2xl font-bold">PDFb</div>
                    <div className="relative flex-1 max-w-2xl mx-4">
                        <input
                            type="text"
                            placeholder="Pesquisar PDFs..."
                            className="w-full bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)] px-4 py-2 focus:outline-none focus:border-[#00cccc]"
                        />
                        <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#00ffff]"/>
                    </div>
                    <nav className="flex space-x-4">
                        {['Biblioteca', 'Análises', 'Configurações'].map((item) => (
                            <button key={item} className="text-[#00ffff] hover:text-white transition-colors">
                                {item}
                            </button>
                        ))}
                    </nav>
                </header>

                <main className="flex-1 flex space-x-4 overflow-hidden">
                    <div
                        className="w-[10%] bg-[rgba(26,26,26,0.7)] p-4 futuristic-border animate-fade-in flex flex-col overflow-y-auto column-height cyberpunk-scrollbar">
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {[...Array(20)].map((_, i) => (
                                <div key={i}
                                     className={`bg-[rgba(42,42,42,0.7)] p-2 hover:bg-[rgba(58,58,58,0.7)] transition-colors cursor-pointer ${isLoading ? 'animate-pulse' : 'animate-fade-in'}`}
                                     style={{animationDelay: `${i * 100}ms`}}>
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="w-[105px] h-[148px] bg-[rgba(0,255,255,0.2)] flex flex-col items-center justify-center text-xs relative overflow-hidden thumbnail-hover">
                                            <div className="absolute inset-0 backdrop-blur-[1px]"></div>
                                            <div className="z-10 text-white font-semibold mb-auto p-2">PDF</div>
                                            <div
                                                className="z-10 text-white text-[10px] mt-auto p-1 bg-[rgba(0,0,0,0.5)] w-full text-center">
                                                Página {i + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="w-[40%] bg-[rgba(26,26,26,0.7)] futuristic-border animate-fade-in flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 cyberpunk-scrollbar">
                            {messages.map((message, index) => (
                                <div key={index}
                                     className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                     style={{animationDelay: `${index * 100}ms`}}>
                                    <div className={`max-w-3/4 p-3 text-sm ${
                                        message.role === 'user' ? 'bg-[rgba(0,51,51,0.7)]' : 'bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)]'
                                    }`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isStreaming && (
                                <div className="flex justify-start animate-fade-in">
                                    <div
                                        className="max-w-3/4 p-3 text-sm bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)]">
                                        {streamingMessage}
                                        <span className="cyberpunk-cursor"></span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-[rgba(26,26,26,0.9)] border-t border-[rgba(0,255,255,0.3)]">
                            <div className="flex space-x-2">
                                <button
                                    className="p-2 bg-[rgba(42,42,42,0.7)] hover:bg-[rgba(58,58,58,0.7)] transition-colors">
                                    <Mic className="w-5 h-5"/>
                                </button>
                                <input
                                    type="text"
                                    className="flex-1 bg-[rgba(42,42,42,0.7)] px-4 py-2 focus:outline-none focus:border-[#00cccc] border border-[rgba(0,255,255,0.5)]"
                                    placeholder="Digite sua mensagem..."
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className={`p-2 bg-[rgba(0,255,255,0.7)] text-[#0a0a0a] hover:bg-[rgba(0,204,204,0.7)] transition-colors ${isSending ? 'animate-send' : ''}`}
                                    disabled={isSending}
                                >
                                    <Send className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-[50%] bg-[rgba(26,26,26,0.7)] p-4 cyberpunk-scrollbar animate-fade-in flex flex-col overflow-y-auto column-height">
                        <h2 className="text-lg font-bold mb-4">Visualizações</h2>
                        <div className="space-y-6 pb-4">
                            {/* Grafo de Conhecimento */}
                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2">Grafo de Conhecimento</h3>
                                <div id="knowledge-graph" className="h-64"></div>
                                <p className="text-xs text-gray-400 mt-2">Figura 1: Grafo de conhecimento gerado a
                                    partir do conteúdo do PDF.</p>
                            </div>

                            {/* Gráfico de Embedding */}
                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2">Espaço Latente de Embeddings</h3>
                                <div id="embedding-graph" className="h-64"></div>
                                <p className="text-xs text-gray-400 mt-2">Figura 2: Visualização dos embeddings no
                                    espaço latente e clusters identificados.</p>
                            </div>

                            {/* Gráfico de barras */}
                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2">Distribuição de Tópicos no PDF</h3>
                                <div className="h-64">
                                    <BarChart
                                        data={[
                                            {name: 'Introdução', value: 10},
                                            {name: 'Metodologia', value: 25},
                                            {name: 'Resultados', value: 40},
                                            {name: 'Discussão', value: 20},
                                            {name: 'Conclusão', value: 5},
                                        ]}
                                    >
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Bar dataKey="value" fill="#00ffff"/>
                                    </BarChart>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Figura 3: Distribuição de tópicos baseada na
                                    análise do conteúdo do PDF.</p>
                            </div>

                            {/* Tabela de dados */}
                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2">Principais Descobertas</h3>
                                <table className="w-full text-sm">
                                    <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="text-left py-2">Métrica</th>
                                        <th className="text-right py-2">Valor</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-b border-gray-700">
                                        <td className="py-2">Precisão do Sistema IA</td>
                                        <td className="text-right">94%</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <td className="py-2">Melhoria vs. Radiologistas</td>
                                        <td className="text-right">+7%</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <td className="py-2">Redução no Tempo de Análise</td>
                                        <td className="text-right">97%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Redução em Falsos Negativos</td>
                                        <td className="text-right">23%</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">Tabela 1: Resumo das principais descobertas do
                                    estudo.</p>
                            </div>

                            {/* Gráfico de linha */}
                            <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
                                <h3 className="text-sm font-semibold mb-2">Progresso da Precisão do Sistema IA</h3>
                                <div className="h-64">
                                    <LineChart
                                        data={[
                                            {month: 'Jan', accuracy: 85},
                                            {month: 'Fev', accuracy: 88},
                                            {month: 'Mar', accuracy: 90},
                                            {month: 'Abr', accuracy: 92},
                                            {month: 'Mai', accuracy: 94},
                                        ]}
                                    >
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Line type="monotone" dataKey="accuracy" stroke="#00ffff"/>
                                    </LineChart>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Figura 4: Evolução da precisão do sistema IA
                                    ao longo do tempo.</p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-3 py-1 bg-[rgba(42,42,42,0.7)] hover:bg-[rgba(58,58,58,0.7)] transition-colors futuristic-border">
                                <Scan className="w-4 h-4 mr-1 inline"/>
                                Escanear
                            </button>
                            <button
                                className="px-3 py-1 bg-[rgba(42,42,42,0.7)] hover:bg-[rgba(58,58,58,0.7)] transition-colors futuristic-border">
                                <BarChart3 className="w-4 h-4 mr-1 inline"/>
                                Analisar
                            </button>
                        </div>
                    </div>
                </main>

                <Footer/>
            </div>
        </div>
    )
}