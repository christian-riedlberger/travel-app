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
import Header from '../components/Header'
import Weather from '../components/Weather'
import "../App.css";
import {
    fetchCities,
    fetchForecast
} from '../actions/ActionTravel';

type Props = {
    classes: Object
};

type State = {
    location: string,
    error: string,
    description: string,
    image: string,
    cities: Array<Object>,
    forecasts: Array<Object>
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
 * Main app for project
 */
class App extends PureComponent<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            location: '', 
            forecasts: [],
            description: '',
            image: '',
            cities: [],
            error: ''
         };
    }


    
    /**
     * Changes description and image when city is selected
     * @param event 
     */
    handleChange = (e) => {
        const location = {
            id: e.currentTarget.id,
            name: e.target.value,
        };

        fetchForecast(location)
        .then(res => {
            if (res.data.error) {
                this.setState({ 
                    error: res.data.error 
                })
            }
            else {
                console.log(res.data.city)
                this.setState({
                    location: location.name, 
                    forecasts: res.data.forecast,
                    description: res.data.city.description,
                    image: res.data.city.image 
                })
            }
          
        })
        .catch(error => {
            this.setState({ error })
        })

    }

    /**
     * Fetches all ciities to fill drodown select
     */
    componentDidMount() {
       fetchCities()
       .then(res => {
            if (res.data.error) {
                this.setState({ 
                    error: res.data.error
                })
            }
            else {
                this.setState({ 
                    cities: res.data.cities
                })
            }
        })
        .catch(error => {
            this.setState({ error })
        })
    }


    /**
     * Renders component
     */
    render() {
        const { classes } = this.props;

        const imageSource = 'img/' + this.state.image;

        return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className="App">
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Location</InputLabel>
                                <Select className={classes.selectBox}
                                    data-cy='selectCity'
                                    labelId="select-label"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.location}
                                >
                                {_.map(this.state.cities, option => (
                                    <MenuItem
                                        data-cy={option.label}
                                        key={option.id}
                                        id={option.id}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </MenuItem>
                                 ))}
                                </Select>
                            </FormControl>    
                        </div> 
                        <Grid container 
                            spacing={3} 
                            justify="center"
                            alignItems="center"
                        >
                            {this.state.description &&
                                <div>
                                    <img src={imageSource} alt=""/>
                                     <Grid 
                                        item xs={10}
                                        data-cy="description"
                                    >
                                        <Paper className={classes.paper}>{this.state.description}</Paper>
                                    </Grid>
                                </div>
                            }    
                        </Grid>
                        <Weather 
                            forecasts={this.state.forecasts}
                            description={this.state.description}
                        />
 
                    </div>
                </div>                        
        );
    }
}

export default withStyles(styles)(App);
