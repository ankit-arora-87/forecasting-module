import React from "react";

class ForecastListing extends React.Component {
  renderForecastListing = () => {
    const forecasted_cost = this.props.forecasted_data;
    if (Object.keys(forecasted_cost).length && forecasted_cost.length) {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center mx-auto">
            <thead>
              <tr key="heading_row">
                <th key="headling_col1" scope="col">
                  #
                </th>
                <th key="headling_col2" scope="col">
                  Month Year
                </th>
                <th key="headling_col3" scope="col">
                  Studies
                </th>
                <th key="headling_col4" scope="col">
                  Cost Forecasted
                </th>
              </tr>
            </thead>
            <tbody>
              {forecasted_cost.map((forecast, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td key={`index-${index}`}>{index + 1}</td>
                    <td key={`month_year-${index}`}> {forecast.month_year}</td>
                    <td key={`studies-${index}`}> {forecast.studies}</td>
                    <td key={`cost_forecasted-${index}`}>
                      {" "}
                      {forecast.cost_forecasted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };
  render() {
    return <div>{this.renderForecastListing()}</div>;
  }
}

export default ForecastListing;
