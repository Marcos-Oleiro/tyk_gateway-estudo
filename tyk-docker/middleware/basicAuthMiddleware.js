var basicAuthMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

basicAuthMiddleware.NewProcessRequest(function(request, session, spec){

  log('Requisição recebida: ' + JSON.stringify(request));
  if (request.Headers['X-Application-Id'] == undefined) {
    var strTokenUndefined  = 'Token de identificação da aplicação não informado';
    errorLogs(strTokenUndefined)
    request.ReturnOverrides.ResponseCode = 404;
    request.ReturnOverrides.ResponseError = strTokenUndefined;
    return basicAuthMiddleware.ReturnData(request, {});
  }

  var token = JSON.stringify(request.Headers.Authorization)
                          .replace('[\"Basic','').replace('\"]','').trim();

  var decodedToken = b64dec(token);
  log('Usuário utilizado: ' + decodedToken.split(':')[0]);
  var id = request.Headers['X-Application-Id'];

  var requestObj = {
    'Method':'GET',
    'Domain':'http://host.docker.internal:8200/v1/myengine/data/' + id,
    'Headers':{
      'x-vault-token':'root'
    }
  };

  var response = JSON.parse(TykMakeHttpRequest(JSON.stringify(requestObj)));
  
  if (response.Code != 200){
    var strTokenInvalid  = 'Token de identificação inválido';
    errorLogs(strTokenInvalid)
    request.ReturnOverrides.ResponseCode = 404;
    request.ReturnOverrides.ResponseError = strTokenInvalid;
    return basicAuthMiddleware.ReturnData(request, {});
  }  

  var body = JSON.parse(response.Body);
  request.DeleteHeaders.push('X-Application-Id');
  request.SetHeaders['X-Header-From-Middleware'] = body.data.data.token;
  // request.DeleteHeaders.push('Authorization');
  request.SetHeaders['Authorization1'] = "Bearer " + body.data.data.token;

  log('Requisição enviada para a Gupy: ' + JSON.stringify(request));
  return basicAuthMiddleware.ReturnData(request, session.meta_data);
});

function errorLogs(errorMessage){
  var currentDate = new Date(); 
  var months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  var dateMessage = months[currentDate.getMonth()] + ' ' + 
                  currentDate.getDate() + ' ' + 
                  currentDate.getHours() + ':' + 
                  currentDate.getMinutes() + ':' + 
                  currentDate.getSeconds() + '-> ERROR : '; 
  var message = dateMessage + errorMessage;
  rawlog(dateMessage + errorMessage);
}


log('basicAuthMiddleware initialised')