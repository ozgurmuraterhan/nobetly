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

  const [rules_data, seTrules_data] = useState([]);
  const [noncom_data, seTnoncom_data] = useState([]);
  const [commander_data, seTcommander_data] = useState([]);

  const [open, seTopen] = useState(false);
  const [details_label, seTdetails_label] = useState('');
  const [details_value, seTdetails_value] = useState('');
  const [data, seTdata] = useState([]);
  const [rules, seTrules] = useState([]);
  const rules_label = [{ title: t('Kural'), field: 'name' }];
  const noncom_label = [{ title: t('İsim'), field: 'name' }];
  const commander_label = [
    { title: t('İsim'), field: 'name' },
    { title: t('Rütbe'), field: 'rank' },
    { title: t('Görevi'), field: 'task' },
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

  const getRulesData = () => {
    axios.get('http://localhost:5000/rules').then((response) => {
      if (response.data.length > 0) {
        seTrules_data(response.data);
      }
    });
  };

  const getNoncomData = () => {
    axios.get('http://localhost:5000/noncom').then((response) => {
      if (response.data.length > 0) {
        seTnoncom_data(response.data);
      }
    });
  };

  const getCommanderData = () => {
    axios.get('http://localhost:5000/commander').then((response) => {
      if (response.data.length > 0) {
        seTcommander_data(response.data);
      }
    });
  };

  useEffect(() => {
    getRulesData();
    getNoncomData();
    getCommanderData();
  }, []);

  return (
    <>
      <div className="containerP">
        <Grid item container spacing={3}>
          <Grid item container md={6} className="panelGridRelative">
            <MaterialTable
              title={t('Komutan Listesi (Tüm alanları doldurun)')}
              icons={tableIcons}
              columns={commander_label}
              data={commander_data}
              style={{ width: '100%' }}
              options={{
                exportButton: false,
                search: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post('http://localhost:5000/commander/add', {
                        name: newData.name,
                        rank: newData.rank,
                        task: newData.task,
                      })
                      .then((response) => {
                        commander_data.push(newData);
                        seTcommander_data(commander_data);
                        getCommanderData();
                      });
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(`http://localhost:5000/commander/${newData._id}`, {
                        name: newData.name,
                      })
                      .then((response) => {
                        const index = commander_data.indexOf(oldData);
                        commander_data[index] = newData;
                        seTcommander_data(commander_data);
                        getCommanderData();
                      });
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .delete(`http://localhost:5000/commander/${oldData._id}`)
                      .then((response) => {
                        const index = commander_data.indexOf(oldData);
                        commander_data.splice(index, 1);
                        seTcommander_data(commander_data);
                        getCommanderData();
                      });
                    resolve();
                  }),
              }}
            />
          </Grid>
          <Grid item container md={6} className="panelGridRelative">
            <MaterialTable
              title={t('Çavuş Listesi')}
              icons={tableIcons}
              columns={noncom_label}
              data={noncom_data}
              style={{ width: '100%' }}
              options={{
                exportButton: false,
                search: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post('http://localhost:5000/noncom/add', {
                        name: newData.name,
                      })
                      .then((response) => {
                        noncom_data.push(newData);
                        seTnoncom_data(noncom_data);
                        getNoncomData();
                      });
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(`http://localhost:5000/noncom/${newData._id}`, {
                        name: newData.name,
                      })
                      .then((response) => {
                        const index = noncom_data.indexOf(oldData);
                        noncom_data[index] = newData;
                        seTnoncom_data(noncom_data);
                        getNoncomData();
                      });
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .delete(`http://localhost:5000/noncom/${oldData._id}`)
                      .then((response) => {
                        const index = noncom_data.indexOf(oldData);
                        noncom_data.splice(index, 1);
                        seTnoncom_data(noncom_data);
                        getNoncomData();
                      });
                    resolve();
                  }),
              }}
            />
          </Grid>
          <Grid item container md={12} className="">
            <MaterialTable
              title={t('Kurallar')}
              icons={tableIcons}
              columns={rules_label}
              data={rules_data}
              style={{ width: '100%' }}
              options={{
                pageSize: 10,
                exportButton: false,
                search: false,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post('http://localhost:5000/rules/add', {
                        name: newData.name,
                      })
                      .then((response) => {
                        rules_data.push(newData);
                        seTrules_data(rules_data);
                        getRulesData();
                      });
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .post(`http://localhost:5000/rules/${newData._id}`, {
                        name: newData.name,
                      })
                      .then((response) => {
                        const index = rules_data.indexOf(oldData);
                        rules_data[index] = newData;
                        seTrules_data(rules_data);
                        getRulesData();
                      });
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    axios
                      .delete(`http://localhost:5000/rules/${oldData._id}`)
                      .then((response) => {
                        const index = rules_data.indexOf(oldData);
                        rules_data.splice(index, 1);
                        seTrules(rules_data);
                        getRulesData();
                      });
                    resolve();
                  }),
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
