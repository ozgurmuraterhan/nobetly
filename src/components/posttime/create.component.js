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
  }, [state.selected_date, twentytwoZero, norPersonS]);

  async function getPostData() {
    const NowDate = Moment(state.selected_date).format('dddd');
    const towerData = [];
    const timeData = [];

    for (const i in postTimes) {
      let params = [{ nowDate: NowDate }, { time: postTimes[i] }];

      await axios
        .post('http://localhost:5000/post/gettime', params)
        .then((res) => {
          towerData.push(res.data);
          timeData.push(params);
        })
        .catch((err) => console.log(err));
    }

    seTtowerDataS([{ data1: towerData }, { data2: timeData }]);
    console.log(towerDataS);
  }

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
    let say = 0;

    for (const i in towerDataS[0]) {
      //console.log(towerDataS[0][i]);
      let say = 1;
      for (const j in towerDataS[0][i]) {
        //console.log(towerDataS[0][i][j]);
        for (const k in towerDataS[0][i][j]) {
          say = say + 1;
          //console.log( towerDataS[0][i][j][k].name +  ' - ' + towerDataS[0][i][j][k].times[NowDate][j].label );
          let postPerson = [];
          if (towerDataS[0][i][j][k].times[NowDate][j].value) {
            for (let yy = 0; yy < Number(towerDataS[0][i][j][k].person); yy++) {
              let params = [
                { nowDate: NowDate },
                { time: towerDataS[0][i][j][k].times[NowDate][j].label },
                { norPerson: norPersonS },
              ];

              let inTheSoldier = await getSoldierData(params);
              postPerson.push(inTheSoldier);
            }
          } else {
            postPerson.push({ name: 'NÖBET YOK' });
          }
          if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '00.00 - 02.00'
          ) {
            zeroTwoN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTzeroTwo(zeroTwoN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '02.00 - 04.00'
          ) {
            twoFourN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTtwoFour(twoFourN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '04.00 - 06.00'
          ) {
            fourSixN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTfourSix(fourSixN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '06.00 - 08.00'
          ) {
            sixEightN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTsixEight(sixEightN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '08.00 - 10.00'
          ) {
            eightTenN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTeightTen(eightTenN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '10.00 - 12.00'
          ) {
            tenTwelveN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTtenTwelve(tenTwelveN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '12.00 - 14.00'
          ) {
            twelveFourteenN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTtwelveFourteen(twelveFourteenN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '14.00 - 16.00'
          ) {
            fourteenSixteenN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTfourteenSixteen(fourteenSixteenN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '16.00 - 18.00'
          ) {
            sixteenEightteenN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTsixteenEightteen(sixteenEightteenN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '18.00 - 20.00'
          ) {
            eightteenTwentyN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTeightteenTwenty(eightteenTwentyN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '20.00 - 22.00'
          ) {
            twentyTwentytwoN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTtwentyTwentytwo(twentyTwentytwoN);
          } else if (
            towerDataS[0][i][j][k].times[NowDate][j].label == '22.00 - 00.00'
          ) {
            twentytwoZeroN.push({
              tower: towerDataS[0][i][j][k].name,
              time: towerDataS[0][i][j][k].times[NowDate][j].label,
              person: postPerson,
            });
            seTtwentytwoZero(twentytwoZeroN);
          }
          console.log(norPersonS);

          if (say >= 33) {
            seTnorPersonS([{ name: 'dene' }]);
            let y = norPersonS;
            y.shift();
            seTnorPersonS(y);
            console.log(say);
            console.log(norPersonS);
          }
        }
        seTnorPersonS([{ name: 'dene' }]);
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>00.00 - 02.00</b>{' '}
                            </td>
                            {zeroTwo.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>02.00 - 04.00</b>{' '}
                            </td>
                            {twoFour.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>04.00 - 06.00</b>{' '}
                            </td>
                            {fourSix.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>06.00 - 08.00</b>{' '}
                            </td>

                            {sixEight.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>08.00 - 10.00</b>{' '}
                            </td>

                            {eightTen.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>10.00 - 12.00</b>{' '}
                            </td>

                            {tenTwelve.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>12.00 - 14.00</b>{' '}
                            </td>

                            {twelveFourteen.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>14.00 - 16.00</b>{' '}
                            </td>

                            {fourteenSixteen.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>16.00 - 18.00</b>{' '}
                            </td>

                            {sixteenEightteen.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>18.00 - 20.00</b>{' '}
                            </td>

                            {eightteenTwenty.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>20.00 - 22.00</b>{' '}
                            </td>

                            {twentyTwentytwo.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
                            <td style={{ borderBottom: '1px solid #000' }}>
                              <b>22.00 - 00.00</b>{' '}
                            </td>

                            {twentytwoZero.map((data) => (
                              <td
                                key={data.tower}
                                style={{ borderBottom: '1px solid #000' }}
                              >
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
