import React, { Component } from 'react'
import { Button } from '@material-ui/core';

export default class UploadImage extends Component {
    constructor(props:any){
        super(props);
    }
    fileSelectHandler = (event:any) =>{
        console.log(event);
    }
    render() {
        return (
            <div>
                <Button variant="contained" component="label">
                Upload Image
                    <input type="file" style={{ display: "none" }} />
                </Button>
            </div>
        )
    }
}
