import React from "react";
import "./ForecastStudiesForm.css";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ForecastListing from "../List/ForecastListing";
import apiConfig from "../../../data/api_config.json";

class ForecastStudiesForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = apiConfig.api_base_url;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = props;
    this.state = {
      class_studies: "",
      class_monthly_increment: "",
      class_forecasting_months: "",
      studies: "",
      monthly_increment: "",
      forecasting_months: "",
      forecasted_cost: []
    };
    this.cancel = "";
    this.valid_studies = false;
    this.valid_monthly_increment = false;
    this.valid_foreasting_months = false;
  }
  /**
   * To handle form element changes
   * @param {*} event
   */
  handleInputChange(event) {
    event.preventDefault();
    event.persist();
    this.formElementValidator(event.target.name, event.target.value);
  }

  /**
   * To validate form elemnts & assign appropriate classes
   * @param {*} field_name
   * @param {*} field_value
   */
  formElementValidator(field_name, field_value) {
    if (field_name === "studies") {
      var s_pattern = new RegExp(/^\d+$/);
      if (!s_pattern.test(field_value)) {
        this.valid_studies = false;
        this.setState({
          [`class_` + field_name]: "is-invalid"
        });
      } else {
        if (field_value >= 1 && field_value <= 1000000000000) {
          this.valid_studies = true;
          this.setState({
            [`class_` + field_name]: "is-valid"
          });
        } else {
          this.valid_studies = false;
          this.setState({
            [`class_` + field_name]: "is-invalid"
          });
        }
      }
    }
    if (field_name === "monthly_increment") {
      var mi_pattern = new RegExp(/^[0-9]*[.]?\d{1,3}]?$/);
      if (!mi_pattern.test(field_value)) {
        this.valid_monthly_increment = false;
        this.setState({
          [`class_` + field_name]: "is-invalid"
        });
      } else {
        if (field_value >= 0 && field_value <= 300) {
          this.valid_monthly_increment = true;
          this.setState({
            [`class_` + field_name]: "is-valid"
          });
        } else {
          this.valid_monthly_increment = false;
          this.setState({
            [`class_` + field_name]: "is-invalid"
          });
        }
      }
    }
    if (field_name === "forecasting_months") {
      var fm_pattern = new RegExp(/^\d+$/);
      if (!fm_pattern.test(field_value)) {
        this.valid_foreasting_months = false;
        this.setState({
          [`class_` + field_name]: "is-invalid"
        });
      } else {
        if (field_value >= 1 && field_value <= 120) {
          this.valid_foreasting_months = true;
          this.setState({
            [`class_` + field_name]: "is-valid"
          });
        } else {
          this.valid_foreasting_months = false;
          this.setState({
            [`class_` + field_name]: "is-invalid"
          });
        }
      }
    }
  }
  /**
   * to handle form submission
   * @param {*} event
   */

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.valid_studies &&
      this.valid_monthly_increment &&
      this.valid_foreasting_months
    ) {
      const url = this.api;
      if (this.cancel) {
        this.cancel.cancel();
      }
      this.cancel = axios.CancelToken.source();
      axios
        .get(url, {
          params: {
            studies: event.target.elements.studies.value,
            monthly_increment: event.target.elements.monthly_increment.value,
            forecasting_months: event.target.elements.forecasting_months.value
          },
          cancelToken: this.cancel.token
        })
        .then(response => {
          this.setState({
            forecasted_cost: response.data
          });
        })
        .catch(function(error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error.message);
          }
        });
    } else {
      alert("Invalid form values! Please fix form values.");
    }
  }

  render() {
    return (
      <div>
        <Form className="container" onSubmit={this.handleSubmit}>
          <h3>Forecasting Module</h3>
          <Form.Group controlId="formStudiesPerDay" className="row">
            <Form.Label className="col-md-3">Studies Per Day</Form.Label>
            <Form.Control
              className={`col-md-9 ${this.state.class_studies}`}
              type="text"
              name="studies"
              placeholder="Please provide studies per day. Allowed values range: 1 - 1000000000000"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formMonthlyIncrement" className="row">
            <Form.Label className="col-md-3">Monthly Increment</Form.Label>
            <Form.Control
              className={`col-md-9 ${this.state.class_monthly_increment}`}
              type="text"
              name="monthly_increment"
              placeholder="Please provide monthly increment. Allowed values range: 0 - 300"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formForecastingMonths" className="row">
            <Form.Label className="col-md-3">Forecasting Months</Form.Label>
            <Form.Control
              className={`col-md-9 ${this.state.class_forecasting_months}`}
              type="text"
              name="forecasting_months"
              placeholder="Please provide forecasting months. Allowed values range: 1 - 120"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button className="row readonly" variant="primary" type="submit">
            Submit
          </Button>{" "}
        </Form>
        <ForecastListing forecasted_data={this.state.forecasted_cost} />
      </div>
    );
  }
}

export default ForecastStudiesForm;
