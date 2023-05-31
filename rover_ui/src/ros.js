// Connecting to ROS
var ip_addresses = ["ws://localhost:9090", "ws://192.168.1.5:9090"]
var ip_idx = 0;

// Connecting to ROS
var ros = new ROSLIB.Ros({
  url : ip_addresses[ip_idx]
  });

function connectToROS(ip_address="ws://localhost:9090") {
  // Connecting to ROS
  var timeout = 2000;
  return new Promise(function(resolve, reject) {
      // Create WebSocket connection.
      ros.connect(ip_address);

      const timer = setTimeout(function() {
          reject(new Error("webSocket timeout"));
          done();
          ros.socket.close();
      }, timeout);

      function done() {
          // cleanup all state here
          clearTimeout(timer);
          ros.socket.removeEventListener('error', error);
      }

      function error(e) {
          reject(e);
          done();
      }

      ros.socket.addEventListener('open', function() {
          resolve(ros.socket);
          done();
      });
      ros.socket.addEventListener('error', error);
  });
}; 

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

