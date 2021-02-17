module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'navColor' : '#fff',                    // Top Navigation color
        'backgroundColor' : '#f7f7f8',          // Background color
        'sidemenuColor' : '#fff',               // Sidemenu Background color
        'sidemenuActiveColor' : '#d8d8f7',      // Sidemenu Active state color
        'sidemenuTextActiveColor' : '#393C8E',  // Sidemenu Text Active state color
        'sidemenuChildBgColor' : '#F8F8FF',     // Sidemenu Bg Active state color
        'dangerBtn' : '#E24949',                // button red color
        'primaryBtn' : '#393C8E',               // button blue color
        'successBtn' : '#28B867',               // button green color
        'warningBtn' : '#F7C848',               // button green color
        'closeBtn' : '#6c757d',                 // button gray color
        'dangerMsg' : '#EB5757 !important',     // message bg red color
        'primaryMsg' : '#393C8E',               // message bg blue color
        'successMsg' : '#36D37A',               // message bg green color
        'v-status-none' : '#E5E6E8',            // verification status none color
        'v-status-all' : '#B2FCE4',            // verification status none color
        'v-status-approved' : '#36D37A',         // verification status approve color
        'v-status-rejected' : '#EB5757',        // verification status rejected color
        'v-status-pending' : '#F08B34',         // verification status pending color
        'v-status-active' : '#2F80ED',         // verification status active color
        'v-status-incomplete' : '#F7C848',         // verification status incomplete color
        'v-status-banned' : '#353D46',         // verification status banned color
        'v-status-freeze' : '#9A9EA2',         // verification status freeze color
        'loader' : '#000000cc',                 // loading state bg color
        'violet' : '#393C8E',                   // violet color,
      },
      flex: {
        '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
        '11': '11', '12': '12', '13': '13', '14': '14', '15': '15',
        'auto': 'auto'
      },
      fontSize: {
        'xxs': '.65rem',
        'xxxs': '.55rem',
      },
      maxHeight:  {
        'none': 'unset',
        '93px': '93px',
        'vh2.5/10': '25vh',
        'vh5/10': '50vh',
        'vh7/10': '70vh',
        'vh7.5/10': '75vh',
        'vh8/10': '80vh',
        'vh8.5/10': '85vh',
        'vh9/10': '90vh',
        'vhfull': '100vh',
      },
      minHeight: {
        '50px': '50px',
        '100px': '100px',
        '130px': '130px',
        '135px': '135px',
        '140px': '140px',
        '200px': '200px',
        '300px': '300px',
        '500px': '500px',
      },
      maxWidth: {
        '40px': '40px',
        '150px': '150px',
        '170px': '170px',
        '180px': '180px',
        '44': '11rem',
      },
      minWidth: {
        '220px': '220px',
        '250px': '250px',
        '350px': '350px',
        '11': '2.75rem',
        '28': '7rem',
        '40': '10rem',
        '48': '12rem',
      },
      width:  {
        '1/10': '10%', '2/10': '20%', '3/10': '30%', '4/10': '40%', '5/10': '50%', '6/10': '60%', '7/10': '70%', '8/10': '80%', '9/10': '90%',
        '45': '11.25rem',
        '76': '19rem',
        '100': '25rem',
        '103': '25.75rem',
        '104': '26rem',
        '105': '26.25rem',
        '106': '26.50rem',
        '107': '26.75rem',
        '108': '27rem',
        '109': '27.25rem',
        '110': '27.50rem',
        '111': '27.75rem',
        '112': '28rem',
        '125': '31.25rem',
        '130': '32.5rem',
        '132': '33rem',
        '142': '36rem',
        '143': '36.25rem',
      },
      height: {
        '1/10': '10%', '2/10': '20%', '3/10': '30%', '4/10': '40%', '5/10': '50%', '6/10': '60%', '7/10': '70%', '8/10': '80%', '9/10': '90%',
        '60vh': '60vh',
        '70vh': '70vh',
        '72vh': '72vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '552px': '552px'
      },
      gridTemplateRows:  {
        '12': 'repeat(12, minmax(0, 1fr));',
      },
      borderRadius: {
        '50%': '50%'
      },
      boxShadow:  {
        'lg-reverse':  '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg-middle':  '0 0px 6px 0px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
