import * as React from 'react';
import { CircularProgress, Theme, Grid, Typography, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import 'typeface-roboto';

const useStyles = makeStyles((theme: Theme) =>createStyles({
    loading:{
        textAlign: "center",
        paddingTop: theme.spacing(5),
    },
    typography:{
        fontFamily:[
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    }
}));

export default function Loading(props:any){
    const classes = useStyles();
    return (
        <div className={classes.loading}>
            <CircularProgress />
            <Typography className={classes.typography}>Loading</Typography>
        </div>
    );
}
