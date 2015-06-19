
module.exports = function(RED){
  var https = require('https');

  function NaturalLanguageClassifier(config){
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {

    var credentials = JSON.parse(process.env.VCAP_SERVICES).natural_language_classifier[0].credentials;
    var uname = credentials.username;
    var pword = credentials.password;

    if (config.classifier_id == undefined){
      msg.payload = "Missing classifier_id.";
      node.send(msg);
      return;
    }

    if (uname == undefined || pword == undefined){
      msg.payload = "Missing VCAP SERVICES credentials.";
      node.send(msg);
      return;
    }

    var options = {
      host: 'gateway.watsonplatform.net',
      port: 443,
      method: 'POST',
      path: '/natural-language-classifier-experimental/api/v1/classifiers/'+config.classifier_id + '/classify',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
     }
    };

    var reqToWatson = https.request(options, function(resFromWatson){
      resFromWatson.setEncoding('utf8');
      var answer = "";
      resFromWatson.on('data', function(chunk){
          answer += chunk;
      });
      resFromWatson.on('end', function () {
         msg.payload = answer;
         node.send(msg);
      });
    });

    reqToWatson.on('error', function(e) {
      msg.payload = "Error contacting Watson NLC";
      node.send(msg);
    });

    reqToWatson.write(msg.payload);
    reqToWatson.end();

    });
  }

  RED.nodes.registerType("natural-language-classifier",NaturalLanguageClassifier);
};
