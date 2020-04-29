import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import Select from 'react-select';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
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
  Checkbox
} from '@material-ui/core';

import {
  AddBox,
  GroupAdd,
  ContactMail,
  Save,
  BorderOuterSharp
} from '@material-ui/icons';

import trLocale from 'date-fns/locale/tr';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
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

  const [state, seTstate] = useState({
    selectedDefaultStateArray: cities,
    selectedDefaultState: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' }
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
    details: {}
  });

  const [postTimeLocal, seTpostTimeLocal] = useState({
    time: '',
    tower: '',
    day: '',
    date: state.selected_date
  });
  function getPostData() {
    axios
      .get('http://localhost:5000/post/')
      .then(res => {
        const details = [];
        const NowDate = Moment(state.selected_date).format('dddd');
        console.log(res.data);
        for (const i in res.data) {
          details.push({
            postTime: res.data[i].times[NowDate],
            name: res.data[i].name,
            person: res.data[i].person
          });
        }
        seTstate({ ...state, details });
      })
      .catch(err => console.log(err));
  }

  function addPostOfSoldier(id, data) {
    axios
      .post(`http://localhost:5000/soldier/addposttime/${id}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  function addPostOfSoldierNumber(id) {
    axios
      .get(`http://localhost:5000/soldier/addposttimenumber/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getPostData();
    Moment.locale('en');
  }, [state.selected_date, twentytwoZero]);

  const createPostTime = e => {
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

    const postTimeLocalC = [];
    for (const i in state.details) {
      let norPerson = [];

      for (const j in state.details[i].postTime) {
        let postsPerson = [];
        if (state.details[i].postTime[j].value == true) {
          for (let yy = 0; yy < Number(state.details[i].person); yy++) {
            axios
              .get(
                `http://localhost:5000/soldier/gettime/${NowDate}/${state.details[i].postTime[j].label}`
              )
              .then(res => {
                postsPerson.push({
                  name: res.data.name
                });
              });
          }
        } else {
          postsPerson.push({
            name: 'NÖBET YOK'
          });
        }

        if (state.details[i].postTime[j].label == '00.00 - 02.00') {
          zeroTwoN.push({
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '02.00 - 04.00') {
          twoFourN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '04.00 - 06.00') {
          fourSixN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '06.00 - 08.00') {
          sixEightN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '08.00 - 10.00') {
          eightTenN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '10.00 - 12.00') {
          tenTwelveN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '12.00 - 14.00') {
          twelveFourteenN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '14.00 - 16.00') {
          fourteenSixteenN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '16.00 - 18.00') {
          sixteenEightteenN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '18.00 - 20.00') {
          eightteenTwentyN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '20.00 - 22.00') {
          twentyTwentytwoN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        } else if (state.details[i].postTime[j].label == '22.00 - 00.00') {
          twentytwoZeroN.push({
            key: state.details[i].postTime[j].label + state.details[i].name,
            tower: state.details[i].name,
            time: state.details[i].postTime[j].label,
            person: postsPerson
          });
        }
      }

      //console.log(norPerson)
    }

    console.log(zeroTwoN);

    seTzeroTwo(zeroTwoN);
    seTtwoFour(twoFourN);
    seTfourSix(fourSixN);
    seTsixEight(sixEightN);
    seTeightTen(eightTenN);
    seTtenTwelve(tenTwelveN);
    seTtwelveFourteen(twelveFourteenN);
    seTfourteenSixteen(fourteenSixteenN);
    seTsixteenEightteen(sixteenEightteenN);
    seTeightteenTwenty(eightteenTwentyN);
    seTtwentyTwentytwo(twentyTwentytwoN);
    seTtwentytwoZero(twentytwoZeroN);
  };

  const onSubmit = e => {
    e.preventDefault();
    const post = {};

    console.log(post);

    axios.post('http://localhost:5000/posttime/add', post).then(res => {
      if (res.data.variant == 'error') {
        enqueueSnackbar(t('Nöbet Yeri Eklenemedi') + res.data.messagge, {
          variant: res.data.variant
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
                          onChange={date => {
                            seTstate({ ...state, selected_date: date });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
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
                            {zeroTwo.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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
                            {twoFour.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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
                            {fourSix.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {sixEight.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {eightTen.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {tenTwelve.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {twelveFourteen.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {fourteenSixteen.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {sixteenEightteen.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {eightteenTwenty.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {twentyTwentytwo.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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

                            {twentytwoZero.map(data => (
                              <td key={data.tower}>
                                {data.person.map(data2 => (
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
