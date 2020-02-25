<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include ForeCastData class
include_once 'Domain/ForecastData.php';

// initialize object
$forecast_data =  new ForecastData(1, 2, 3);
// fetch forecasted data
$forecasted_data = $forecast_data->getForecastedData($_REQUEST);

// check if more than 0 record found
if (count($forecasted_data) > 0) {
    if (key_exists('errors', $forecasted_data)) {
        // set response code - 422 Unprocessable Entity
        http_response_code(422);
    } else {
        // set response code - 200 OK
        http_response_code(200);
    }
    // show forecasted data in json format
    echo json_encode($forecasted_data);
} else {
    // set response code - 404 Not found
    http_response_code(404);
    // tell the user no forecasted data found
    echo json_encode(
        array("message" => "No forecasted data found.")
    );
}
