import React, { Component, forwardRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import trLocale from 'date-fns/locale/tr';
import DateFnsUtils from '@date-io/date-fns';
import { useSnackbar } from 'notistack';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  Card,
  Tooltip,
  Grid,
  Typography,
  FormGroup,
  FormControl,
  Button,
  FormHelperText,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import {
  Settings,
  Edit,
  GroupAdd,
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  Receipt,
  Visibility,
  Delete,
} from '@material-ui/icons';

import '../../assets/css/style.css';

export default function PostTime() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [postSoldierCount, seTpostSoldierCount] = useState([]);
  const [data, seTdata] = useState([]);
  const [state, seTstate] = useState({
    selected_date: Date.now(),
  });
  const [soldier, seTsoldier] = useState([]);
  const [soldierView, seTsoldierView] = useState([]);
  const [soldierCount, seTsoldierCount] = useState(0);
  const [openalert, seTopenalert] = useState(false);
  const [thatid, seTthatid] = useState(0);

  const columns = [
    {
      title: t('Tarih'),
      field: 'date',
      render: (rowData) => (
        <div>{Moment(rowData.date).format('DD MMMM YYYY - dddd')}</div>
      ),
    },
    {
      title: t('actions'),
      field: '_id',
      render: (rowData) => (
        <div>
          <Link to={`/posttime/edit/${rowData._id}`}>
            <Visibility />
          </Link>

          <Tooltip title={t('Nöbet Sil')}>
            <Button
              variant="outlined"
              color="primary"
              style={{ float: 'right', marginRight: '115px' }}
              onClick={() => {
                seTopenalert(true);

                seTthatid(rowData._id);
              }}
            >
              <Delete />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const deleteData = (id) => {
    axios.delete(`http://localhost:5000/posttime/${thatid}`).then((res) => {
      history.push('/PostTimeList');
      enqueueSnackbar(t('Nöbet Silindi'), { variant: res.data.variant });
    });
    seTthatid(0);
    getPostSoldierStatistic();
    getPostTime();
    getPostSoldier();
    seTopenalert(false);
  };
  const getPostSoldierStatistic = () => {
    axios.post('http://localhost:5000/posttime/statistic').then((res) => {
      seTpostSoldierCount(res.data);
    });
  };

  const getPostTime = () => {
    axios.get('http://localhost:5000/posttime/').then((res) => {
      seTdata(res.data);
    });
  };

  const getPostSoldier = () => {
    axios.get('http://localhost:5000/soldier/name/').then((res) => {
      seTsoldier(res.data);
    });
  };

  useEffect(() => {
    Moment.locale('tr');
    getPostSoldierStatistic();
    getPostTime();
    getPostSoldier();
  }, []);

  const getStatiticView = () => {
    const soldierN = [];
    for (const i in soldier) {
      let a = postSoldierCount.find(function (element) {
        return element._id == soldier[i].name;
      });
      if (a != undefined) {
        soldierN.push(a);
      }
    }
    seTsoldierView(soldierN);
    seTsoldierCount(soldierN.length);
  };
  return (
    <>
      <div className="containerP">
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

        <Grid item container spacing={3}>
          <Grid container item md={9} className="panelGridRelative">
            <Card className="listViewPaper">
              <MaterialTable
                title=""
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                  exportButton: true,
                  pageSize: 10,
                  grouping: true,
                }}
                components={{
                  Toolbar: (props) => (
                    <div>
                      <Typography
                        component="h5"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="typography"
                        style={{ padding: '10px 0 20px 30px' }}
                      >
                        {t('Nöbet Listesi')}
                      </Typography>
                      <Link to="/PostTimeCreate" className="addButtonPlace">
                        <Tooltip title={t('Nöbet  Ekle')}>
                          <AddBox fontSize="large" className="addButtonIcon" />
                        </Tooltip>
                      </Link>
                      <MTableToolbar {...props} />
                      <div style={{ clear: 'both' }} />
                    </div>
                  ),
                }}
              />
            </Card>
          </Grid>
          <Grid item container md={3} className="panelGridRelative">
            <Card className="listViewPaper" style={{ padding: '10px' }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                style={{ width: '100%', paddingLeft: '10px' }}
                className="typography"
              >
                {t('Kim kaç kere nöbet tutmuş ?')}
              </Typography>

              <Button
                color="primary"
                variant="contained"
                onClick={getStatiticView}
              >
                İstatistikleri Gör
              </Button>
              <div style={{ marginTop: '55px', textAlign: 'left' }}>
                <table style={{ marginLeft: '30px' }}>
                  <tbody>
                    {soldierView.map((data) => (
                      <tr key={data._id}>
                        <td>{data._id}</td>
                        <td>{data.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
