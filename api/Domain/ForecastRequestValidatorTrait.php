<?php

trait ForecastRequestValidatorTrait
{
    /**
     * To validate request parameters
     */
    public function validate($request)
    {
        $options = [
            'studies' => [
                'options' => [
                    'min_range' => 1,
                    'max_range' => 1000000000000
                ]
            ],
            'monthly_increment' => [
                'options' => [
                    'min_range' => 0,
                    'max_range' => 300
                ]
            ],
            'forecasting_months' => [
                'options' => [
                    'min_range' => 1,
                    'max_range' => 120
                ]
            ]
        ];
        $errors = [];
        if (filter_var($request['studies'], FILTER_VALIDATE_INT, $options['studies']) != TRUE) {
            $errors['studies'] = 'Invalid value provided for studies per day! Allowed value range: 1 - 1000000000000';
        }
        if (filter_var($request['monthly_increment'], FILTER_VALIDATE_FLOAT, $options['monthly_increment']) != TRUE) {
            $errors['monthly_increment'] = 'Invalid value provided for monthly increment! Allowed value range: 0 - 300';
        }
        if (filter_var($request['forecasting_months'], FILTER_VALIDATE_INT, $options['forecasting_months']) != TRUE) {
            $errors['forecasting_months'] = 'Invalid value provided for forecasted months! Allowed value range: 1 - 120';
        }
        return $errors;
    }
}
