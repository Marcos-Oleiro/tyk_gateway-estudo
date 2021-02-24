var bearerResponseAuthMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

bearerResponseAuthMiddleware.NewProcessRequest(function(request, response, session, metadata, spec){

  log('Requisição recebida: ' + JSON.stringify(request));
  log("")
  log("")
  log('Response recebida: ' + JSON.stringify(response));

  return bearerResponseAuthMiddleware.ReturnData(response);
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


log('bearerAuthMiddleware initialised')