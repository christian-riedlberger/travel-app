// @flow
import _ from 'lodash';
import React, { PureComponent } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
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
    root: {
        flexGrow: 1
    },
    page: {
        width: 500,
        background: '#FFF',
        borderRadius: '25px',
        margin: '0 auto'
    },
    card: {
        display: 'flex', 
        alignContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto'
    },
    form: {
        boxSizing: 'border-box',
        padding: '1.5em',
    },
    label: {
        fontSize: '1.25em',
        color: '#636363',
        paddingBottom: '0.5em',
        display: 'inline-block',
        fontWeight: 400
    },
    cityWrapper: {
        boxSizing: 'border-box',
        marginBottom: '2em'
    },
    cityDetails: {
        '& img': {
            width: '580px',
            borderRadius: '20px',
            boxShadow: '0px 0px 3px #a5cff1'
        },
        '& p': {
            margin: '0.5em 3em 0em 3em',
            borderBottom: '1px solid #d0d1d2',
            paddingBottom: '2em'
        }
    },
    formControl: {
      margin: '1em',
      minWidth: 200,

      '& .MuiInputLabel-formControl': {
        top: '-11px',
        left: '11px'
      },
      '& .MuiInputLabel-shrink': {
        top: '13px',
        left: '7px'
      }
    },
    selectBox: {
      textAlign: 'center' 
    }
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
     * Render city selector
     * @returns 
     */
    renderCitySelector = () => {
        const { classes } = this.props;

        return (
            <div className={classes.form}>
                <label className={classes.label}>Select a city you would like to travel to:</label>
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
        );
    }

    /**
     *  Render city details and image
     */
    renderCityDetails = () => {
        const { classes } = this.props;
        const imageSource = 'img/' + this.state.image;

        return (
            <div className={classes.cityDetails}>
                <img src={imageSource} alt=""/>   

                <h3>Description</h3> 
                <p>{this.state.description}</p>
            </div>
        );
    }

    /**
     * Render weather component
     * @returns 
     */
    renderWeather = () => {
        const { forecasts, description } = this.state;
        
        return (
            <Weather 
                forecasts={forecasts}
                description={description}
            />
        );
    }

    /**
     * Renders component
     */
    render() {
        const { classes } = this.props;
        const { description } = this.state;
 
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="App">
                            {/* White Page  */}
                            <div className={classes.page}>

                                {/* Travel card  */}
                                <div className={classes.card}>
                                    
                                    {/* City form  */}
                                    <div>
                                        {this.renderCitySelector()}
                                    </div>

                                    {/* City details  */}
                                    {description && (
                                        <div className={classes.cityWrapper}>
                                            {this.renderCityDetails()}
                                            {this.renderWeather()}
                                        </div>
                                    )}
                                </div>    
                            </div>
                        </div> 
                    </Grid>   
                </Grid>     
            </div>           
        );
    }
}

export default withStyles(styles)(App);
