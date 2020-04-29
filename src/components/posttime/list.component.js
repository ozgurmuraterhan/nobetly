import React, { Component, forwardRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import MaterialTable, { MTableToolbar } from 'material-table';
import { useTranslation } from 'react-i18next';



import {
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


export default function  PostTime() {

  const [t] = useTranslation();
  const history = useHistory();

 
  const [data, seTdata] = useState([]);  
 
  const columns = [
    {
      title: t('Tarihi'),
      field: 'post_date',
      
    },
     
    {
      title: t('actions'),
      field: '_id',
      render: (rowData) => (
        <div>
          <Link to={`/posttime/edit/${rowData._id}`}><Edit /></Link>
        </div>
      ),
    },
  ]
  
    const  tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    }

  const getPostTimeData = () => {
    axios.get('http://localhost:5000/posttime')
      .then((response) => {
        if (response.data.length > 0) {
             seTdata(response.data)
           // console.log(data)
          // console.log(columns)
        }
      });
  }
 
  useEffect(() => {

    getPostTimeData(); 

  }, []);

 
 

     return (
       <>
         <div className="containerP">
           <Grid item container spacing={3}>
             <Grid container item md={12} className="panelGridRelative">
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
                        <Typography component="h5" variant="h6" color="inherit" noWrap className="typography">
                          {t('Nöbet Çizelgesi')}
                        </Typography>
                        <Link to="/PostTimeCreate" className="addButtonPlace">
                          <Tooltip title={t('Nöbet Oluştur')}>
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
           </Grid>
         </div>
       </>
     );
   }

