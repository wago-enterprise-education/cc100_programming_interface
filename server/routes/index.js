var express = require('express');
const fs = require('fs');
var router = express.Router();
router.use(express.json());


// var test = require('/media/sd/public/test.json');
// const { response } = require('./express');

var calib_data;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/******* Setting the value of the digital output data, based on the wanted output: *******/

/* POST Digital_OUT 1 */
router.post('/api/v1/do/1', function(req, res, next){
  let curent_value = fs.readFileSync("/sys/kernel/dout_drv/DOUT_DATA");
  let curent_value_int = parseInt(curent_value);
  if ( curent_value_int == 0 || curent_value_int == 2 || curent_value_int == 4 || curent_value_int == 6 || curent_value_int == 8 || curent_value_int == 10 || curent_value_int == 12 || curent_value_int == 14 ){
    let new_value = (curent_value_int+1);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  } else {
    let new_value = (curent_value_int-1);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  }
  res.redirect('/');
})

/* POST Digital_OUT 2 */
router.post('/api/v1/do/2', function(req, res, next){
  let curent_value = fs.readFileSync("/sys/kernel/dout_drv/DOUT_DATA");
  let curent_value_int = parseInt(curent_value);
  if ( curent_value_int == 0 || curent_value_int == 1 || curent_value_int == 4 || curent_value_int == 5 || curent_value_int == 8 || curent_value_int == 9 || curent_value_int == 12 || curent_value_int == 13 ){
    let new_value = (curent_value_int+2);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  } else {
    let new_value = (curent_value_int-2);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  }
  res.redirect('/');
})

/* POST Digital_OUT 3 */
router.post('/api/v1/do/3', function(req, res, next){
  let curent_value = fs.readFileSync("/sys/kernel/dout_drv/DOUT_DATA");
  let curent_value_int = parseInt(curent_value);
  if ( curent_value_int < 4 || curent_value_int == 8 || curent_value_int == 9 || curent_value_int == 10 || curent_value_int == 11 ){
    let new_value = (curent_value_int+4);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  } else {
    let new_value = (curent_value_int-4);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  }
  res.redirect('/');
})

/* POST Digital_OUT 4 */
router.post('/api/v1/do/4', function(req, res, next){
  let curent_value = fs.readFileSync("/sys/kernel/dout_drv/DOUT_DATA");
  let curent_value_int = parseInt(curent_value);
  if ( curent_value_int < 8 ){
    let new_value = (curent_value_int+8);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  } else {
    let new_value = (curent_value_int-8);
    let new_value_string = new_value.toString();
    fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", new_value_string);
  }
  res.redirect('/');
})

/*** POST Switch all ditial outputs to false when returning to Homepage ***/
router.post('/api/v1/do/reload', function(req, res, next){
  fs.writeFileSync("/sys/kernel/dout_drv/DOUT_DATA", "0");
  res.redirect('/');
})

/*** GET Deliver current digital-in-data to the javascript-file ***/
router.get('/api/v1/di/value', function(req, res, next){
  let digital_in_value = fs.readFileSync("/sys/devices/platform/soc/44009000.spi/spi_master/spi0/spi0.0/din");
  console.log("digital_in_value");
  let digital_in_value_string = digital_in_value.toString();
  console.log(digital_in_value_string);
  var response = {value: digital_in_value_string};
  //var json_String = JSON.stringify(response).replace(/\n/g, "");
  res.json(response);
  //fs.writeFileSync("/media/sd/server/public/digital_in_value.json", digital_in_value_string);
  //res.redirect('/');
})

router.get('/api/v1/do/value', function(req, res, next){
  let digital_out_value = fs.readFileSync('/sys/kernel/dout_drv/DOUT_DATA');
  let digital_out_value_string = digital_out_value.toString();
  let response = {value: digital_out_value_string};
  console.log("Response: " + response);
  res.json(response);
})

router.get('/api/v1/ai/1', function(req, res, next){
  var voltage_ai1 = analogRead(1);
  res.json({ voltage: voltage_ai1 });
  
})

router.get('/api/v1/ai/2', function(req,res,next){
  var voltage_ai2 = analogRead(2);
  res.json({voltage: voltage_ai2});
})

router.get('/api/v1/PT/1', function(req,res,next){
  var temperature_calib_1 = tempRead(1);
  res.json({temperature: temperature_calib_1});
})

router.get('/api/v1/PT/2', function(req,res,next){
  var temperature_calib_2 = tempRead(2);
  res.json({temperature: temperature_calib_2});
})


/*** POST Analog Outputs*/
router.post('/api/v1/ao/1', (request,response) => {
  analogWrite(request.body.value, 1);
  response.json("Vielen Dank")
})

router.post('/api/v1/ao/2', (request, response) => {
  console.log(request.body.value);
  analogWrite(request.body.value, 2);
  response.json("Vielen Dank");
})


function analogWrite(value, output){
  console.log("Value:", value);
  if (value > 0  && value <10001){
    value = calibrateOut(value, output);
  }
  if (value < 0){
    value = 0;
  }
  console.log("Gerechneter Wert: ", value)

  fs.writeFileSync("/sys/bus/iio/devices/iio:device0/out_voltage1_powerdown", "0");
  fs.writeFileSync("/sys/bus/iio/devices/iio:device1/out_voltage2_powerdown", "0");

  if (output == 1){
    fs.writeFileSync("/sys/bus/iio/devices/iio:device0/out_voltage1_raw", value.toString());
  }

  if (output == 2){
    console.log("In Output 2")
    fs.writeFileSync("/sys/bus/iio/devices/iio:device1/out_voltage2_raw", value.toString());
  }

}

function analogRead(input){
  if (input == 1){
    var path = "/sys/bus/iio/devices/iio:device3/in_voltage3_raw";
  }
  if (input == 2){
    path = "/sys/bus/iio/devices/iio:device3/in_voltage0_raw";
  }
  const all_file = fs.readFileSync(path, "utf-8");
  voltage = calibrateIn(all_file, input);
  return voltage;
}

function tempRead(value){
  var path;

  if (value == 1){
    path = '/sys/bus/iio/devices/iio:device2/in_voltage13_raw'
  }
  else if (value == 2){
    path = '/sys/bus/iio/devices/iio:device2/in_voltage1_raw'
  }

  const value_uncalibrated = fs.readFileSync(path, "utf-8");
  var temperature = calibrateTemp(value_uncalibrated, value);
  return temperature;
}

function readCalibrationdata(){
  const allFileContents = fs.readFileSync('/etc/calib', 'utf-8');
  calib_data = allFileContents.split(/\r?\n/);
  console.log(calib_data);
}

function getCalibrationData(value){
  return calib_data[value].split(" ", 4);
}

function calibrateOut(voltage, output){
  readCalibrationdata();
  if (output == 1){
    cal_ao = getCalibrationData(5);
  }
  if (output == 2){
    cal_ao = getCalibrationData(6);
  }
  return calcCalibrate(voltage, cal_ao);
}

function calibrateIn(value, input){
  readCalibrationdata();
  if (input == 1){
    var cal_ai = getCalibrationData(3);
  }
  if (input == 2) {
    cal_ai = getCalibrationData(4);
  }
  return calcCalibrate(value, cal_ai);
}

function calibrateTemp(value, input){
  readCalibrationdata();
  var cal_temp;
  if (input == 1){
    cal_temp = getCalibrationData(1);
  }
  else if (input == 2){
    cal_temp = getCalibrationData(2);
  }

  return (calcCalibrate(value, cal_temp)-1000)/(3.91)
}

function getCalibrationData(value){
  return calib_data[value].split(' ', 4)
}


function calcCalibrate(val_uncal, calib){
    var x1=parseInt(calib[0]);
    var y1=parseInt(calib[1]);
    var x2=parseInt(calib[2]);
    var y2=parseInt(calib[3]);

    var val_cal=(y2-y1)*parseInt(val_uncal-x1);
    var val_cal=val_cal/(x2-x1);
    var val_cal=val_cal+y1;

    return parseInt(val_cal);
}
module.exports = router;
