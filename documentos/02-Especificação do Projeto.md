# Especificações do Projeto


Nesta seção, iremos abordar a definição do problema e a ideia de solução sob a perspectiva do usuário. Utilizaremos técnicas como criação de diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais, além de considerar as restrições do projeto. Isso nos permitirá entender as necessidades dos usuários e os objetivos do sistema, garantindo uma abordagem centrada no usuário e uma solução eficaz para facilitar o registro de dias de home office.


## Personas

<img src="/documentos/img/Persona.jpg">
<img src="/documentos/img/Persona1.jpg">
<img src="/documentos/img/Persona2.jpg">


## Histórias de Usuários

A partir de uma entrevista com as personas, foi possível registrar as seguintes histórias de usuários.

<img src="/documentos/img/historiaUsuario.jpg">


## Arquitetura e Tecnologias


Para o projeto, propomos uma arquitetura cliente-servidor, onde o cliente será uma aplicação web desenvolvida em React, utilizando JavaScript. O servidor será responsável por fornecer os dados da aplicação e realizar operações de armazenamento e recuperação dos registros de home office.

A aplicação React funcionará como a interface do usuário, permitindo que os colaboradores visualizem o calendário de home office, registrem seus dias de trabalho remoto e recebam notificações relevantes.

Para armazenar os dados dos colaboradores, sugerimos o uso de arquivos JSON, garantindo uma solução simples e de fácil implementação. O servidor será responsável por gerenciar esses arquivos e fornecer os dados necessários à aplicação cliente.

## Project Model Canvas

![ProjectModelCanvasA1 (1)_page-0001 (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/4854aefb-b70c-4737-9a43-7027d1866294)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, foi aplicada a técnica de priorização da Escala de Três Níveis, que busca delimitar o universo de possíveis valores desse atributo para tais possibilidades, de modo que a prioridade seja uniformizada e melhor entendida por todos do time.

Foram estabelecidos os níveis de prioridade de acordo com os dois aspectos principais: importância e urgência. Assim, forma-se um quadrante, capaz de criar prioridades que combinem esses aspectos.


### Requisitos Funcionais

| ID   | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve possuir autenticação simples para os gestores. | ALTA |
|RF-002| O sistema deve permitir que somente gestores autenticados realizem adição/remoção de colaboradores. | ALTA |
|RF-003| O gestor deve conseguir adicionar ao calendário um novo colaborador. | ALTA |
|RF-004| Ao adicionar um novo colaborador, o sistema deve permitir informar apenas o nome e o setor, sem a necessidade de informações adicionais. | ALTA |
|RF-005| Os gestores devem conseguir criar e alterar as escalas de trabalho dos colaboradores, marcando um dia do calendário com o nome desse respectivo colaborador. | ALTA | 
|RF-006| Para agendar o dia, o método deve ser arrastando o nome do colaborador até esse dia. | MÉDIA |
|RF-007| O sistema deve exibir as marcações da escala dos funcionários no calendário, com distinção clara entre os dias de jornada presencial e home office. | ALTA |
|RF-008| O sistema deve informar fins de semana e feriados no calendário. | ALTA |
|RF-009| O sistema deve possibilitar que seja marcado no máximo dois dias de home office por semana, bloqueando o usuário se houver tentativa de acrescentar mais dias. | ALTA |
|RF-010| O sistema deve informar quantos dias de home office serão permitidos por colaborador no mês. | ALTA |
|RF-011| Se houver dia de feriado em uma semana, deve ser decrescido um número nos dias de home office do colaborador de forma automática e nessa semana o sistema deve possibiltar apenas a marcação de um dia.  | ALTA |
|RF-012| O sistema deve permitir que os gestores baixem um relatório em pdf dos dias de home office de um colaborador em um determinado mês. | ALTA |
|RF-013| O gestor deve conseguir remover um colaborador do calendário com confirmação adicional | ALTA |



### Requisitos Não Funcionais
Os requisitos não funcionais não estão relacionados diretamente com os serviços específicos do sistema oferecidos aos seus usuários. Eles estão relacionados com o nível de serviço esperado para o melhor funcionamento do software como um todo. O descritivo abaixo representa o escopo não funcional que a plataforma atenderá:

| ID    | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Ao fazer login, o usuário deve conseguir visualizar a tela inicial em até 3 segundos | ALTA |
|RNF-002| A adição e remoção de colaboradores deve ser realizada com no máximo 4 cliques. | ALTA |
|RNF-003| O calendário deve ter uma aparência clara e legível, mesmo quando exibido em telas grandes durante apresentações de slides. | MÉDIA |
|RNF-004| Sistema deve ser inteiramente responsivo. | MÉDIA |
|RNF-004| Sistema deve permitir baixar o relatóro de um colaborador com apenas dois cliques. | MÉDIA |

## Restrições

As questões que limitam a execução desse projeto e que se configuram como obrigações claras para o desenvolvimento do projeto em questão são apresentadas na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01| A equipe de desenvolvimento deve seguir as diretrizes e boas práticas de desenvolvimento estabelecidas pela empresa. |
|RE-02| A equipe de desenvolvimento deve garantir que o sistema seja compatível com o sistema de apresentação de slides existente na empresa. |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

![Use case diagram](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/76b302e9-8096-43b0-b35d-f4c9abd08890)

## Modelo ER (Projeto Conceitual)

![Flowchart](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/7593deb7-2b75-4b6b-b44c-92a9d0fd9a91)


## Projeto da Base de Dados

![Modelo ER](img/Modelo_ER.png)

