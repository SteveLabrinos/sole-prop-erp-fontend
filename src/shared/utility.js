import { localDeployment } from '../App';

export const baseURL = localDeployment ?
    'http://localhost:9002/msc/ais/soleerp/api/' :
    'https://sole-erp.msc-ais.site/msc/ais/soleerp/api/';

export const getFirstLetters = string => {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join(' ');
};

export const mapRole = role => {
    switch (role) {
        case 'CUSTOMER': return 'Πελάτης';
        case 'SUPPLIER': return 'Προμηθευτής';
        default: return 'Πελάτης & Προμήθευτής';
    }
};

export const mapCodeRole = role => {
    switch (role) {
        case 'CUSTOMER': return 'C';
        case 'SUPPLIER': return 'S';
        default: return 'B';
    }
};

export const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

export const getMonthName = month => {
    switch (month) {
        case 0: return 'Ιανουάριος';
        case 1: return 'Φεβρουάριος';
        case 2: return 'Μάρτιος';
        case 3: return 'Απρήλιος';
        case 4: return 'Μάιος';
        case 5: return 'Ιούνιος';
        case 6: return 'Ιούλιος';
        case 7: return 'Άυγουστος';
        case 8: return 'Σεπτέμβριος';
        case 9: return 'Οκτώβριος';
        case 10: return 'Νοέμβριος';
        case 11: return 'Δεκέμβριος';
        default: return 'Άγνωστος Μήνας';
    }
};