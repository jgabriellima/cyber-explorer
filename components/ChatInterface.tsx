"use client"

import React, { useState } from 'react'
import { Mic, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatInterface() {
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
  const [isSending, setIsSending] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

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
    <div className="w-[40%] bg-[rgba(26,26,26,0.7)] futuristic-border animate-fade-in flex flex-col overflow-hidden">
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
            <div className="max-w-3/4 p-3 text-sm bg-[rgba(26,26,26,0.7)] border border-[rgba(0,255,255,0.5)]">
              {streamingMessage}
              <span className="cyberpunk-cursor"></span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-[rgba(26,26,26,0.9)] border-t border-[rgba(0,255,255,0.3)]">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            className="flex-1 bg-[rgba(42,42,42,0.7)] px-4 py-2 focus:outline-none focus:border-[#00cccc] border border-[rgba(0,255,255,0.5)]"
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className={`bg-[rgba(0,255,255,0.7)] text-[#0a0a0a] hover:bg-[rgba(0,204,204,0.7)] transition-colors ${isSending ? 'animate-send' : ''}`}
            disabled={isSending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}