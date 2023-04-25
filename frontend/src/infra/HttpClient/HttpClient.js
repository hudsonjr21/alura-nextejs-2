// Arquitetura Hexagonal
// Ports & Adapters
export async function HttpClient (fetchUrl, fetchOptions) {
  const options =  {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      'Content-Type': 'application/json'
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };
  return fetch(fetchUrl,options)
    .then(async (respostaDoServidor) => {
      return{
        ok: respostaDoServidor.ok,
        status: respostaDoServidor.status,
        status: respostaDoServidor.statusText,
        body: await respostaDoServidor.json(),
      }
    });
}
