'use client';
import { Autocomplete, Button } from '@mui/material';

export default function SearchBar() {
  return (
    <></>
    // <Autocomplete
    //   id="customer-search"
    //   filterOptions={(x) => x}
    //   loadingText="Loading"
    //   loading={searchResultLoading}
    //   noOptionsText={
    //     searchInput.length < 2 ? (
    //       'Please enter name, cellphone, or email to search'
    //     ) : (
    //       <>
    //         <Typography>
    //           No Result Found.{' '}
    //           <Button
    //             onClick={() => {
    //               createNewUserTextfieldRef.current.focus();
    //             }}
    //           >
    //             Add User
    //           </Button>
    //         </Typography>
    //       </>
    //     )
    //   }
    //   options={searchResults}
    //   value={formValues.selectedCustomer}
    //   onChange={(event, newValue) => {
    //     updateFormValues('selectedCustomer', newValue);
    //   }}
    //   getOptionLabel={(customer) => {
    //     return customer.firstName + ' ' + customer.lastName;
    //   }}
    //   isOptionEqualToValue={(option, value) => {
    //     return option._id === value._id;
    //   }}
    //   onInputChange={(event, newValue) => {
    //     setSearchInput(newValue);
    //   }}
    //   renderInput={(params) => {
    //     return (
    //       <TextField
    //         {...params}
    //         label="Search For Customer"
    //         fullWidth
    //       />
    //     );
    //   }}
    //   renderOption={(props, option) => {
    //     return (
    //       <li
    //         {...props}
    //         key={option.firstName + option.lastName + Math.random() * 10000}
    //       >
    //         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    //           <Typography variant="h6">
    //             {option.firstName + ' ' + option.lastName}
    //           </Typography>
    //           <Typography>{option.email}</Typography>
    //         </Box>
    //       </li>
    //     );
    //   }}
    // />
  );
}
