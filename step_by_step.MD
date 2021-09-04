### Iniciando o Projeto
1 - yarn init -y
2 - yarn add typescript -D
3 - yarn tsc --init
4 - yarn add express
5 - yarn add @types/express -D
6 - yarn add ts-node-dev -D

### Iniciando com o typeorm
1 - yarn add typeorm reflect-metadata mssql
    => import "reflect-metadata" no server.ts

2 - Configurar a conexão com o banco ormconfig.json
    => https://typeorm.io/#/using-ormconfig
    => Criar o arquivo de conexão (dentro de database/index.ts)
    => import './database' em server.ts para chamar a conexão

3 - Configurar o migration
    => Configurar o cli dentro do arquivo ormconfig.json
    => Criar script typeorm => ts-node-dev ./node_modules/typeorm/cli.js
        (Para verificar se funcionou executar yarn typeorm --help)

4 - Criar Migrations
    => yarn typeorm migration:create -n NomeDaMigration (CreateUsers por exemplo)
    => E dentro do arquivo criado acima é criado a tabela.
        => Dentro da função "public async up(queryRunner: QueryRunner): Promise<void>"
        pode se preencher com:      await queryRunner.createTable(
                                        new Table({
                                            name:  "users",
                                            columns: [
                                                {
                                                    name:"id",
                                                    type:"uuid",
                                                    isPrimary: true,
                                                },
                                                {
                                                    name:"name",
                                                    type:"varchar"
                                                },
                                                {
                                                    name:"email",
                                                    type:"varchar"
                                                },
                                                {
                                                    name:"admin",
                                                    type:"boolean",
                                                    default: false
                                                },
                                                {
                                                    name: "created_at",
                                                    type:"timestamp",
                                                    default:"now()"
                                                },
                                                {
                                                    name:"updated_at",
                                                    type:"timestamp",
                                                    default:"now()"
                                                }
                                            ]
                                        })
                                    )
        e dentro de "public async down(queryRunner: QueryRunner): Promise<void>"
        temos que preencher com o processo contrario do "up" 
        => await queryRunner.dropTable("users");

    => Definir no ormconfig.json o caminho para ser executado a migration,
    com a propriedade "migrations" => "migrations": ["src/database/migrations/*.ts"],

    => para executar a migration basta executar yarn typeorm migration:run
    => para remover a migration basta executar yarn typeorm migration:revert

5 - Criar entidade (Entidade Usuario, temos uma tabela Usuario)
    Exemplo: Entidade <-> ORM <-> BD (users). ** A aplicação faz uma interação com a entiddade e a partir daí vemos para qual tabela a entidade está apontada **

    => Basta configurar no ormconfig.json, dentro de "cli" a seguinte chave { "entitiesDir": "src/entities" }
        e para executar basta executar por exemplo "yarn typeorm entity:create -n User

    O arquivo da entidade ficará parecido com:
        import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
        import {v4 as uuid} from "uuid";

        @Entity("users") //nome da tabela do banco, criada em migrations
        class User {
            @PrimaryColumn()
            readonly id: string; // A uníca coisa que pode fazer alteração aqui é a própria entidade, por isso readonly

            @Column()
            name: string;

            @Column()
            email: string;
            
            @Column()
            admin: boolean;
            
            @CreateDateColumn()
            created_at: Date;
            
            @UpdateDateColumn()
            updated_at: Date;

            //new User() estamos instanciando o construtor da entidade;
            constructor(){ 
                //Um o ID está preenchido - (alteração, busca), e o outro não está preenchido (criação)
                if(!this.id){
                    this.id = uuid();
                }    
            }
        }
        export { User };

6 - Criação do repositorio 
    => Entity <-> ORM <-> BD
            Repositorios => Camada que tem os métodos entre as entidades e os bancos de dados (busca, criação).

ROTA => CONTROLLER => SERVICE => REPOSITORIO - METODO => ENTIDADE => TABELA

7 - Biblioteca para lidar com erros asyncronos = yarn add express-async-errors;
Depois de import express, importar "exress-async-errors"

