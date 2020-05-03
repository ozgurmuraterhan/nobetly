import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

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

export default function PostEdit(props) {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <table style={{ fontSize: '10pt' }}>
          <tbody>
            <tr>
              <td>
                <b>NÖBET SAATLERİ </b>{' '}
              </td>

              {towerName.map((tower) => (
                <td key={tower.name}>
                  <b>{tower.name}</b>
                </td>
              ))}
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>00.00 - 02.00</b>{' '}
              </td>
              {zeroTwo.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>02.00 - 04.00</b>{' '}
              </td>
              {twoFour.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>04.00 - 06.00</b>{' '}
              </td>
              {fourSix.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}{' '}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>
                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>06.00 - 08.00</b>{' '}
              </td>

              {sixEight.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>08.00 - 10.00</b>{' '}
              </td>

              {eightTen.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>10.00 - 12.00</b>{' '}
              </td>

              {tenTwelve.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>12.00 - 14.00</b>{' '}
              </td>

              {twelveFourteen.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>14.00 - 16.00</b>{' '}
              </td>

              {fourteenSixteen.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>16.00 - 18.00</b>{' '}
              </td>

              {sixteenEightteen.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>18.00 - 20.00</b>{' '}
              </td>

              {eightteenTwenty.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>20.00 - 22.00</b>{' '}
              </td>

              {twentyTwentytwo.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{ borderBottom: '1px solid #ccc', fontSize: '11pt' }}>
                <b>22.00 - 00.00</b>{' '}
              </td>

              {twentytwoZero.map((data) => (
                <td key={data.tower} style={{ borderBottom: '1px solid #ccc' }}>
                  {data.person.map((data2) => (
                    <span key={data2.key}>
                      {data2.name}
                      <span style={{ float: 'right', marginRight: '10px' }}>
                        {data2.gun_number}
                      </span>

                      <br />
                    </span>
                  ))}{' '}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }
  }

  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const componentRef = useRef();
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

  const [towerName, seTtowerName] = useState([]);

  function getAllPost() {
    axios
      .get('http://localhost:5000/post/')
      .then((res) => {
        seTtowerName(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    Moment.locale('tr');
    getAllPostTime();
    getAllPost();
  }, []);
  function getAllPostTime() {
    axios
      .get(`http://localhost:5000/posttime/${props.match.params.id}`)
      .then((res) => {
        seTzeroTwo(res.data.postsview[0].zeroTwo);
        seTtwoFour(res.data.postsview[0].twoFour);
        seTfourSix(res.data.postsview[0].fourSix);
        seTsixEight(res.data.postsview[0].sixEight);
        seTeightTen(res.data.postsview[0].eightTen);
        seTtenTwelve(res.data.postsview[0].tenTwelve);
        seTtwelveFourteen(res.data.postsview[0].twelveFourteen);
        seTfourteenSixteen(res.data.postsview[0].fourteenSixteen);
        seTsixteenEightteen(res.data.postsview[0].sixteenEightteen);
        seTeightteenTwenty(res.data.postsview[0].eightteenTwenty);
        seTtwentyTwentytwo(res.data.postsview[0].twentyTwentytwo);
        seTtwentytwoZero(res.data.postsview[0].twentytwoZero);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="containerP">
      <ValidatorForm autoComplete="off" onSubmit={false}>
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
                {t(' Nöbet Görüntüle')}
              </Typography>
              <Grid item container sm={12}>
                <Grid container item sm={12}>
                  <ReactToPrint
                    trigger={() => <button>Print this out!</button>}
                    content={() => componentRef.current}
                  />

                  <FormGroup className="FormGroup" style={{ margin: '10px' }}>
                    <FormControl>
                      <ComponentToPrint ref={componentRef} />
                      <div style={{ clear: 'bouth', marginBottom: '55px' }} />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
}
