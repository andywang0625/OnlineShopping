import React, { Component } from 'react'
import axios from 'axios';
import { Paper, withStyles, createStyles, Theme, Chip } from '@material-ui/core';
import Loading from './Loading';

interface Props {
    PostId:number;
    Token:string;
    classes:any;
}
interface State {
    TagsAvaliable:any[];
    TagsSelected:any[];
    isFetching:boolean;
    isLoading:boolean;
}

class EditTags extends Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            TagsAvaliable:[],
            TagsSelected:[],
            isFetching:true,
            isLoading:false,
        }
    }

    componentDidMount(){
        axios({
            method:"get",
            url:"/api/tags",
        }).then((response)=>{
            this.setState({TagsAvaliable:response.data["tags"]});
            axios({
                method:"get",
                url:"/api/post/tags",
                params:{
                    id:this.props.PostId,
                }
            }).then((response)=>{
                response.data.tags.map((currentValue)=>{
                    this.setState({
                        TagsAvaliable: this.state.TagsAvaliable.filter((tag)=>currentValue.id!=tag.id),
                        TagsSelected: [...this.state.TagsSelected, currentValue],
                    });
                });
                this.setState({
                    isFetching:false,
                });
            });
        });
    }

    handleAddTag = (tagInfo:any) =>{
        this.setState({
            TagsAvaliable: this.state.TagsAvaliable.filter((tag)=>tagInfo.id!==tag.id),
            TagsSelected: [...this.state.TagsSelected, tagInfo],
        },()=>{
            this.setState({
                isLoading:true,
            });
            axios({
                method:"post",
                url:"/api/post/tags/add",
                data:{
                    id:this.props.PostId,
                    tag:tagInfo.id,
                    token:this.props.Token,
                }
            }).then((response)=>{
                if(response.data.error==null){
                    this.setState({
                        isLoading:false,
                    });
                }
            }).catch(e=>{
                console.log(e.response.data.error);
            });
        });
    }

    handleDelTag = (tagInfo:any) =>{
        this.setState({
            TagsSelected: this.state.TagsSelected.filter((tag)=>tagInfo.id!==tag.id),
            TagsAvaliable: [...this.state.TagsAvaliable, tagInfo],
        },()=>{
            this.setState({isLoading:true});
            axios({
                method:"post",
                url:"/api/post/tags/del",
                data:{
                    id:this.props.PostId,
                    tag:tagInfo.id,
                    token:this.props.Token,
                }
            }).then((response)=>{
                if(response.data.error==null)
                    this.setState({
                        isLoading:false,
                    });
            }).catch(e=>{
                console.log(e.response.data.error);
            });
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.state.isLoading&&this.state.isFetching?<Loading></Loading>:<>
                    {this.state.TagsAvaliable.length?<Paper>
                        <div className={classes.tagPaper}>
                            {this.state.TagsAvaliable.map((currentValue, index)=>{
                                return (
                                    <li key={currentValue.id}>
                                        <Chip
                                            label={currentValue.tag}
                                            onClick={(e)=>this.handleAddTag(currentValue)}
                                            className={classes.tag}
                                            color="primary"></Chip>
                                    </li>
                                );
                            })}
                        </div>
                    </Paper>:null}
                    {this.state.TagsSelected.length?<Paper>
                    <div className={classes.tagPaper}>
                        {this.state.TagsSelected.map((currentValue, index)=>{
                            return (
                                <li key={currentValue.id}>
                                    <Chip
                                        label={currentValue.tag}
                                        onDelete={(e)=>this.handleDelTag(currentValue)}
                                        className={classes.tag}
                                        color="secondary"></Chip>
                                </li>
                            );
                        })}
                    </div>
                    </Paper>:null}  
                </>}
            </div>
        )
    }
}
export default withStyles(({spacing}:Theme)=>createStyles({
    root:{
        width:"100%",
    },
    tag:{
        margin: spacing(1),
    },
    tagPaper:{
        display: 'flex',
        justifyContent:"center",
        flexWarp:"warp",
        padding: spacing(0.5),
        listStyle: 'none',
    },
}))(EditTags);