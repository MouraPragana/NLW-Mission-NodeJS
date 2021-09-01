import express from 'express';

const app = express();

/** Métodos API
 * GET      => Buscar uma informação.  
 * POST     => Inserir (criar) uma informação dentro da API. 
 * PUT      => Alterar uma informação.
 * DELETE   => Remover um dado.
 * PATCH    => Alterar uma informação específica - Alterar somente a senha por exemplo.
 */

/** Tipos de parâmetros
 *  Routes Params => http://localhost:3000/produtos/454012 => app.get('test/{id}') => const id = req.params.id
 *  Query Params (parâmetros não obrigatórios) => http://localhost:3000/produtos?name=teclado&description=tecladobom
 * 
 *  Body Params (post, put, patch) => {
 *      "name": "teclado",
 *      "description": "teclado bom"
 * }
 */

app.get("/test", (request, response) => {
    // Request => Entrando.
    // Response => Saindo.
    return response.send("Olá NLW");
});

app.post("/test-post", (request, response) => {
    return response.send("Olá NLW metodo POST");
});

app.listen(3000, () => console.log("Server is running!"));