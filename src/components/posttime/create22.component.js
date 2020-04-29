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
} from '@material-ui/core';

import {
  AddBox,
  GroupAdd,
  ContactMail,
  Save,
  BorderOuterSharp,
} from '@material-ui/icons';

import trLocale from 'date-fns/locale/tr';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import cities from '../cities/cities.json';

import '../../assets/css/style.css';

export default function PostCreate() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [gropBoxOpen, seTgropBoxOpen] = useState(false);
  const [changeNewGroupNameJust, seTchangeNewGroupNameJust] = useState('');
  const [findpostGroup, seTfindpostGroup] = useState([]);
  const [zeroTwo, seTzeroTwo] = useState([]);
  const [twoFour, seTtwoFour] = useState([]);
  const [fourSix, seTfourSix] = useState([]);
  const [sixEight, seTsixEight] = useState([]);
  const [eightTen, seTeightTen] = useState([]);
  const [tenTwelve, seTtenTwelve] = useState([]);
  const [twelveFourteen, seTtwelveFourteen] = useState([]);
  const [fourteenSixteen, seTfourteenSixteen] = useState([]);
  const [sixteenEightteen, seTsixteenEightteen] = useState([]);
  const [eightteenTwenty, seTeightteenTwenty] = useState([]);
  const [twentyTwentytwo, seTtwentyTwentytwo] = useState([]);
  const [twentytwoZero, seTtwentytwoZero] = useState([]);
  const [norPersonS, seTnorPersonS] = useState([{ name: 'deneme asker' }]);
  const [towerDataS, seTtowerDataS] = useState([]);

  const [postTimes, seTpostTimes] = useState([
    { label: '00.00 - 02.00', value: true },
    /*{ label: '02.00 - 04.00', value: true },
    { label: '04.00 - 06.00', value: true },
    { label: '06.00 - 08.00', value: true },
    { label: '08.00 - 10.00', value: true }, 
    { label: '10.00 - 12.00', value: true },
    { label: '12.00 - 14.00', value: true },
    { label: '14.00 - 16.00', value: true },
    { label: '16.00 - 18.00', value: true }
    { label: '18.00 - 20.00', value: true },
    { label: '20.00 - 22.00', value: true },
    { label: '22.00 - 00.00', value: true },*/
  ]);

  const [state, seTstate] = useState({
    selectedDefaultStateArray: cities,
    selectedDefaultState: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' },
    ],
    selectedGroupItems: [],
    selected1Zipcode: '',
    selected1Town: '',
    name: '',
    email: '',
    ssn: '',
    phone: '',
    risk: 80,
    selected1Address: '',
    due_note: '',
    selected_date: Date.now(),
    details: {},
  });

  const [postTimeLocal, seTpostTimeLocal] = useState({
    time: '',
    tower: '',
    day: '',
    date: state.selected_date,
  });
  function getPostData() {
    const NowDate = Moment(state.selected_date).format('dddd');
    const towerData = [];

    for (const i in postTimes) {
      let params = [{ nowDate: NowDate }, { time: postTimes[i] }];

      axios
        .post('http://localhost:5000/post/gettime', params)
        .then((res) => {
          console.log('bu 1');
          towerData.push(res.data);
        })
        .catch((err) => console.log(err));
    }

    seTtowerDataS(towerData);
  }

  function addPostOfSoldier(id, data) {
    axios
      .post(`http://localhost:5000/soldier/addposttime/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  function addPostOfSoldierNumber(id) {
    axios
      .get(`http://localhost:5000/soldier/addposttimenumber/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  // componentDidMount = useEffect
  useEffect(() => {
    Moment.locale('en');
    getPostData();
  }, [state.selected_date, twentytwoZero]);

  async function getSoldierData(params) {
    const postPerson = [];
    const norPerson = norPersonS;

    await axios
      .post('http://localhost:5000/soldier/gettime', params)
      .then((res) => {
        postPerson.push({
          name: res.data.name,
        });
        norPerson.push({
          name: res.data.name,
        });
        seTnorPersonS(norPerson);
      });
    return postPerson[0];
  }

  async function createPostTime(e) {
    const NowDate = Moment(state.selected_date).format('dddd');
    const zeroTwoN = [];
    const twoFourN = [];
    const fourSixN = [];
    const sixEightN = [];
    const eightTenN = [];
    const tenTwelveN = [];
    const twelveFourteenN = [];
    const fourteenSixteenN = [];
    const sixteenEightteenN = [];
    const eightteenTwentyN = [];
    const twentyTwentytwoN = [];
    const twentytwoZeroN = [];

    for (const i in towerDataS) {
      for (const j in towerDataS[i]) {
        if (NowDate == 'Monday') {
          for (const k in towerDataS[i][j].times.Monday) {
            if (towerDataS[i][j].times.Monday[k].label == '00.00 - 02.00') {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }

              console.log(towerDataS[i][j].name);
              zeroTwoN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTzeroTwo(zeroTwoN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '02.00 - 04.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              twoFourN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTtwoFour(twoFourN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '04.00 - 06.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              fourSixN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTfourSix(fourSixN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '06.00 - 08.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              sixEightN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTsixEight(sixEightN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '08.00 - 10.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              eightTenN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTeightTen(eightTenN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '10.00 - 12.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              tenTwelveN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTtenTwelve(tenTwelveN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '12.00 - 14.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              twelveFourteenN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTtwelveFourteen(twelveFourteenN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '14.00 - 16.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              fourteenSixteenN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTfourteenSixteen(fourteenSixteenN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '16.00 - 18.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              sixteenEightteenN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTsixteenEightteen(sixteenEightteenN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '18.00 - 20.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              eightteenTwentyN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTeightteenTwenty(eightteenTwentyN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '20.00 - 22.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              twentyTwentytwoN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTtwentyTwentytwo(twentyTwentytwoN);
            } else if (
              towerDataS[i][j].times.Monday[k].label == '22.00 - 00.00'
            ) {
              let postPerson = [];
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
              } else {
                postPerson.push({ name: 'NÖBET YOK' });
              }
              console.log(towerDataS[i][j].name);
              twentytwoZeroN.push({
                tower: towerDataS[i][j].name,
                time: towerDataS[i][j].times.Monday[k].label,
                person: postPerson,
              });
              seTtwentytwoZero(twentytwoZeroN);
            }
          }
        }
      }
    }
  }

  async function createPostTime2(e) {
    const NowDate = Moment(state.selected_date).format('dddd');
    const zeroTwoN = [];
    const twoFourN = [];
    const fourSixN = [];
    const sixEightN = [];
    const eightTenN = [];
    const tenTwelveN = [];
    const twelveFourteenN = [];
    const fourteenSixteenN = [];
    const sixteenEightteenN = [];
    const eightteenTwentyN = [];
    const twentyTwentytwoN = [];
    const twentytwoZeroN = [];

    for (const i in towerDataS) {
      for (const j in towerDataS[i]) {
        if (NowDate == 'Monday') {
          let postPerson = [];
          let specialPerson = [];
          for (const k in towerDataS[i][j].times.Monday) {
            if (towerDataS[i][j].times.Monday[k].label == '00.00 - 02.00') {
              if (towerDataS[i][j].times.Monday[k].value == true) {
                for (let yy = 0; yy < Number(towerDataS[i][j].person); yy++) {
                  let params = [
                    { nowDate: NowDate },
                    { time: towerDataS[i][j].times.Monday[k].label },
                    { norPerson: norPersonS },
                  ];

                  let inTheSoldier = await getSoldierData(params);
                  postPerson.push(inTheSoldier);
                }
                specialPerson.push({
                  tower: towerDataS[i][j].name,
                  time: '00.00 - 02.00',
                  person: postPerson,
                });
              } else {
                postPerson.push({
                  name: 'NÖBET YOK',
                });
                specialPerson.push({
                  tower: towerDataS[i][j].name,
                  time: '00.00 - 02.00',
                  person: postPerson,
                });
              }
              seTzeroTwo(specialPerson);
            }
          }
        }
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const post = {};

    console.log(post);

    axios.post('http://localhost:5000/posttime/add', post).then((res) => {
      if (res.data.variant == 'error') {
        enqueueSnackbar(t('Nöbet Yeri Eklenemedi') + res.data.messagge, {
          variant: res.data.variant,
        });
      } else {
        enqueueSnackbar(t('Nöbet Yeri Eklendi'), { variant: res.data.variant });
        // navigate
        history.push('/posttimelist');
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
                {t(' Nöbet Ekle')}
              </Typography>
              <Grid item container sm={12}>
                <Grid container item sm={10} spacing={0}>
                  <FormGroup className="FormGroup">
                    <FormControl>
                      <MuiPickersUtilsProvider
                        locale={trLocale}
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          required
                          margin="dense"
                          id="date-picker-dialog"
                          label={t('Nöbet oluşturulacak Tarih')}
                          format="dd/MM/yyyy"
                          value={state.selected_date}
                          onChange={(date) => {
                            seTstate({ ...state, selected_date: date });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      <FormHelperText>
                        {t('Nöbet Yazılacak Tarihi Seçiniz')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid container item sm={2} spacing={0}>
                  <FormGroup className="FormGroup">
                    <FormControl>
                      <Button
                        size="large"
                        style={{ marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                        onClick={createPostTime}
                      >
                        Nöbet Oluştur
                      </Button>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid container item sm={12}>
                  <FormGroup className="FormGroup" style={{ margin: '50px' }}>
                    <FormControl>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <b>NÖBET SAATLERİ</b>{' '}
                            </td>
                            <td>
                              <b>KULE 20</b>{' '}
                            </td>
                            <td>
                              <b>KULE 21</b>{' '}
                            </td>
                            <td>
                              <b>KOĞUŞ</b>{' '}
                            </td>
                            <td>
                              <b>NİZAMİYE 1</b>{' '}
                            </td>
                            <td>
                              <b>NİZAMİYE 2</b>{' '}
                            </td>
                            <td>
                              <b>NİZAMİYE 3</b>{' '}
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td>
                              <b>00.00 - 02.00</b>{' '}
                            </td>
                            {zeroTwo.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td>
                              <b>02.00 - 04.00</b>{' '}
                            </td>
                            {twoFour.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>04.00 - 06.00</b>{' '}
                            </td>
                            {fourSix.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>06.00 - 08.00</b>{' '}
                            </td>

                            {sixEight.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>08.00 - 10.00</b>{' '}
                            </td>

                            {eightTen.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>10.00 - 12.00</b>{' '}
                            </td>

                            {tenTwelve.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>12.00 - 14.00</b>{' '}
                            </td>

                            {twelveFourteen.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>14.00 - 16.00</b>{' '}
                            </td>

                            {fourteenSixteen.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>16.00 - 18.00</b>{' '}
                            </td>

                            {sixteenEightteen.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>18.00 - 20.00</b>{' '}
                            </td>

                            {eightteenTwenty.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>20.00 - 22.00</b>{' '}
                            </td>

                            {twentyTwentytwo.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>

                        <tbody>
                          <tr>
                            <td>
                              <b>22.00 - 00.00</b>{' '}
                            </td>

                            {twentytwoZero.map((data) => (
                              <td key={data.tower}>
                                {data.person.map((data2) => (
                                  <span key={data2.key}>
                                    {data2.name}
                                    <br />
                                  </span>
                                ))}{' '}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                      <div style={{ clear: 'bouth', marginBottom: '55px' }} />
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
      </ValidatorForm>
    </div>
  );
}
