var testeMiddleware = new TykJS.TykMiddleware.NewMiddleware({});


testeMiddleware.NewProcessRequest(function(request, session){
    log("Log dentro da função");

    requestObj = {
      "Method":"GET",
      "Domain":"http://127.0.0.1:8200/v1/myengine/data/teste",
      "Headers":{
        "x-vault-token":"s.9hQROk14EP5hvfiNZ2WaCZV8"
      }
    };

    response = JSON.parse(TykMakeHttpRequest(JSON.stringify(requestObj)));
    log("BODY DA RESPONSE" + response.Body);
    return testeMiddleware.ReturnData(request, session.meta_data)
});
// http://httpbin.org/get
// Ensure init with a post-declaration log message
log("Sample middleware initialised")