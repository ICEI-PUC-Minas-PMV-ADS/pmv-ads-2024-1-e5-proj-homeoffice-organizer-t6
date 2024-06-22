# Planos de Testes de Software

### 1. Testes de Autenticação e Gerenciamento de Usuários

**RF-001: Autenticação Simples**
- Verificar se é possível fazer cadastro de usuário e login.
- Garantir que apenas usuários autenticados como gestores possam acessar funcionalidades restritas.

**RF-002: Adição/Remoção de Colaboradores por Gestores**
- Testar a adição de um novo colaborador com nome, setor e e-mail.
- Verificar se apenas gestores autenticados podem adicionar e remover colaboradores.

**RF-003: Adicionar Colaborador ao Calendário**
- Confirmar que gestores podem adicionar colaboradores ao calendário.
- Testar diferentes cenários de adição de colaboradores em diferentes setores.

**RF-015: Remover Colaborador do Calendário**
- Testar a remoção de um colaborador do calendário.
- Verificar se há confirmação adicional ao tentar remover um colaborador.

### 2. Testes de Gerenciamento de Escalas de Trabalho

**RF-005: Criar e Alterar Escalas de Trabalho**
- Testar a criação e alteração das escalas de trabalho marcando dias no calendário com o nome do colaborador desejado.
- Verificar a funcionalidade de selecionar colaboradores para marcar dias no calendário.

**RF-006: Marcação de Dias de Home Office**
- Testar o método de clique na data selecionada e adicionar o nome do colaborador ao dia desejado para marcação de jornada home office.

**RF-008: Distinção entre Jornada Presencial e Home Office**
- Verificar se as marcações de escala dos funcionários no calendário distinguem claramente os dias de jornada presencial e home office.

**RF-010: Limite Máximo de Dois Dias de Home Office por Semana**
- Testar se o sistema bloqueia o usuário e emite um aviso ao tentar adicionar mais de dois dias de home office por semana.

### 3. Testes de Filtragem e Visualização no Calendário

**RF-007: Filtro por Setor no Calendário**
- Testar o filtro por setor no calendário para exibir apenas membros de um determinado setor.

**RF-009: Informação de Feriados e Fins de Semana**
- Verificar se o sistema informa corretamente feriados e fins de semana no calendário.
- Verificar se o sistema bloqueia corretamente a adição de colaboradores para home office em feriados e fins de semana.

### 4. Testes de Requisitos Não Funcionais

**RNF-001: Tempo de Carregamento da Tela Inicial**
- Medir e verificar se a tela inicial do sistema carrega em até 3 segundos.

**RNF-002: Facilidade na Adição/Remoção de Colaboradores**
- Contar cliques necessários para realizar a adição e remoção de colaboradores, garantindo que seja no máximo 4 cliques.

**RNF-003: Legibilidade e Aparência do Calendário**
- Testar a legibilidade do calendário em telas grandes, garantindo que seja claro e legível mesmo durante apresentações de slides.

**RNF-004: Responsividade do Sistema**
- Testar a responsividade do sistema em diferentes dispositivos e tamanhos de tela.

### 5. Testes de Relatórios e Exportação

**RF-014: Download de Relatório em PDF dos Dias de Home Office**
- Testar a funcionalidade de baixar um relatório em PDF dos dias de home office de um colaborador em um determinado mês.

### 6. Testes de Restrições

**RE-01: Conformidade com Boas Práticas de Desenvolvimento**
- Verificar se o código segue as diretrizes e boas práticas de desenvolvimento estabelecidas pela empresa.

**RE-02: Compatibilidade com Sistema de Apresentação de Slides**
- Testar se o sistema é compatível com o sistema de apresentação de slides existente na empresa.

# Evidências de Testes de Software

- [Vídeo de Teste de Cadastro e Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/ef35be87-55c5-4828-b42a-8ff2fbc08fa2)
- [Vídeo de Teste de Adição de Colaboradores e Home Office](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/c91c63af-2188-45c1-9aaf-c062a9eda736)
- [Vídeo de Teste de Gerenciamento de Eventos](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/b85b6a44-026c-472f-a436-35f7863c7fb9)
