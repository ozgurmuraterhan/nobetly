import React, { Component, forwardRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';

import { Doughnut } from 'react-chartjs-2';
import { useSnackbar } from 'notistack';

import {
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  Card,
  Tooltip,
  Grid,
  Typography,
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
} from '@material-ui/icons';

import '../../assets/css/style.css';

export default function SoldierList() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [customergroups, seTcustomergroups] = useState([]);
  const [open, seTopen] = useState(false);
  const [details_label, seTdetails_label] = useState('');
  const [details_value, seTdetails_value] = useState('');
  const [data, seTdata] = useState([]);
  const customergroups_label = [{ title: t('groupName'), field: 'name' }];
  const pieColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#cc65fe',
    '#445ce2',
    '#e244b1',
    '#0c3836',
    '#51e4b5',
    '#ff0000',
    '#6eff00',
    '#00ffe7',
    '#28a743',
    '#ff00c8',
    '#063361',
    '#1f77b4',
    '#e377c2',
    '#ff7f0e',
    '#2ca02c',
    '#bcbd22',
    '#d62728',
    '#17becf',
    '#9467bd',
    '#7f7f7f',
    '#8c564b',
    '#3366cc',
  ];

  const columns = [
    {
      title: t('Adı Soyadı'),
      field: 'name',
    },
    {
      title: t('tuttuğu nöbet'),
      field: 'totalPost',
    },
    {
      title: t('Görev Yeri'),
      render: (rowData) => {
        const group_label = [];
        for (const i in rowData.group_id) {
          group_label.push(
            <button key={i}>{rowData.group_id[i].label}</button>
          );
        }
        return group_label;
      },
    },
    {
      title: t('Memleketi'),
      field: 'defaultAddress_state_id',
    },
    {
      title: t('actions'),
      field: '_id',
      render: (rowData) => (
        <div>
          <Link to={`/soldier/edit/${rowData._id}`}>
            <Edit />
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

  const getSoldierData = () => {
    axios.get('http://localhost:5000/soldier').then((response) => {
      if (response.data.length > 0) {
        seTdata(response.data);
        // console.log(data)
        //  console.log(columns)
      }
    });
  };

  const getSoldierGroupData = () => {
    axios.get('http://localhost:5000/soldiergroups').then((response) => {
      if (response.data.length > 0) {
        seTcustomergroups(response.data);
      }
    });
  };

  const getSoldierNumber = () => {
    axios.get('http://localhost:5000/soldier/postnumberzero').then((res) => {
      if (res.data.variant == 'error') {
        enqueueSnackbar('Askerler Güncellenemedi' + res.data.messagge, {
          variant: res.data.variant,
        });
      } else {
        enqueueSnackbar('Askerler Güncellendi', {
          variant: res.data.variant,
        });
      }
    });
  };

  const getGroupNameStatistic = () => {
    // group name statistic data
    axios.get('http://localhost:5000/soldier/statistic').then((response) => {
      if (response.data.length > 0) {
        const details_label = [];
        const details_value = [];
        for (const i in response.data) {
          details_label.push(response.data[i]._id);
          details_value.push(response.data[i].count);
        }
        seTdetails_label(details_label);
        seTdetails_value(details_value);
      }
    });
  };

  useEffect(() => {
    getSoldierData();
    getSoldierGroupData();
    getGroupNameStatistic();
  }, []);

  const handleClickOpen = () => {
    seTopen(true);
  };

  const handleClose = () => {
    getSoldierData();
    getGroupNameStatistic();

    seTopen(false);
  };

  return (
    <>
      <div className="containerP">
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogContent style={{ padding: '0' }}>
            <MaterialTable
              title={t('Asker Görev Yerleri')}
              icons={tableIcons}
              columns={customergroups_label}
              data={customergroups}
              options={{
                exportButton: true,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post('http://localhost:5000/soldiergroups/add', {
                        name: newData.name,
                      })
                      .then((response) => {
                        customergroups.push(newData);
                        seTcustomergroups(customergroups);
                        getSoldierGroupData();
                      });
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(
                        `http://localhost:5000/soldiergroups/${newData._id}`,
                        { name: newData.name }
                      )
                      .then((response) => {
                        const index = customergroups.indexOf(oldData);
                        customergroups[index] = newData;
                        seTcustomergroups(customergroups);
                        getSoldierGroupData();
                      });
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .delete(
                        `http://localhost:5000/soldiergroups/${oldData._id}`
                      )
                      .then((response) => {
                        const index = customergroups.indexOf(oldData);
                        customergroups.splice(index, 1);
                        seTcustomergroups(customergroups);
                        getSoldierGroupData();
                      });
                    resolve();
                  }),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t('Tamamdır')}
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item container spacing={3}>
          <Grid container item md={9} className="panelGridRelative">
            <Card className="panelLargeIcon">
              <GroupAdd fontSize="large" />
            </Card>
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
                      >
                        {t('Asker Listesi')}
                        <br />
                        <Button
                          onClick={getSoldierNumber}
                          style={{ float: 'right', marginRight: '25px' }}
                          color="secondary"
                        >
                          Yeni Asker Geldi, Nöbet Sıfırla
                        </Button>
                      </Typography>

                      <Link to="/SoldierCreate" className="addButtonPlace">
                        <Tooltip title={t('Asker Ekle')}>
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
                {t('Asker Görev Yeri')}
                <Tooltip title={t('manageGroups')}>
                  <Button
                    variant="outlined"
                    style={{ float: 'right', marginRight: '15px' }}
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    <Settings />
                  </Button>
                </Tooltip>
              </Typography>
              <div style={{ marginTop: '55px', textAlign: 'center' }}>
                <Doughnut
                  height={350}
                  data={{
                    labels: details_label,
                    datasets: [
                      {
                        data: details_value,
                        backgroundColor: pieColors,
                      },
                    ],
                  }}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
