import React, { Component } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";

export default class LoadButton extends Component {
  render() {
    return (
      <div>
        {this.props.isButtonLoading ? (
          <div>
            <Grid>
              <Grid.Row>
                <Button
                  class={this.props.class}
                  className={this.props.className}
                  onClick={this.props.onClick}
                  icon={this.props.icon}
                  disabled
                  positive={this.props.positive}
                >
                  <Loader size="tiny" active inline />
                </Button>
              </Grid.Row>
            </Grid>
          </div>
        ) : (
          <Button
            className={this.props.className}
            onClick={this.props.onClick}
            icon={this.props.icon}
            positive={this.props.positive}
          >
            {this.props.content}
          </Button>
        )}
      </div>
    );
  }
}
