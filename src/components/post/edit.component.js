import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import Select from 'react-select';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import cities from '../cities/cities.json';

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
  Checkbox,
  DialogContentText,
} from '@material-ui/core';

import {
  AddBox,
  Delete,
  GroupAdd,
  ContactMail,
  Save,
} from '@material-ui/icons';

import trLocale from 'date-fns/locale/tr';

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
  const [findpostGroup, seTfindpostGroup] = useState([]);

  const [openalert, seTopenalert] = useState(false);

  const [state, seTstate] = useState({
    selectedGroupItems: [],
    name: '',
    phone: '',
    risk: 20,
    due_note: '',
    person: 1,
  });

  const [monday, seTmonday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [tuesday, seTtuesday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [wednesday, seTwednesday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [thursday, seTthursday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [friday, seTfriday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [saturday, seTsaturday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  const [sunday, seTsunday] = useState([
    { label: '00.00 - 02.00', value: true },
    { label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true },
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true },
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },
  ]);

  // default adress func
  const handleChangeState = (selectedOption) => {
    console.log(selectedOption);

    seTstate({
      ...state,
      selectedDefaultState: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };
  // default adress func end

  // open new post group dialog save
  const saveHandleNewGroup = () => {
    const data = {
      name: changeNewGroupNameJust,
    };
    console.log(data);
    axios
      .post('http://localhost:5000/postgroups/add', data)
      .then((res) => {
        if (res.data.variant == 'error') {
          enqueueSnackbar(
            t('Nöbet Kategorisi Eklenemedi') + res.data.messagge,
            { variant: res.data.variant }
          );
        } else {
          enqueueSnackbar(t('Nöbet Kategorisi Eklendi'), {
            variant: res.data.variant,
          });
        }

        getpostGroup();
      })
      .catch((err) => console.log(err));

    seTgropBoxOpen(false);
  };

  // end open new post group dialog save

  function getpostGroup() {
    axios
      .get('http://localhost:5000/postgroups/')
      .then((res) => {
        if (res.data.length > 0) {
          const details = [];
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          seTfindpostGroup(details);
        }
      })
      .catch((err) => console.log(err));
  }

  function getPost() {
    axios
      .get(`http://localhost:5000/post/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);

        const details = [];
        for (const i in res.data.group_id) {
          details.push({
            label: res.data.group_id[i].label,
            value: res.data.group_id[i].value,
          });
        }

        seTmonday(res.data.times['Monday']);
        seTtuesday(res.data.times['Tuesday']);
        seTwednesday(res.data.times['Wednesday']);
        seTthursday(res.data.times['Thursday']);
        seTfriday(res.data.times['Friday']);
        seTsaturday(res.data.times['Saturday']);
        seTsunday(res.data.times['Sunday']);
        seTstate({
          ...state,
          name: res.data.name,
          phone: res.data.phone,
          person: res.data.person,
          due_note: res.data.due_note,
          selectedGroupItems: details,
          _id: res.data._id,
        });
      })
      .catch((err) => console.log(err));
  }

  const deleteData = (id) => {
    axios.delete(`http://localhost:5000/post/${id}`).then((res) => {
      history.push('/postlist');
      enqueueSnackbar(t('Nöbet Yeri Silindi'), { variant: res.data.variant });
    });
  };

  // componentDidMount = useEffect
  useEffect(() => {
    getpostGroup();
    getPost();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const post = {
      name: state.name,
      email: state.email,
      group_id: state.selectedGroupItems,
      ssn: state.ssn,
      phone: state.phone,
      due_note: state.due_note,
      risk: state.risk,
      person: state.person,
      times: {
        Monday: monday,
        Tuesday: tuesday,
        Wednesday: wednesday,
        Thursday: thursday,
        Friday: friday,
        Saturday: saturday,
        Sunday: sunday,
      },
    };

    console.log(post);

    axios
      .post(`http://localhost:5000/post/${props.match.params.id}`, post)
      .then((res) => {
        if (res.data.variant == 'error') {
          enqueueSnackbar(t('Nöbet Yeri Güncellendi') + res.data.messagge, {
            variant: res.data.variant,
          });
        } else {
          enqueueSnackbar(t('Nöbet Yeri Güncellendi'), {
            variant: res.data.variant,
          });
          // navigate
          history.push('/postlist');
        }
      });
  };

  return (
    <div className="containerP">
      <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
        <Grid item container spacing={3}>
          <Grid item container md={12} className="panelGridRelative">
            <Card className="panelLargeIcon">
              <GroupAdd fontSize="large" />
            </Card>
            <Card className="listViewPaper">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className="typography"
              >
                {t('Nöbet Yeri Düzenle')}

                <Tooltip title={t('deleteCustomer')}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ float: 'right', marginRight: '115px' }}
                    onClick={() => {
                      seTopenalert(true);
                    }}
                  >
                    <Delete />
                  </Button>
                </Tooltip>

                <Dialog
                  open={openalert}
                  onClose={() => {
                    seTopenalert(false);
                  }}
                >
                  <DialogTitle>{t('SİL')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('Gerçekten Silmek İstiyor musunuz?')}
                      <br />
                      {t(' Silerseniz, bu verilere bir daha erişemezsiniz.')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        seTopenalert(false);
                      }}
                      color="primary"
                    >
                      {' '}
                      {t('cancel')}{' '}
                    </Button>
                    <Button
                      onClick={() => {
                        deleteData(state._id);
                      }}
                      color="primary"
                      autoFocus
                    >
                      {t('delete')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
              <Grid item container sm={12}>
                <Grid container item sm={3} spacing={0}>
                  <FormGroup className="FormGroup">
                    <FormControl>
                      <TextValidator
                        label={t('Adı')}
                        value={state.name}
                        onChange={(e) => {
                          seTstate({ ...state, name: e.target.value });
                        }}
                        required
                      />
                      <FormHelperText>
                        {t('Nöbet Yeri adı yazılmalı')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid
                  container
                  item
                  sm={3}
                  spacing={0}
                  style={{ paddingLeft: '10px' }}
                >
                  <FormGroup className="FormGroup">
                    <FormControl>
                      <TextValidator
                        required
                        type="number"
                        label={t('Kişi Sayısı')}
                        value={state.person}
                        onChange={(e) => {
                          seTstate({ ...state, person: e.target.value });
                        }}
                        validators={['isNumber']}
                        errorMessages={[t('Rakam giriniz.')]}
                      />
                      <FormHelperText>
                        {t('Bu nöbet yerinde kaç kişi nöbet tutacak?')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid container item sm={3} spacing={0}>
                  <FormGroup className="FormGroup">
                    <FormControl>
                      <TextValidator
                        label={t('Dahili Numarası')}
                        value={state.phone}
                        onChange={(e) => {
                          seTstate({ ...state, phone: e.target.value });
                        }}
                        validators={['isNumber']}
                        errorMessages={[t('Rakamlardan oluşmalı')]}
                      />
                      <FormHelperText>
                        {t('Nöbet Yerinin Dahili Numarası')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid container item sm={3} spacing={0}>
                  <Grid container item sm={1} spacing={0}>
                    <Tooltip title={t('Kategori ekle')}>
                      <AddBox
                        onClick={() => {
                          seTgropBoxOpen(true);
                        }}
                        fontSize="large"
                        style={{ margin: '25px 10px 0 5px' }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid container item sm={11} spacing={0}>
                    <FormGroup className="FormGroup">
                      <InputLabel
                        htmlFor="group_id"
                        className="InputLabel"
                        style={{ margin: '5px' }}
                      >
                        {' '}
                      </InputLabel>
                      <FormControl style={{ zIndex: 12 }}>
                        <Select
                          required
                          isMulti
                          styles={{
                            singleValue: (base) => ({
                              ...base,
                              color: 'white',
                            }),
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
                          onChange={(selectedOption) => {
                            seTstate({
                              ...state,
                              selectedGroupItems: selectedOption,
                            });
                          }}
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
                        onChange={(e) => {
                          seTstate({ ...state, due_note: e.target.value });
                        }}
                      />
                      <FormHelperText>
                        {t('Asker hakkında  düşünceleriniz')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid container item sm={12}>
                  <FormGroup className="FormGroup" style={{ margin: '50px' }}>
                    <InputLabel htmlFor="risk" className="InputLabel">
                      {t('Nöbet Risk Durumu')}
                    </InputLabel>
                    <FormControl>
                      <Slider
                        color="secondary"
                        defaultValue={state.risk}
                        onChangeCommitted={(e, val) => {
                          e.preventDefault();
                          seTstate({ ...state, risk: val });
                        }}
                        passive={0}
                        valueLabelDisplay="on"
                        step={5}
                        min={0}
                        max={100}
                      />
                      <FormHelperText>
                        {t('Nöbet Risk Durumunu seçiniz')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
            <div className="saveButtonPlace">
              <Button type="submit" className="glow-on-hover">
                <Save fontSize="small" style={{ marginRight: '15px' }} />{' '}
                {t('save')}
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid container item sm={12}>
          <FormGroup className="FormGroup">
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              {t('Nöbet Yerinin Açık Olduğu Saatleri Seçiniz')}
            </Typography>

            <FormControl>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Pazartesi</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[0].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[1].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[2].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[3].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[4].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[5].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[6].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[7].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[8].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[9].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[10].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={monday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...monday];
                                      deg[11].value = val;
                                      seTmonday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Salı</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[0].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[1].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[2].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[3].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[4].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[5].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[6].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[7].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[8].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[9].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[10].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tuesday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...tuesday];
                                      deg[11].value = val;
                                      seTtuesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Çarşamba</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[0].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[1].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[2].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[3].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[4].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[5].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[6].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[7].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[8].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[9].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[10].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={wednesday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...wednesday];
                                      deg[11].value = val;
                                      seTwednesday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Perşembe</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[0].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[1].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[2].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[3].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[4].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[5].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[6].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[7].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[8].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[9].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[10].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={thursday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...thursday];
                                      deg[11].value = val;
                                      seTthursday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Cuma</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[0].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[1].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[2].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[3].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[4].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[5].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[6].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[7].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[8].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[9].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[10].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={friday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...friday];
                                      deg[11].value = val;
                                      seTfriday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Cumartesi</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[0].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[1].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[2].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[3].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[4].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[5].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[6].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[7].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[8].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[9].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[10].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={saturday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...saturday];
                                      deg[11].value = val;
                                      seTsaturday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {' '}
                              <b>Pazar</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[0].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[0].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="00.00 - 02.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[1].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[1].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="02.00 - 04.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[2].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[2].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="04.00 - 06.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[3].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[3].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="06.00 - 08.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[4].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[4].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="08.00 - 10.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[5].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[5].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="10.00 - 12.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[6].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[6].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="12.00 - 14.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[7].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[7].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="14.00 - 16.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[8].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[8].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="16.00 - 18.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[9].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[9].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="18.00 - 20.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[10].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[10].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="20.00 - 22.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={sunday[11].value}
                                    onChange={(e, val) => {
                                      const deg = [...sunday];
                                      deg[11].value = val;
                                      seTsunday(deg);
                                    }}
                                    color="primary"
                                  />
                                }
                                label="22.00 - 00.00"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <FormHelperText>
                {t('Nöbet Yerinin aktif  olduğu saatleri seçiniz.')}
              </FormHelperText>
            </FormControl>
          </FormGroup>
        </Grid>
      </ValidatorForm>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={gropBoxOpen}
        onClose={() => {
          seTgropBoxOpen(false);
        }}
      >
        <DialogTitle>{t('Yeni Nöbet Yeri Kategorisi Ekle')}</DialogTitle>
        <DialogContent>
          <FormControl className="FormControl" style={{ width: '100%' }}>
            <InputLabel htmlFor="group">{t('Kategori ismi ekle')}</InputLabel>
            <Input
              id="group"
              onChange={(e) => {
                seTchangeNewGroupNameJust(e.target.value);
              }}
            />
            <FormHelperText>{t('Kategori Ekle')}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              seTgropBoxOpen(false);
            }}
            color="primary"
          >
            {' '}
            {t('cancel')}{' '}
          </Button>
          <Button onClick={saveHandleNewGroup} color="primary">
            {' '}
            {t('save')}{' '}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
