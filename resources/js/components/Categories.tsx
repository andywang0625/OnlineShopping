import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';

interface CategoriesState{
    cates:any[];
    selectedCates:any[];
    isFetching:boolean;
    isSearching:boolean;
}

class Categories extends Component<any, CategoriesState> {
    render() {
        const {classes} = this.props
        return (
            <Container className={classes.root}>
                asdf
            </Container>
        );
    }
}

export default withStyles({
    root:{
        marginBottom:"20px",
    },
})(withRouter(Categories));
