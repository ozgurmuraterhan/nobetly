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

import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '100px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SoldierList() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <>
      <div className="containerP">
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Bu program Kullanılır ?
            </Typography>

            <Typography variant="body2" component="p">
              Bu uygulama ile asker ekleyebilirsiniz, askerin müsaitlik durumunu
              hafta bazında belirleyebilirsiniz(örn: murat erhan adlı asker cuma
              günleri 12.00 - 14.00 nöbetini tutamaz.)
            </Typography>
          </CardContent>

          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Nasıl teknik destek alırım ?
            </Typography>

            <Typography variant="body2" component="p">
              murat.erhan.38@gmail.com adresine mail atarak teknik destek
              alabilirsiniz.
            </Typography>
          </CardContent>
        </Card>{' '}
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Bu program nasıl yapıldı ?
            </Typography>

            <Typography variant="body2" component="p">
              Bu uygulama Jandarma hava grup komutanı ve karargah birlik
              komutanının üstün destekleri ile J.Er Murat Erhan tarafından
              yapılmıştır.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
