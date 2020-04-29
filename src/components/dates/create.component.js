import React, {  Fragment, useState,useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory} from 'react-router-dom'

import Select from 'react-select';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  FormHelperText,
  Card,
  Button,
  Typography,
  TextField,
  Slider,
  Tooltip,

  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
} from '@material-ui/core';

import {
  AddBox,

  GroupAdd,
  ContactMail,

  Save,
} from '@material-ui/icons';

import trLocale from "date-fns/locale/tr";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import { TimePicker, KeyboardTimePicker } from "@material-ui/pickers";


import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import 'moment/locale/tr'  




import '../../assets/css/style.css';

export default function DatesCreate() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const dataSwiftInterval = [
    {label: "01:00",value: "0100" },
    {label: "02:00",value: "0200" },
    {label: "03:00",value: "0300" },
    {label: "04:00",value: "0400" },
    {label: "06:00",value: "0600" },
    {label: "07:00",value: "0700" },
    {label: "08:00",value: "0800" },
    {label: "12:00",value: "1200" },
    {label: "24:00",value: "2400" }

  ]

  const dataSwiftStart = [
    {label: "01:00",value: "0100" },
    {label: "02:00",value: "0200" },
    {label: "03:00",value: "0300" },
    {label: "04:00",value: "0400" },
    {label: "05:00",value: "0500" },
    {label: "06:00",value: "0600" },
    {label: "07:00",value: "0700" },
    {label: "08:00",value: "0800" },
    {label: "09:00",value: "0900" },
    {label: "10:00",value: "1000" },
    {label: "11:00",value: "1100" },
    {label: "12:00",value: "1200" },
    {label: "13:00",value: "1300" },
    {label: "14:00",value: "1400" },
    {label: "15:00",value: "1500" },
    {label: "16:00",value: "1600" },
    {label: "17:00",value: "1700" },
    {label: "18:00",value: "1800" },
    {label: "19:00",value: "1900" },
    {label: "20:00",value: "2000" },
    {label: "21:00",value: "2100" },
    {label: "22:00",value: "2200" },
    {label: "23:00",value: "2300" },
    {label: "00:00",value: "0000" },

  ]


  const [times, seTtimes]= useState({})

  const [state, seTstate] = useState({
      shiftInterval : "",
      shiftStart    : "",
   });

  const cretateDate = (e) =>{
    e.preventDefault();


    let m = Moment("2020.01.01")

    m.add(0, 'h')
    console.log( Moment(m).format("LT"))
    console.log(Moment(state.shiftStart, "hmm").format("HH:mm"))
    console.log(Moment(state.shiftInterval, "hmm").format("HH:mm"))

    let timesDay = {}
    
    for (let i = 0; i < 3; i++) {
      
    }

  }


// componentDidMount = useEffect
  useEffect(() => {
    Moment.locale('tr')
   }, []);

     const onSubmit = (e) => {
        e.preventDefault();
         
      }
      
      return (

          <div className="containerP">
            <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
              <Grid item container spacing={3}>
                <Grid item container md={9} className="panelGridRelative">
                  <Card className="panelLargeIcon">
                    <GroupAdd fontSize="large" />
                  </Card>
                  <Card className="listViewPaper">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="typography">
                      {t('Saatleri Belirleme')}
                    </Typography>
                    <Grid item container sm={12}>
                      <Grid container item sm={6} spacing={0}>
                        <FormGroup className="FormGroup">
                          <FormControl>
                          <Select
                              required
                              placeholder={t('Nöbet Aralığı Seçiniz')}
                              value={state.Swiftstart}
                              options={dataSwiftStart}
                              onChange={(selectedOption) => { console.log(selectedOption.value); seTstate({...state, shiftStart:selectedOption.value }) }}
                            />
                              
                            <FormHelperText>Nöbet yazılmaya hangi saatte başlanacak? örn: 00:00</FormHelperText>
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid container item sm={4} spacing={0}>
                        <FormGroup className="FormGroup">
                        <FormControl style={{zIndex:12}}>

                        <Select
                              required
                              placeholder={t('Nöbet Aralığı Seçiniz')}
                              options={dataSwiftInterval}
                              onChange={(selectedOption) => { seTstate({...state, shiftInterval:selectedOption.value }) }}
                            />
 
                            <FormHelperText> Tek seferde kaç saat nöbet tutulacak? </FormHelperText>
                          </FormControl>
                        
                          <button onClick={cretateDate}>Saatleri Oluştur.</button>

                        </FormGroup>
                      </Grid>
                      <Grid container item sm={12} spacing={0}>
                        <b>Saatler</b>
                        {JSON.stringify(times)}  
                      </Grid>
                       
                   </Grid>
                  </Card>
                  <div className="saveButtonPlace">
                    <Button type="submit" className="glow-on-hover">
                      <Save fontSize="small" style={{ marginRight: '15px' }} />
                      {' '}
                      {t('save')}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ValidatorForm> 
          </div>
        );
      }

