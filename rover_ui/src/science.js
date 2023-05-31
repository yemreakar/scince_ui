    var slider1 = document.getElementById("lowerHue");
    var output1 = document.getElementById("demo1");
    var slider2 = document.getElementById("upperHue");
    var output2 = document.getElementById("demo2");

    var slider3 = document.getElementById("lowerSaturation");
    var output3 = document.getElementById("demo3");
    var slider4 = document.getElementById("upperSaturation");
    var output4 = document.getElementById("demo4");

    var slider5 = document.getElementById("lowerValue");
    var output5 = document.getElementById("demo5");
    var slider6 = document.getElementById("upperValue");
    var output6 = document.getElementById("demo6");

    output1.innerHTML = slider1.value; // Display the default slider value
    output2.innerHTML = slider2.value;
    output3.innerHTML = slider3.value;
    output4.innerHTML = slider4.value;
    output5.innerHTML = slider5.value;
    output6.innerHTML = slider6.value;
    
    var publisher = new ROSLIB.Topic({
        ros : ros,
        name : '/threshold_limits',
        messageType: "std_msgs/Int64MultiArray"
    });

    var limits = [parseInt(slider1.value), parseInt(slider2.value), parseInt(slider3.value), 
                 parseInt(slider4.value), parseInt(slider5.value), parseInt(slider6.value)];

    // Update the current slider value (each time you drag the slider handle)
    //Slider 1
    slider1.oninput = function() {
    output1.innerHTML = this.value;
    limits[0] = parseInt(this.value);
    console.log(output1.innerHTML)
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    } 
    
    //Slider 2
    slider2.oninput = function() {
    output2.innerHTML = this.value;
    limits[1] = parseInt(this.value);
    
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    }

    //Slider 3
    slider3.oninput = function() {
    output3.innerHTML = this.value;
    limits[2] = parseInt(this.value);
    
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    }   

    //Slider 4
    slider4.oninput = function() {
    output4.innerHTML = this.value;
    limits[3] = parseInt(this.value);
    
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    }     

    //Slider 5
    slider5.oninput = function() {
    output5.innerHTML = this.value;
    limits[4] = parseInt(this.value);
    
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    }     

    //Slider 6
    slider6.oninput = function() {
    output6.innerHTML = this.value;
    limits[5] = parseInt(this.value);
    
    var threshold_values = new ROSLIB.Message({
        data : limits
    });
    publisher.publish(threshold_values);
    }     