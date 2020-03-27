import React, { Component } from 'react'
import { Button, GridList, GridListTile, IconButton, withStyles, GridListTileBar, makeStyles, Theme, ButtonBase } from '@material-ui/core';
import axios from 'axios';
import MessageBox from './MessageBox';
import queryString from 'query-string'
import { Redirect, withRouter } from 'react-router-dom';


interface EditImageState{
    file:any;
    msgBox:boolean;
    imgList:string[];
    failedR:string;
    id:string|string[];
}
const styles = (theme:Theme) =>({
    root: {
        marginTop: theme.spacing(4),
      },
      imgListRoot:{
      },
      gridList: {
        transform: 'translateZ(0)',
        width:500,
        height:450,
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
});

class EditImage extends Component<any, EditImageState> {
    constructor(props:any){
        super(props);
        this.state = {
            file:null,
            msgBox:false,
            failedR:"",
            imgList:[],
            id:""
        }
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search);
        let id:string|string[] = "";
        if(values.id!=null){
            id = values.id;
            this.setState({id:id});
        }else{
            //MessageBox: Not Found Error Message
        }
        axios.get("/api/img/postid/"+id).then((response:any)=>{
            let imgNames: string[] = [];
            Object.keys(response.data).forEach(function(key){
                imgNames.push(response.data[key].filename);
            });
            this.setState({
                imgList:imgNames,
            });
        })
    }

    closeMsg = () =>{
        this.setState({
            msgBox:false,
        })
    }
    fileSelectHandler = (event:any) =>{
        let formdata = new FormData();
        formdata.append("photo", event.target.files[0]);
        formdata.append("postid", this.props.postid);
        axios({
            url: '/api/img/post_image',
            method: "POST",
            data: formdata
        }).then((response)=>{
            this.setState({
                imgList: [...this.state.imgList, response.data["filename"]]
            });
        }).catch((e:any)=>{
            this.setState({
                msgBox:true,
                failedR:e.response.data["message"],
            })
        });
    }
    renderImgList = (classes:any) =>{
        let imgs:any = [];
        this.state.imgList.map((tile, index) => {
            imgs.push(
                    <ButtonBase
                        focusRipple
                        key={index}

                        style={{
                            width: 100
                        }}
                    >
                    <div onClick={()=>this.rmImgHandler(tile)}>
                    <img height="100" width="100"  src={"/api/img/tn/post/"+tile} alt={tile} />
                    </div>
                    </ButtonBase>
                )
        });

        return (imgs);
    }

    rmImgHandler = (name:string) =>{
        axios.post("/api/img/post/rmimg", {
            token: this.props.token,
            name: name,
        }).then(response=>{
            let arr = this.state.imgList;
            arr.splice(this.state.imgList.indexOf(name), 1);
            this.setState({
                imgList:arr
            })
        }).catch(e=>{
            console.log("Error: Removing Image Failed");
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.state.msgBox?<MessageBox callback={this.closeMsg.bind(this)} messageType="e" messageText={"An error occurred while uploading the picture  "+this.state.failedR}></MessageBox>:null}
                <Button variant="contained" component="label">
                Upload Image
                    <input type="file" onChange={(e)=>this.fileSelectHandler(e)} style={{ display: "none" }} />
                </Button>
                <br></br>
                {this.renderImgList(classes)}
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(EditImage));
