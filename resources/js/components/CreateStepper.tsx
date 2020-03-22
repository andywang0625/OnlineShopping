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
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8),
        width: '100%',
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
  }),
);



export default function VerticalLinearStepper(props:any) {
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
            return <Create token={token} postback={handleSave}></Create>;
          case 1:
            return <div>Upload Images</div>;
          case 2:
            return <Typography variant="h5">You Are All Set!</Typography>;
          default:
            return <Typography variant="h5">Unknow Error</Typography>;
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

    const handleSave = () =>{
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        hanleSaveMsg(0);
    }

    const handleNext = () => {
        if(activeStep==0){
            if(step1Clear){
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }else{
                setMsgBox(true);
            }
        }
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleFinish = () => {
        return window.location.href = "/";
    };

    const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    }

    return (
        <div className={classes.root}>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Note archived"
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        {msgBox?<MessageBox callback={closeMesBox} messageType="e" messageText="You must finish step one first."></MessageBox>:null}
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                    <Typography>{getStepContent(index, props.token)}</Typography>
                    <div className={classes.actionsContainer}>
                        <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>Your post has been posted</Typography>
                <Button onClick={handleFinish} className={classes.button}>
                    Return to Home Page
                </Button>
                </Paper>
            )}
            </div>
    );
}
