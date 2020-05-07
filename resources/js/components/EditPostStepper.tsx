import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Create from './Create';
import MessageBox from './MessageBox';
import { Snackbar, IconButton, Collapse, Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import UploadImage from './UploadImage';
import EditPost from './EditPost';
import EditImage from './EditImage';
import EditTags from './EditTags';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
        width: '100%',
        padding: 0,
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    sb: {
        marginBottom: theme.spacing(10),
    },
    stepper:{
        margin: theme.spacing(0),
        padding: 0,
    }
  }),
);



export default function EditPostStepper(props:any) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [msgBox, setMsgBox] = React.useState(false);
    const steps = getSteps();

    const [postId, setPostId] = React.useState("");

    const [step1Clear, setStep1Clear] = React.useState(false);
    const [step2Clear, setStep2Clear] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(false);

    const [snackbarMsg, setSnackbarMsg] = React.useState("");

    function getSteps() {
        return ['Create a Post', 'Upload Images to Describe it', 'Done'];
      }

      function getStepContent(step: number, token:any) {
        switch (step) {
          case 0:
            return <EditPost token={token} postback={handleSave}></EditPost>;
          case 1:
            if(postId==""){
                return null;
            }else{
                return <EditImage token={token} postid={postId}></EditImage>
            }
          case 2:
            return <Typography component={'span'} variant="h5">You Are All Set!</Typography>;
          default:
            return <Typography component={'span'} variant="h5">Unknow Error</Typography>;
        }
      }

    const hanleSaveMsg = (step:number) =>{
        if(step==0){
            setSnackbar(true);
            setSnackbarMsg("Post Saved!");
        }
    }

    const closeMesBox = () =>{
        setMsgBox(false);
    }

    const handleSave = (id:string) =>{
        setPostId(id);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        hanleSaveMsg(0);
    }

    const handleNext = () => {
        if(postId){
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleFinish = () => {
        return window.location.href = "/";
    };

    const handleSnackbarClose = () => {
        setSnackbar(false);
    }

    return (
        <div className={classes.root}>
        <Snackbar
            className={classes.sb}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Post Saved!"
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        {msgBox?<MessageBox callback={closeMesBox} messageType="e" messageText="You must finish step one first."></MessageBox>:null}
            <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                    <Typography component={'span'} >{getStepContent(index, props.token)}</Typography>
                    <div className={classes.actionsContainer}>
                        <div>

                        {activeStep===1?<Button
                            onClick={handleNext}
                            className={classes.button}
                        >Next</Button>:null}

                        </div>
                    </div>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length -1 && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <EditTags PostId={Number(postId)} Token={props.token}></EditTags>
                  <Button onClick={handleFinish}
                  variant="contained"
                  color="primary"
                  className={classes.button}>
                      Return to Home Page
                  </Button>
                </Paper>
            )}
            </div>
    );
}
