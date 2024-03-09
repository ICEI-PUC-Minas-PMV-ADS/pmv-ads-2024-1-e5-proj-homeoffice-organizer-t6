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
|RF-002| O sistema deve permitir que somente gestores autenticados realizem adição/remoção de colaboradores e alterações de escala. | ALTA |
|RF-003| O gestor deve conseguir adicionar um novo colaborador ao calendário. | ALTA |
|RF-004| Ao adicionar um novo colaborador, o sistema deve permitir informar apenas o nome e o setor, sem a necessidade de informações adicionais. | ALTA |
|RF-005| Os gestores devem conseguir criar e alterar as escalas de trabalho dos colaboradores. | ALTA | 
|RF-006| O sistema deve exibir as marcações da escala dos funcionários no calendário, com distinção clara entre os dias de jornada presencial e home office. | ALTA |
|RF-007| O gestor deve conseguir remover um colaborador do calendário. | ALTA |
|RF-008| O sistema deve permitir a remoção de um colaborador com uma confirmação adicional | MÉDIA |



### Requisitos não Funcionais
Os requisitos não funcionais não estão relacionados diretamente com os serviços específicos do sistema oferecidos aos seus usuários. Eles estão relacionados com o nível de serviço esperado para o melhor funcionamento do software como um todo. O descritivo abaixo representa o escopo não funcional que a plataforma atenderá:

| ID    | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A interface do sistema deve ser extremamente simples e intuitiva, garantindo uma curva de aprendizado mínima. | ALTA |
|RNF-002| A adição e remoção de colaboradores deve ser realizada de forma rápida, sem exigir navegação por menus complexos. | ALTA |
|RNF-003| O calendário deve ter uma aparência clara e legível, mesmo quando exibido em telas grandes durante apresentações de slides. | MÉDIA |
|RNF-003| O sistema deve ser projetado para funcionar de forma eficiente e rápida, sem a necessidade de processos de carregamento demorados. | MÉDIA |


## Restrições

As questões que limitam a execução desse projeto e que se configuram como obrigações claras para o desenvolvimento do projeto em questão são apresentadas na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01| A aplicação deve ser desenvolvida utilizando a linguagem de programação e o framework determinados pela equipe de desenvolvimento. |
|RE-02| A equipe de desenvolvimento deve seguir as diretrizes e boas práticas de desenvolvimento estabelecidas pela empresa. |
|RE-03| A equipe de desenvolvimento deve garantir que o sistema seja compatível com o sistema de apresentação de slides existente na empresa. |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

![Use case diagram](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/31c4a971-9815-46bf-8f83-99a3fba55e06)

## Modelo ER (Projeto Conceitual)

![Flowchart](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-homeoffice-organizer-t6/assets/103579574/94d50f7f-7f08-4d72-a4b1-c4daa1785d07)


## Projeto da Base de Dados

![Modelo ER](img/Modelo_ER.png)

