"use client"

import React, { useEffect } from 'react'
import { Scan, BarChart3 } from 'lucide-react'
import { BarChart, LineChart, XAxis, YAxis, Bar, Line } from 'recharts'
import * as d3 from 'd3'
import { Button } from "@/components/ui/button"

export default function VisualizationPanel() {
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

    const width = 300;
    const height = 200;

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

  return (
    <div className="w-[50%] bg-[rgba(26,26,26,0.7)] p-4 cyberpunk-scrollbar animate-fade-in flex flex-col overflow-y-auto column-height">
      <h2 className="text-lg font-bold mb-4">Visualizações</h2>
      <div className="space-y-6 pb-4">
        {/* Grafo de Conhecimento */}
        <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Grafo de Conhecimento</h3>
          <div id="knowledge-graph" className="h-64"></div>
          <p className="text-xs text-gray-400 mt-2">Figura 1: Grafo de conhecimento gerado a partir do conteúdo do PDF.</p>
        </div>

        {/* Gráfico de Embedding */}
        <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Espaço Latente de Embeddings</h3>
          <div id="embedding-graph" className="h-64"></div>
          <p className="text-xs text-gray-400 mt-2">Figura 2: Visualização dos embeddings no espaço latente e clusters identificados.</p>
        </div>

        {/* Gráfico de barras */}
        <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Distribuição de Tópicos no PDF</h3>
          <div className="h-64">
            <BarChart
              width={300}
              height={200}
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
          <p className="text-xs text-gray-400 mt-2">Figura 3: Distribuição de tópicos baseada na análise do conteúdo do PDF.</p>
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
          <p className="text-xs text-gray-400 mt-2">Tabela 1: Resumo das principais descobertas do estudo.</p>
        </div>

        {/* Gráfico de linha */}
        <div className="bg-[rgba(42,42,42,0.7)] p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Progresso da Precisão do Sistema IA</h3>
          <div className="h-64">
            <LineChart
              width={300}
              height={200}
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
          <p className="text-xs text-gray-400 mt-2">Figura 4: Evolução da precisão do sistema IA ao longo do tempo.</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button variant="outline" className="px-3 py-1">
          <Scan className="w-4 h-4 mr-1" />
          Escanear
        </Button>
        <Button variant="outline" className="px-3 py-1">
          <BarChart3 className="w-4 h-4 mr-1" />
          Analisar
        </Button>
      </div>
    </div>
  )
}