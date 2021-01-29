var testeMiddleware = new TykJS.TykMiddleware.NewMiddleware({});


testeMiddleware.NewProcessRequest(function(request, session){
    log("Log dentro da função");


    log("REQUEST: " + request);
    requestObj = {
      "Method":"GET",
      // "Domain":"http://127.0.0.1:8200/v1/myengine/data/teste",
      "Domain":"http://localhost:8200/v1/myengine/data/teste",
      // "Domain":"http://httpbin.org/get",
      "Headers":{
        "x-vault-token":"root"
      }
    };

    response = JSON.parse(TykMakeHttpRequest(JSON.stringify(requestObj)));
    log("BODY DA RESPONSE" + response.Body);
    return testeMiddleware.ReturnData(request, session.meta_data)
});
// http://httpbin.org/get
// Ensure init with a post-declaration log message
log("Sample middleware initialised")