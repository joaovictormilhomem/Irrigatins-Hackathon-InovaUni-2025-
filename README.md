# 🌱 IRRIGATINS: Manejo Inteligente da Irrigação

## 1. Sobre o Projeto

O **IrrigaTins** é um MVP de um sistema criado para ajudar a resolver a ineficiência na agricultura irrigada, causada pela falta de gestão de dados climáticos e assistência técnica.

O objetivo é transformar a irrigação em uma **tecnologia de Baixa Emissão de Carbono** através da máxima eficiência no uso de água e energia.

O objetivo central é fornecer diariamente ao produtor rural a **lâmina d'água exata (mm)** e o **tempo de irrigação (horas)**, promovendo uma economia média esperada de **15% de água** por ciclo.

Link do projeto: https://irrigatins.netlify.app/

## 2. Tecnologias e Arquitetura

O projeto utiliza uma arquitetura moderna, baseada no ecossistema **JavaScript/TypeScript**, garantindo legibilidade, simplicidade e agilidade no desenvolvimento.

### 2.1. Tecnologias Utilizadas

- **Framework:** React
- **Linguagem:** TypeScript
- **Ferramenta de Build:** Vite
- **Estilização:** CSS
- **Gerenciamento de Estado/Utilitários:** `react-use`
- **Modais:** `react-modal`

### 2.2 Estrutura do Projeto

O projeto segue uma estrutura padrão de aplicação React:

- `public/`: Ativos estáticos.
- `src/`: Código fonte principal da aplicação.
  - `assets/`: Imagens, ícones, etc.
  - `components/`: Componentes de UI reutilizáveis.
  - `hooks/`: Hooks React personalizados.
  - `logic/`: Lógica de negócios e funções utilitárias.
  - `pages/`: Páginas/telas da aplicação.
  - `styles/`: Estilos globais e resets CSS.
  - `main.tsx`: Ponto de entrada da aplicação.
  - `router.tsx`: Configuração de roteamento da aplicação.
  - `types.ts`: Definições de tipos TypeScript globais.

## 3. Instruções para Rodar o Projeto

### 3.1. Pré-requisitos (Configurações e Dependências)

#### 3.1.1. Verificação de Ferramentas

Certifique-se de ter as seguintes ferramentas instaladas globalmente:

- **Node.js** (versão LTS recomendada)
- **npm** (instalado com o Node.js) ou `yarn`
- **Git**

### 3.2 Clonagem e Instalação

1.  **Utilize os comandos abaixo para clonar o repositório e navegar para o diretório do projeto:**
    ```bash
    git clone https://github.com/joaovictormilhomem/Irrigatins-Hackathon-InovaUni-2025-.git
    cd Irrigatins-Hackathon-InovaUni-2025-
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Adicione a sua API KEY de https://openweathermap.org/api ao arquivo .env com o nome VITE_WEATHER_API_KEY**

4.  **Para rodar o projeto, use o comando:**
    ```bash
    npx vite
    ```