import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Educations from './Educations';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-prevent-tabpanel-${index}`}
//       aria-labelledby={`scrollable-prevent-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           {/* <Typography>{children}</Typography> */}
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  hide: {
    display: 'none',
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([]);

  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
      defaultValues: {
        test: [],
        education: [],
      },
    }
  );
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'test',
    }
  );

  const onAddFounder = () => {
    setTabs([
      ...tabs,
      { alt: 'Remy Sharp', src: '/static/images/avatar/1.jpg' },
    ]);
    setValue(tabs.length);
    append({ firstName: 'appendBill', lastName: 'appendLuo' });
  };

  const onSubmit = (data) => console.log('data', data);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Avatar
        className={classes.large}
        onClick={() => {
          append({ firstName: '', lastName: '' });
          // console.log(tabs);
          setTabs([
            ...tabs,
            { alt: 'Remy Sharp', src: '/static/images/avatar/1.jpg' },
          ]);
          setValue(tabs.length);
        }}
      >
        +
      </Avatar>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          {console.log(tabs)}
          {tabs.map((item, index) => (
            <Tab
              key={item.id}
              icon={<Avatar className={classes.large}>{item.id}</Avatar>}
              aria-label="phone"
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(
          ({ id, firstName, lastName }, index) => (
            // <TabPanel value={value} index={index} key={index}>
            // value == index && (
            <Box
              p={3}
              className={` ${value == index ? '' : classes.hide}`}
              key={id}
            >
              {console.log(id)}
              <input
                name={`test[${index}].firstName`}
                ref={register()}
                defaultValue={firstName} // make sure to set up defaultValue
              />

              <Controller
                as={<input />}
                name={`test[${index}].lastName`}
                control={control}
                defaultValue={lastName} // make sure to set up defaultValue
              />

              <Educations register={register} control={control} />

              <button
                type="button"
                onClick={() => {
                  remove(index);
                  let array = tabs;
                  array.splice(index, 1);
                  // delete array[index];
                  setTabs(array);
                  index != 0 && setValue(index - 1);
                }}
              >
                Delete
              </button>
            </Box>
          )
          // )
          // </TabPanel>
        )}

        <button type="button" onClick={onAddFounder}>
          append
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
