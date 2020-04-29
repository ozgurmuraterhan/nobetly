import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory} from 'react-router-dom'

import Select from 'react-select';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import cities from "../cities/cities.json"

import {
  FormControlLabel,
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
  Checkbox ,
  DialogContentText
} from '@material-ui/core';

import {
  AddBox,
  Delete,
  GroupAdd,
  ContactMail,

  Save,
} from '@material-ui/icons';

import trLocale from "date-fns/locale/tr";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';

import '../../assets/css/style.css';

export default function PostCreate(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [gropBoxOpen, seTgropBoxOpen] = useState(false);
  const [changeNewGroupNameJust, seTchangeNewGroupNameJust] = useState('');
  const [findpostGroup,seTfindpostGroup] = useState([]);

  const [openalert, seTopenalert] = useState(false);

  const [state, seTstate] = useState({
    selectedGroupItems:[],
    name:'',
    phone:'',
    risk:20,
    due_note:'',
  });

  const [monday,seTmonday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })

  const [tuesday,seTtuesday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })

  const [wednesday,seTwednesday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })

  const [thursday,seTthursday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })


  const [friday,seTfriday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })

  const [saturday,seTsaturday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })


  const [sunday,seTsunday] = useState({
    n00: true,
    n02: true, 
    n04: true, 
    n06: true, 
    n08: true, 
    n10: true, 
    n12: true, 
    n14: true, 
    n16: true, 
    n18: true, 
    n20: true, 
    n22: true, 
  })



  // default adress func
 const handleChangeState = (selectedOption) => {
    console.log(selectedOption);

      seTstate({
        ...state,
        selectedDefaultState: [{ label: selectedOption.label, value: selectedOption.label }]
      })
  };
  // default adress func end


 
 
// open new post group dialog save
const saveHandleNewGroup = () => {
  const data = {
    name: changeNewGroupNameJust,
  };
console.log(data)
  axios.post('http://localhost:5000/postgroups/add', data)
    .then((res) => {
      if (res.data.variant == 'error') {
        enqueueSnackbar(t('Nöbet Kategorisi Eklenemedi') + res.data.messagge, { variant: res.data.variant });
      } else {
       enqueueSnackbar(t('Nöbet Kategorisi Eklendi'), { variant: res.data.variant });
      }

      getpostGroup();
    })
    .catch((err) => console.log(err));

  seTgropBoxOpen(false) 
};

  // end open new post group dialog save



  function getpostGroup() {
    axios.get('http://localhost:5000/postgroups/')
      .then((res) => {
        if (res.data.length > 0) {
          const details = [];
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
            seTfindpostGroup( details)
        }
      })
      .catch((err) => console.log(err));
  }

  function getPost() {
    axios.get(`http://localhost:5000/post/${props.match.params.id}`)
      .then((res) => {
      console.log(res.data)

      const details = [];
        for (const i in res.data.group_id) {
          details.push({
            label: (res.data.group_id[i].label),
            value: (res.data.group_id[i].value),
          });
        }

        seTmonday(res.data.times.monday)
        seTtuesday(res.data.times.tuesday)
        seTwednesday(res.data.times.wednesday)
        seTthursday(res.data.times.thursday)
        seTfriday(res.data.times.friday)
        seTsaturday(res.data.times.saturday)
        seTsunday(res.data.times.sunday)
        seTstate({...state, 
          name:res.data.name,
          phone:res.data.phone,
          due_note:res.data.due_note,
          selectedGroupItems:details,
          _id:res.data._id

        })
    })
      .catch((err) => console.log(err));

  }

  const  deleteData = (id) => {

    axios.delete(`http://localhost:5000/post/${id}`)
      .then((res) => {
        history.push('/postlist');
        enqueueSnackbar(t('Nöbet Yeri Silindi'), { variant: res.data.variant });
      });
  }

// componentDidMount = useEffect
  useEffect(() => {
    getpostGroup();
    getPost()
  }, []);

     const onSubmit = (e) => {
        e.preventDefault();
        const post = {
          name:     state.name,
          email:    state.email,
          group_id: state.selectedGroupItems,
          ssn:      state.ssn,
          phone:    state.phone,
          due_note: state.due_note,
          risk:     state.risk,
          times:{
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
          }
        };

        console.log(post)
       
        axios.post(`http://localhost:5000/post/${props.match.params.id}`, post)
          .then((res) => {
            if (res.data.variant == 'error') {
               enqueueSnackbar(t('Nöbet Yeri Güncellendi') + res.data.messagge, { variant: res.data.variant });
            } else {
              enqueueSnackbar(t('Nöbet Yeri Güncellendi'), { variant: res.data.variant });
              // navigate
              history.push('/postlist');
            }
          });
      }
      
      return (

          <div className="containerP">
            <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
              <Grid item container spacing={3}>
                <Grid item container md={12} className="panelGridRelative">
                  <Card className="panelLargeIcon">
                    <GroupAdd fontSize="large" />
                  </Card>
                  <Card className="listViewPaper">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="typography">
                      {t('Nöbet Yeri Düzenle')}

                      <Tooltip title={t('deleteCustomer')}>
                      <Button variant="outlined" color="primary" style={{ float: 'right', marginRight: '115px' }} onClick={() => {seTopenalert(true) }}>
                        <Delete />
                      </Button>
                    </Tooltip>

                    <Dialog open={openalert} onClose={() => {seTopenalert(false) }}>
                      <DialogTitle>{t('SİL')}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          {t('Gerçekten Silmek İstiyor musunuz?')}
                          <br />
                          {t(' Silerseniz, bu verilere bir daha erişemezsiniz.')}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => { seTopenalert(false) }} color="primary">
                          {' '}
                          {t('cancel')}
                          {' '}
                        </Button>
                        <Button onClick={() => {deleteData(state._id); }} color="primary" autoFocus>
                          {t('delete')}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Typography>
                    <Grid item container sm={12}>
                      <Grid container item sm={4} spacing={0}>
                        <FormGroup className="FormGroup">
                          <FormControl>
                            <TextValidator
                              label={t('Adı')}
                              value={state.name}
                              onChange={(e) => { seTstate({...state, name:e.target.value}) }}
                              required
                            />
                            <FormHelperText>{t('Nöbet Yeri adı yazılmalı')}</FormHelperText>
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid container item sm={4} spacing={0}>
                        <FormGroup className="FormGroup">
                          <FormControl>
                            <TextValidator
                              label={t('Dahili Numarası')}
                              value={state.phone}
                              onChange={(e) => {seTstate({...state, phone: e.target.value }) }}
                              validators={['isNumber']}
                              errorMessages={[t('Rakamlardan oluşmalı')]}
                            />
                            <FormHelperText>{t('youNeedaPhone')}</FormHelperText>
                          </FormControl>
                        </FormGroup>
                      </Grid>
                      <Grid container item sm={4} spacing={0}>
                        <Grid container item sm={1} spacing={0}>
                          <Tooltip title={t('Kategori ekle')}>
                            <AddBox onClick={() => { seTgropBoxOpen(true)  }} fontSize="large" style={{ margin: '25px 10px 0 5px' }} />
                          </Tooltip>
                        </Grid>
                        <Grid container item sm={11} spacing={0}>
                          <FormGroup className="FormGroup">
                            <InputLabel htmlFor="group_id" className="InputLabel" style={{ margin: '5px' }}> </InputLabel>
                            <FormControl style={{zIndex:12}}>
                              <Select
                                required
                                isMulti
                                styles={{
                                  singleValue: (base) => ({ ...base, color: 'white' }),
                                  control: (base) => ({
                                    ...base,
                                    color: 'white',
                                    width: '100%',
                                    border: 0,
                                    borderBottom: '1px solid #949494',
                                    borderRadius: 0,
                                  }),
                                }}
                                placeholder={t('Nöber Yeri kategorisi')}
                                value={state.selectedGroupItems}
                                options={findpostGroup}
                                onChange={(selectedOption) => { seTstate({...state, selectedGroupItems:selectedOption }) }}
                              />
                            </FormControl>
                          </FormGroup>
                        </Grid>
                      </Grid>                  
                      <Grid container item sm={12} spacing={0}>
                        <FormGroup className="FormGroup">
                          <FormControl>
                            <TextValidator
                              multiline
                              label={t('Düşünceler')}
                              margin="dense"
                              value={state.due_note}
                              onChange={(e) => {seTstate({...state,due_note:e.target.value}) }}
                            />
                            <FormHelperText>{t('Asker hakkında  düşünceleriniz')}</FormHelperText>
                          </FormControl>
                        </FormGroup>
                      </Grid>

                      <Grid container item sm={12}>
                        <FormGroup className="FormGroup" style={{ margin: '50px' }}>
                          <InputLabel htmlFor="risk" className="InputLabel">{t('Nöbet Risk Durumu')}</InputLabel>
                          <FormControl>
                            <Slider
                              color="secondary"
                              defaultValue={state.risk}
                              onChangeCommitted={(e, val) => { e.preventDefault(); seTstate({...state, risk:val }) }}
                              passive={0}
                              valueLabelDisplay="on"
                              step={5}
                              min={0}
                              max={100}
                            />
                            <FormHelperText>{t('Nöbet Risk Durumunu seçiniz')}</FormHelperText>
                          </FormControl>
                        </FormGroup>
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

              <Grid container item sm={12}>
                        <FormGroup className="FormGroup"  >
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                      {t('Nöbet Yerinin Açık Olduğu Saatleri Seçiniz')}
                    </Typography>
                          
                    <FormControl>
                        <table className="table">
                        <tbody><tr>
                          
                        <td><table><tbody><tr><td> <b>
                            Pazartesi
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n00}
                                          onChange={(e, val) => { seTmonday({...monday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n02}
                                          onChange={(e, val) => { seTmonday({...monday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n04}
                                          onChange={(e, val) => { seTmonday({...monday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n06}
                                          onChange={(e, val) => { seTmonday({...monday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n08}
                                          onChange={(e, val) => { seTmonday({...monday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n10}
                                          onChange={(e, val) => { seTmonday({...monday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n12}
                                          onChange={(e, val) => { seTmonday({...monday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n14}
                                          onChange={(e, val) => { seTmonday({...monday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n16}
                                          onChange={(e, val) => { seTmonday({...monday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n18}
                                          onChange={(e, val) => { seTmonday({...monday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n20}
                                          onChange={(e, val) => { seTmonday({...monday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={monday.n22}
                                          onChange={(e, val) => { seTmonday({...monday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Salı
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n00}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n02}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n04}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n06}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n08}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n10}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n12}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n14}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n16}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n18}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n20}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={tuesday.n22}
                                          onChange={(e, val) => { seTtuesday({...tuesday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Çarşamba
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n00}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n02}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n04}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n06}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n08}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n10}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n12}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n14}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n16}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n18}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n20}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={wednesday.n22}
                                          onChange={(e, val) => { seTwednesday({...wednesday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Perşembe
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n00}
                                          onChange={(e, val) => { seTthursday({...thursday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n02}
                                          onChange={(e, val) => { seTthursday({...thursday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n04}
                                          onChange={(e, val) => { seTthursday({...thursday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n06}
                                          onChange={(e, val) => { seTthursday({...thursday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n08}
                                          onChange={(e, val) => { seTthursday({...thursday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n10}
                                          onChange={(e, val) => { seTthursday({...thursday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n12}
                                          onChange={(e, val) => { seTthursday({...thursday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n14}
                                          onChange={(e, val) => { seTthursday({...thursday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n16}
                                          onChange={(e, val) => { seTthursday({...thursday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n18}
                                          onChange={(e, val) => { seTthursday({...thursday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n20}
                                          onChange={(e, val) => { seTthursday({...thursday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={thursday.n22}
                                          onChange={(e, val) => { seTthursday({...thursday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Cuma
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n00}
                                          onChange={(e, val) => { seTfriday({...friday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n02}
                                          onChange={(e, val) => { seTfriday({...friday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n04}
                                          onChange={(e, val) => { seTfriday({...friday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n06}
                                          onChange={(e, val) => { seTfriday({...friday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n08}
                                          onChange={(e, val) => { seTfriday({...friday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n10}
                                          onChange={(e, val) => { seTfriday({...friday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n12}
                                          onChange={(e, val) => { seTfriday({...friday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n14}
                                          onChange={(e, val) => { seTfriday({...friday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n16}
                                          onChange={(e, val) => { seTfriday({...friday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n18}
                                          onChange={(e, val) => { seTfriday({...friday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n20}
                                          onChange={(e, val) => { seTfriday({...friday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={friday.n22}
                                          onChange={(e, val) => { seTfriday({...friday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Cumartesi
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n00}
                                          onChange={(e, val) => { seTsaturday({...saturday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n02}
                                          onChange={(e, val) => { seTsaturday({...saturday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n04}
                                          onChange={(e, val) => { seTsaturday({...saturday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n06}
                                          onChange={(e, val) => { seTsaturday({...saturday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n08}
                                          onChange={(e, val) => { seTsaturday({...saturday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n10}
                                          onChange={(e, val) => { seTsaturday({...saturday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n12}
                                          onChange={(e, val) => { seTsaturday({...saturday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n14}
                                          onChange={(e, val) => { seTsaturday({...saturday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n16}
                                          onChange={(e, val) => { seTsaturday({...saturday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n18}
                                          onChange={(e, val) => { seTsaturday({...saturday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n20}
                                          onChange={(e, val) => { seTsaturday({...saturday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={saturday.n22}
                                          onChange={(e, val) => { seTsaturday({...saturday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        <td><table><tbody><tr><td> <b>
                            Pazar
                            </b></td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n00}
                                          onChange={(e, val) => { seTsunday({...sunday, n00:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="00.00 - 02.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n02}
                                          onChange={(e, val) => { seTsunday({...sunday, n02:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="02.00 - 04.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n04}
                                          onChange={(e, val) => { seTsunday({...sunday, n04:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="04.00 - 06.00"
                                    />
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n06}
                                          onChange={(e, val) => { seTsunday({...sunday, n06:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="06.00 - 08.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n08}
                                          onChange={(e, val) => { seTsunday({...sunday, n08:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="08.00 - 10.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n10}
                                          onChange={(e, val) => { seTsunday({...sunday, n10:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="10.00 - 12.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n12}
                                          onChange={(e, val) => { seTsunday({...sunday, n12:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="12.00 - 14.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n14}
                                          onChange={(e, val) => { seTsunday({...sunday, n14:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="14.00 - 16.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n16}
                                          onChange={(e, val) => { seTsunday({...sunday, n16:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="16.00 - 18.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n18}
                                          onChange={(e, val) => { seTsunday({...sunday, n18:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="18.00 - 20.00"
                                    />
                                      
                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n20}
                                          onChange={(e, val) => { seTsunday({...sunday, n20:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="20.00 - 22.00"
                                    />

                            </td></tr></tbody></table><table><tbody><tr><td>
                                  <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={sunday.n22}
                                          onChange={(e, val) => { seTsunday({...sunday, n22:val }) } }
                                          value="checkedB"
                                          color="primary"
                                        />
                                      }
                                      label="22.00 - 00.00"
                                    />
                                      
                            </td></tr></tbody></table>
                            
                        </td>
                        </tr>
                        </tbody>
                        </table>
                          
                      <FormHelperText>{t('Nöbet Yerinin aktif  olduğu saatleri seçiniz.')}</FormHelperText>
                    </FormControl>
                  </FormGroup>
                              
                         
                      </Grid>
            </ValidatorForm>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={gropBoxOpen}
              onClose={() => { seTgropBoxOpen(false)  }}
            >
              <DialogTitle>{t('Yeni Nöbet Yeri Kategorisi Ekle')}</DialogTitle>
              <DialogContent>
                <FormControl className="FormControl" style={{ width: '100%' }}>
                  <InputLabel htmlFor="group">{t('Kategori ismi ekle')}</InputLabel>
                  <Input
                    id="group"
                    onChange={(e) => { seTchangeNewGroupNameJust( e.target.value) }}
                  />
                  <FormHelperText>{t('Kategori Ekle')}</FormHelperText>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {seTgropBoxOpen(false) }} color="primary">  {t('cancel')} </Button>
                <Button onClick={saveHandleNewGroup} color="primary"> {t('save')} </Button>
              </DialogActions>
            </Dialog>


          </div>


        );
      }

