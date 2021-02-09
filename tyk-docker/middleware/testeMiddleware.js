var testeMiddleware = new TykJS.TykMiddleware.NewMiddleware({});


testeMiddleware.NewProcessRequest(function(request, session, spec){
  log("Log dentro da função");

  if (request.Headers['X-Application-Id'] == undefined) {
    // no token at all?
    request.ReturnOverrides.ResponseCode = 401
    request.ReturnOverrides.ResponseError = 'Header missing (JS middleware)'
    return testeMiddleware.ReturnData(request, {});
  }

  log("token recebido: " + JSON.stringify(request.Headers.Authorization)
                        .replace("[\"Basic","").replace("\"]","").trim());

  id = request.Headers['X-Application-Id'];
  
  // log("URL acessada: " + request.URL)
  // log("Request recebida: " + JSON.stringify(request));

  requestObj = {
    "Method":"GET",
    "Domain":"http://host.docker.internal:8200/v1/myengine/data/" + id,
    "Headers":{
      "x-vault-token":"root"
    }
  };

  // log ("Endereço do Vault acessado: " + "http://host.docker.internal:8200/v1/myengine/data/" + id)
  
  response = JSON.parse(TykMakeHttpRequest(JSON.stringify(requestObj)));
  body = JSON.parse(response.Body);
  request.SetHeaders["X-Header-From-Middleware"] = body.data.data.token;
  return testeMiddleware.ReturnData(request, {})
});

log("Sample middleware initialised")