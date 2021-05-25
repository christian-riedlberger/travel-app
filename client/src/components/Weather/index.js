// @flow
import _ from 'lodash';
import React, { PureComponent } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import configTable from './config/configTable';
// import "../App.css";

type Props = {
    forecasts: Array<Object>,
    description: String,
    classes: Object
};

type State = {
    count: number,
    error: string,
    forecast: string
};

const styles = {
    formControl: {
      margin: '1em',
      minWidth: 120,
    },
    selectBox: {
      textAlign: 'center' 
    },
    paper: {
        padding: '2em',
        textAlign: 'center',
        color: 'grey'
    },
};

/**
 * Displays weather forecast
 */
class Weather extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 1,
            error: '',
            forecast: 'One Day'
         };
    }
   
    /**
     * Called whenever forecast days are changed
     * @param event
     */
    handleChange = (e) => {
        this.setState({
            forecast: e.target.value,
            count:  e.currentTarget.id
        })
    }

    /**
     * Renders component
     */
    render() {
        const { classes, forecasts, description } = this.props;

        let filteredForecast = [];
        if (forecasts) {
            filteredForecast = forecasts.filter((forecast, i) => {
                return i < this.state.count;
            });
        }    

        return (
            <div>
                <div className="App">
                    <div>
                        {description &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Forecast</InputLabel>
                                <Select className={classes.selectBox}
                                    data-cy='selectForecast'
                                    labelId="select-label"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    defaultValue='Forecast'
                                    value={this.state.forecast}
                                >
                                {_.map(configTable.menu, option => (
                                    <MenuItem
                                        data-cy={option.description}
                                        id={option.id}
                                        value={option.description}
                                    >
                                        {option.description}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>  
                        }  
                    </div> 
                    <Grid container 
                        spacing={1} 
                        justify="center"
                        alignItems="center"
                        >
                        {_.map(filteredForecast, (forecast, index) => (
                            <Grid item xs={2} data-cy={'forecast' + index}>
                                <Paper className={classes.paper}>
                                    <div>{forecast.dayOfWeek}</div>
                                    <div>{forecast.date}</div>
                                    <img src={forecast.condition.icon} alt=""/>
                                    <div>
                                        <div>{forecast.condition.text}</div>
                                        <div>{forecast.maxTemp}</div>
                                        <div>{forecast.minTemp}</div>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}     
                    </Grid>     
                </div>
            </div>                        
        );
    }
}

export default withStyles(styles)(Weather);