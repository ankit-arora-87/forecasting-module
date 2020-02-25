<?php
include_once 'Domain/ForecastRequestValidatorTrait.php';

class ForecastData
{

    use ForecastRequestValidatorTrait;

    public function getForecastedData($request)
    {
        $errors = $this->validate($request);
        if (count($errors) > 0) {
            $result['errors'] = [$errors];
            return $result;
        } else {
            $studies = $request['studies'];
            $monthly_increment = $request['monthly_increment'];
            $forecasted_months = $request['forecasting_months'];
            /*
            RAM is one of the costlier components. 
            We only need to have enough RAM for one day of study. 
            1000 studies require 500 MB RAM. 
            1 study = 500/1000 MB per day
    
            The cost of 1GB of RAM per hour is 0.00553 USD
            1024  MB = 0.00553 (per hr)
            1024  MB = 0.00553 * 24 (per day)
            1  MB = (0.00553 * 24 )/ 1024 (per day)
    
            1 study cost of RAM per day = (RAM per day) * (cost of 1 MB RAM per day)
            1 study cost of RAM per day = (500/ 1000) * ((0.00553 * 24 )/ 1024)
            1 study cost of RAM per month = ((500/ 1000) * ((0.00553 * 24 )/ 1024)) * 30
    
            - Studies are kept indefinitely. 
            1 study use 10 MB of storage. 1 GB of storage cost 0.10 USD per month.
            1024 MB = 0.10 
            1 MB = 0.10/1024
            1 study cost of Storage per month =  (0.10/1024) * 10
    
            Other costs are considered to be negligible compared to the above and are not considered in
            this exercise. We do not consider the increase of cost within a month, for example, with a
            current number of study of 1000 and a growth of 3%, the new number of study is 1030 at the
            end of the month and the cost for that full month will be calculated with 1030 studies.
            */
            $result = [];
            $index = 0;
            while ($forecasted_months > 0) {
                $cost_of_ram_per_month = (((500 / 1000) * ((0.00553 * 24) / 1024)) * 30) * $studies;
                $cost_of_storage_per_month = ((0.10 / 1024) * 10) * $studies;
                $forecasted_cost = $cost_of_ram_per_month + $cost_of_storage_per_month;
                $result[$index]['month_year'] = date('M Y', strtotime('+' . ($index + 1) . ' month'));
                $result[$index]['studies'] = number_format($studies);
                $result[$index]['cost_forecasted'] = '$' . number_format($forecasted_cost, 2);
                $studies += ceil(($studies * $monthly_increment) / 100);
                $forecasted_months--;
                $index++;
            }
            return $result;
        }
    }
}
