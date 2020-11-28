import React from 'react';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Box from '@material-ui/core/Box';

function Educations({ register, control }) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'education',
    }
  );

  const onAddEducations = () => {
    append({ school: 'appendBill', location: 'appendLuo' });
  };

  return (
    <div>
      {fields.map(
        ({ id, school, location }, index) => (
          // <TabPanel value={value} index={index} key={index}>
          // value == index && (
          <Box
            p={3}
            // className={` ${value == index ? '' : classes.hide}`}
            key={id}
          >
            {console.log(id)}
            <input
              name={`education[${index}].school`}
              ref={register()}
              defaultValue={school} // make sure to set up defaultValue
            />

            <Controller
              as={<input />}
              name={`education[${index}].location`}
              control={control}
              defaultValue={location} // make sure to set up defaultValue
            />

            <button
              type="button"
              onClick={() => {
                remove(index);
              }}
            >
              Delete
            </button>
          </Box>
        )
        // )
        // </TabPanel>
      )}
      <button type="button" onClick={onAddEducations}>
        append
      </button>
    </div>
  );
}

export default Educations;
