import express from 'express';

const app = express();

/** Métodos API
 * GET      => Buscar uma informação.  
 * POST     => Inserir (criar) uma informação dentro da API. 
 * PUT      => Alterar uma informação.
 * DELETE   => Remover um dado.
 * PATCH    => Alterar uma informação específica - Alterar somente a senha por exemplo.
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