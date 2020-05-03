import React, { Component, forwardRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import trLocale from 'date-fns/locale/tr';
import DateFnsUtils from '@date-io/date-fns';

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
  FormHelperText,
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
} from '@material-ui/icons';

import '../../assets/css/style.css';

export default function PostTime() {
  const [t] = useTranslation();
  const history = useHistory();

  const [postSoldierCount, seTpostSoldierCount] = useState([]);
  const [data, seTdata] = useState([]);
  const [state, seTstate] = useState({
    selected_date: Date.now(),
  });
  const [soldier, seTsoldier] = useState([]);

  const columns = [
    {
      title: t('Tarih'),
      field: 'date',
      render: (rowData) => (
        <div>{Moment(rowData.date).format('DD MMMM YYYY')}</div>
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

  const getPostSoldierStatistic = () => {
    let shortArray = [];
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
    axios.get('http://localhost:5000/soldier/').then((res) => {
      seTsoldier(res.data);
    });
  };

  useEffect(() => {
    Moment.locale('tr');
    getPostSoldierStatistic();
    getPostTime();
    getPostSoldier();
  }, []);

  return (
    <>
      <div className="containerP">
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
              <div style={{ marginTop: '55px', textAlign: 'center' }}>
                <table style={{ marginLeft: '30px' }}>
                  <tbody>
                    {postSoldierCount.map((data) => (
                      <tr>
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
